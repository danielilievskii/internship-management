import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore.ts';
import { Button } from '@/components/ui/button.tsx';
import { LogOut, User } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  const { user, logout } = useAuthStore();

  const navigation = [
    { name: 'Инструкции', href: '/instructions', roles: ['Student', 'Company', 'Coordinator'] },
    { name: 'Пракси', href: '/internships', roles: ['Student'] },
    { name: 'Сите пракси', href: '/all-internships', roles: ['Coordinator'] },
    { name: 'Огласи', href: '/announcements', roles: ['Company', 'Coordinator'] },
    { name: 'Кандидати', href: '/candidates', roles: ['Company'] },
    { name: 'Практиканти', href: '/practicants', roles: ['Company', 'Coordinator'] },
    { name: 'Координатори', href: '/coordinators', roles: ['Coordinator'] },
  ];

  const visibleNavigation = navigation.filter(item => 
    !user || item.roles.includes(user.role)
  );

  return (
    <header className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <nav className="flex space-x-8">
            {visibleNavigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors ${
                  location.pathname === item.href
                    ? 'text-white border-b-2 border-white'
                    : 'text-primary-foreground/80 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            {user && (
              <>
                <div className="flex items-center space-x-2 text-sm">
                  <User className="h-4 w-4" />
                  <span>{user.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="text-primary-foreground hover:text-white hover:bg-primary-foreground/10"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Одјави се
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;