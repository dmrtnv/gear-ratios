import { cn } from '@/lib/utils';
import Settings from './Settings';

function Header() {
  return (
    <header
      className={cn(
        'sticky z-10 flex w-full items-center justify-between border bg-background p-2',
        // mobile
        'top-0',
        // desktop
        'md:-top-14',
      )}
    >
      <span>Logo</span>

      <Settings />
    </header>
  );
}

export default Header;
