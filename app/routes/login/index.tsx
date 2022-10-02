import { Alert, Button, PasswordInput, TextInput, Title } from '@mantine/core';
import type { User } from '@prisma/client';
import type { ActionFunction } from '@remix-run/node';
import { Form, Link, useActionData } from '@remix-run/react';
import { createUserSession, login } from '~/utils/session.server';
import { createUser } from '../../models/login.server';

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

  return createUserSession(user.id, '/');
};

export default function Login() {
  const actionData = useActionData<ActionData>();
  return (
    <div className="w-full h-full">
      <div className="flex flex-col gap-4 items-center max-w-md p-4">
        <Title order={2}>Welcome to Trade Logs</Title>
        <div className="border border-solid border-gray-300 w-full p-2">
          <Form className="flex flex-col gap-4" method="post">
            <TextInput
              label="Email"
              name="email"
              description="Email must be valid"
              placeholder="your@email.com"
              withAsterisk
              error={actionData?.fieldsError?.['email'] || false}
            />
            <PasswordInput
              placeholder="Password"
              label="Password"
              name="password"
              description="Password must include at least one letter, number and special character"
              withAsterisk
              error={actionData?.fieldsError?.['password'] || false}
            />
            {actionData?.error && (
              <Alert title="Bummer!" color="red">
                {actionData.error}
              </Alert>
            )}
            <Button type="submit">Log in</Button>
            <Link className="w-full" to="/register">
              <Button className="w-full" variant="outline">
                Sign up
              </Button>
            </Link>
          </Form>
        </div>
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  return <div className="error-container">I did a whoopsies.</div>;
}
