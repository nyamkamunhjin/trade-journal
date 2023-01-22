import type {
  LinksFunction,
  LoaderArgs,
  MetaFunction,
  TypedResponse,
} from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import { MantineProvider, createEmotionCache } from '@mantine/core';
import { StylesPlaceholder } from '@mantine/remix';
import styles from '~/tailwind.css';
import Layout from './layout';
import { getUser } from './services/session/session.server';
import type { User } from '@prisma/client';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles },
  // { rel: 'stylesheet', href: fontStyles },
  {
    rel: 'preconnect',
    href: 'https://fonts.googleapis.com',
  },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    href: 'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap',
    rel: 'stylesheet',
  },
];

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Trade logs',
  viewport: 'width=device-width,initial-scale=1',
});

createEmotionCache({ key: 'mantine' });

type LoaderData = {
  user: User | null;
};

export async function loader({
  request,
}: LoaderArgs): Promise<LoaderData | TypedResponse<never>> {
  const user = await getUser(request);
  return { user };
}

export default function App() {
  const data = useLoaderData<LoaderData>();

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ fontFamily: "'Inter', sans-serif !important;" }}
    >
      <html lang="en">
        <head>
          <StylesPlaceholder />
          <Meta />
          <Links />
        </head>
        <body style={{ fontFamily: "'Inter', sans-serif !important;" }}>
          <Layout user={data.user as unknown as User}>
            <Outlet />
          </Layout>
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    </MantineProvider>
  );
}
