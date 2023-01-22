import { User } from "@prisma/client";
import { ActionFunction, TypedResponse, redirect } from "@remix-run/node";
import { register } from "~/services/session/session.server";

export type ActionData = {
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