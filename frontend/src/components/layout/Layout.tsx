import { ReactNode } from 'react';
import Header from './Header.tsx';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <footer className="mt-auto py-4 text-center text-sm text-muted-foreground border-t">
        finki © 2025
      </footer>
    </div>
  );
};

export default Layout;