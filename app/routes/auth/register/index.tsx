import { Button, PasswordInput, TextInput, Title } from '@mantine/core';
import type { User } from '@prisma/client';
import type { ActionFunction, TypedResponse } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { Form, Link } from '@remix-run/react';
import { register } from '~/utils/session.server';

interface ActionData {
  user?: User;
  fieldsError?: { [key: string]: string };
  error?: string;
}

export const action: ActionFunction = async ({
  request,
}): Promise<ActionData | TypedResponse<never>> => {
  let { email, password, confirmPassword } = Object.fromEntries(
    await request.formData()
  );
  if (
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    typeof password !== 'string' ||
    typeof confirmPassword !== 'string'
  ) {
    return { error: `Form not submitted correctly.` };
  }

  if (password !== confirmPassword) return { error: `Passwords don't match.` };

  const user = await register({ email, password });
  if (!user)
    return {
      error: 'Something wrong with signing up.',
    };

  return redirect('/auth/login');
};

export default function Register() {
  return (
    <div className="flex flex-col gap-10 items-center justify-center w-full h-full">
      <Title order={1}>Sign up to Trade Logs</Title>
      <div className="w-full p-2">
        <Form className="flex flex-col gap-4" method="post">
          <TextInput
            label="Email"
            name="email"
            description="Email must be valid"
            placeholder="your@email.com"
            withAsterisk
          />
          <PasswordInput
            placeholder="Password"
            label="Password"
            name="password"
            description="Password must include at least one letter, number and special character"
            withAsterisk
          />
          <PasswordInput
            placeholder="Confirm Password"
            label="Password"
            name="confirmPassword"
            description="Please confirm your password"
            withAsterisk
          />
          <Button type="submit">Sign up</Button>
          <Link to="/auth/login" className="w-full">
            <Button className="w-full" variant="outline">
              Login
            </Button>
          </Link>
        </Form>
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  return <div className="bg-red-400">I did a whoopsies.</div>;
}
