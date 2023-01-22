import type { User } from '@prisma/client';
import type { ActionFunction } from '@remix-run/node';
import { createUserSession, login } from '~/services/session/session.server';

export type ActionData = {
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
