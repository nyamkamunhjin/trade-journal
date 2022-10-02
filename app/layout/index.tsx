import type { User } from '@prisma/client';
import Header from '~/components/header';

interface LayoutProps {
  children: React.ReactNode;
  user?: User;
}

export default function Layout({ children, user }: LayoutProps) {
  return (
    <div className="w-screen h-screen flex flex-col">
      {user && <Header user={user} />}
      {children}
    </div>
  );
}
