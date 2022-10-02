import type { LoaderArgs, TypedResponse } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import { getUser } from '~/utils/session.server';

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>;
};

export async function loader({
  request,
}: LoaderArgs): Promise<LoaderData | TypedResponse<never>> {
  const user = await getUser(request);
  if (!user) return redirect('/auth/login');
  return { user };
}

export default function Index() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
