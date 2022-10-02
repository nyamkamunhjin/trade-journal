import { Button } from '@mantine/core';
import type { LoaderArgs } from '@remix-run/node';
import { Form, Link, useLoaderData } from '@remix-run/react';
import { getUser } from '~/utils/session.server';

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>;
};

export async function loader({ request }: LoaderArgs): Promise<LoaderData> {
  const user = await getUser(request);
  if (!user) throw new Response('Unauthorized', { status: 401 });
  return { user };
}

export default function Index() {
  const data = useLoaderData<LoaderData>();
  return (
    <div>
      You are authorized {data.user?.email}
      {data.user && (
        <form action="/logout" method="post">
          <Button type="submit">Log out</Button>
        </form>
      )}
    </div>
  );
}
