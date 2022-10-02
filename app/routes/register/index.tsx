import { Button, PasswordInput, TextInput, Title } from '@mantine/core';
import type { User } from '@prisma/client';
import type { ActionFunction } from '@remix-run/node';
import { Form, Link } from '@remix-run/react';
import { register } from '~/utils/session.server';

interface ActionData {
  user?: User;
  fieldsError?: { [key: string]: string };
  error?: string;
}

export const action: ActionFunction = async ({
  request,
}): Promise<ActionData> => {
  let { email, password } = Object.fromEntries(await request.formData());
  console.log({ email, password });
  if (typeof email !== 'string' || typeof password !== 'string') {
    return { error: `Form not submitted correctly.` };
  }

  const user = await register({ email, password });
  if (!user)
    return {
      error: 'Something wrong with login.',
    };

  return { user };
};

export default function Login() {
  return (
    <div className="tw-w-full tw-h-full">
      <div className="flex flex-col gap-4 items-center max-w-md p-4">
        <Title order={2}>Sign up to Trade Logs</Title>
        <div className="border border-solid border-gray-300 w-full p-2">
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
              description="Password must include at least one letter, number and special character"
              withAsterisk
            />
            <Button>Sign up</Button>
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
          </Form>
        </div>
      </div>
    </div>
  );
}
