import { Alert, Button, PasswordInput, TextInput, Title } from '@mantine/core';
import type { User } from '@prisma/client';
import type { ActionFunction } from '@remix-run/node';
import { Form, Link, useActionData } from '@remix-run/react';
import { createUserSession, login } from '~/utils/session.server';

interface ActionData {
  user?: User;
  fieldsError?: { [key: string]: string };
  error?: string;
}

export const action: ActionFunction = async ({
  request,
}): Promise<ActionData | Response> => {
  let { email, password } = Object.fromEntries(await request.formData());
  console.log({ email, password });
  if (typeof email !== 'string' || typeof password !== 'string') {
    return { error: `Form not submitted correctly.` };
  }

  const user = await login({ email, password });
  if (!user)
    return {
      error: 'Something wrong with login.',
    };

  return createUserSession(user.id, '/dashboard');
};

export default function Login() {
  const actionData = useActionData<ActionData>();
  return (
    <div className="flex flex-col gap-10 items-center justify-center w-full h-full">
      <Title order={1}>Welcome to Trade Logs</Title>
      <div className="w-full p-2">
        <Form className="flex flex-col gap-4" method="post">
          <TextInput
            label="Email"
            name="email"
            placeholder="your@email.com"
            withAsterisk
            error={actionData?.fieldsError?.['email'] || false}
          />
          <PasswordInput
            placeholder="Password"
            label="Password"
            name="password"
            withAsterisk
            error={actionData?.fieldsError?.['password'] || false}
          />
          {actionData?.error && (
            <Alert title="Bummer!" color="red">
              {actionData.error}
            </Alert>
          )}
          <Button type="submit">Log in</Button>
          <Link className="w-full" to="/auth/register">
            <Button className="w-full" variant="outline">
              Sign up
            </Button>
          </Link>
        </Form>
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  return <div className="error-container">I did a whoopsies.</div>;
}
