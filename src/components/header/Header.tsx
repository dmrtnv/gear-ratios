import { cn } from '@/lib/utils';
import Settings from './Settings';
import Logo from './Logo';
import React from 'react';

function Header({ className = '' }: React.ComponentPropsWithoutRef<'header'>) {
  return (
    <header
      className={cn(
        'sticky z-10 flex w-full items-center justify-between border-b bg-background px-4',
        // mobile
        'top-0',
        // desktop
        '',
        className,
      )}
    >
      <Logo />

      <Settings />
    </header>
  );
}

export default Header;
