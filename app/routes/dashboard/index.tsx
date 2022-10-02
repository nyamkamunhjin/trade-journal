import type { LoaderArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getUser } from '~/utils/session.server';

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>;
};

export async function loader({ request }: LoaderArgs): Promise<LoaderData> {
  const user = await getUser(request);
  if (!user) redirect('/auth/login');
  return { user };
}

export default function Index() {
  const data = useLoaderData<LoaderData>();
  return <div>Dashboard</div>;
}
