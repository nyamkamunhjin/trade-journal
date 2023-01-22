import { Alert, Button, PasswordInput, TextInput, Title } from '@mantine/core';

import { Form, Link, useActionData } from '@remix-run/react';

import type { ActionData } from './.action';

export { action } from './.action';

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
