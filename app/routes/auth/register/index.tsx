import { Button, PasswordInput, TextInput, Title } from '@mantine/core';
import { Form, Link } from '@remix-run/react';

export { action } from './.action'

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
