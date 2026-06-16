'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { ThemeToggle } from './ThemeToggle';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/achievements', label: 'Achievements' },
    { href: '/contact', label: 'Contact' },
  ];

  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <header
      style={{ viewTransitionName: 'site-header' }}
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-200 border-b border-transparent',
        isScrolled
          ? 'py-3 bg-[--background]/85 backdrop-blur-md border-[--border] shadow-warm'
          : 'py-5 bg-transparent'
      )}
    >
      <div className="max-w-screen-xl mx-auto px-6 flex items-center justify-between">
        <Link
          href="/"
          className="font-heading text-2xl font-bold tracking-tight text-[--foreground] hover:text-[--primary] transition-colors"
        >
          Everil<span className="text-[--secondary]">.</span>
        </Link>

        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-[--primary]',
                    active ? 'text-[--primary] font-semibold' : 'text-[--foreground-muted]'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            
            {isAuthenticated && (
              <Link
                href="/admin"
                className={cn(
                  'text-sm font-medium transition-colors hover:text-[--secondary]',
                  isAdminRoute ? 'text-[--secondary] font-semibold' : 'text-[--foreground-muted]'
                )}
              >
                Admin Panel
              </Link>
            )}
          </nav>

          <button
            onClick={() => {
              window.dispatchEvent(new CustomEvent('toggle-command-palette'));
            }}
            className="w-9 h-9 rounded-full flex items-center justify-center bg-[--surface] hover:bg-[--muted] text-[--foreground-muted] hover:text-[--foreground] border border-[--border] transition-colors shadow-warm cursor-pointer"
            title="Open command palette (Cmd+K)"
          >
            <Search className="w-4 h-4" />
          </button>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
