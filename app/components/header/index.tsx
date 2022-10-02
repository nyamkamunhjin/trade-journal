import { Button } from '@mantine/core';
import type { User } from '@prisma/client';
import { Link } from '@remix-run/react';

interface Props {
  user?: User;
}

export default function Header({ user }: Props) {
  return (
    <header className="flex gap-2 items-center w-full max-w-6xl mx-auto py-1">
      <Link to="/dashboard">
        <Button variant="subtle">Dashboard</Button>
      </Link>
      <Link to="/trades-logs">
        <Button variant="subtle">Trade logs</Button>
      </Link>
      <Link to="spotify">
        <Button variant="subtle">Spotify JAMMER 💿</Button>
      </Link>
      {user && (
        <form className="ml-auto" action="/auth/logout" method="post">
          <Button type="submit" color="red" size="sm">
            Log out
          </Button>
        </form>
      )}
    </header>
  );
}
