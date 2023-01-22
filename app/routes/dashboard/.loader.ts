import type { LoaderArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { getUser } from '~/services/session/session.server';

export type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>;
};

export async function loader({ request }: LoaderArgs): Promise<LoaderData> {
  const user = await getUser(request);
  if (!user) redirect('/auth/login');
  return { user };
}
