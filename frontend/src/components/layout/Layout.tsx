import { ReactNode } from 'react';
import Header from './Header.tsx';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto mt-5 px-4 sm:px-6 lg:px-8 py-8 w-full">
        {children}
      </main>
      <footer className="py-4 text-center text-sm text-muted-foreground border-t">
        finki © 2025
      </footer>
    </div>
  );
};

export default Layout;