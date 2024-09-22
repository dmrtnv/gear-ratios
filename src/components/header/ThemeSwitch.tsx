import { useTheme } from '@/contexts/ThemeProvider';
import { cn } from '@/lib/utils';
import { Moon, Sun } from 'lucide-react';

function ThemeSwitch({ className = '', ...props }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  return (
    <form className={cn('flex items-center justify-center gap-4 text-muted-foreground', className)} {...props}>
      <input
        onChange={() => setTheme('light')}
        checked={theme === 'light'}
        name='theme'
        id='light'
        type='radio'
        className='peer/light sr-only'
      />
      <label
        className='flex cursor-pointer items-center gap-1.5 rounded-md px-3 py-1 hover:bg-muted-md peer-checked/light:cursor-default peer-checked/light:bg-muted-lg'
        htmlFor='light'
      >
        <Sun size={16} strokeWidth={2} />
        <span>light</span>
      </label>

      <input
        onChange={() => setTheme('dark')}
        checked={theme === 'dark'}
        name='theme'
        id='dark'
        type='radio'
        className='peer/dark sr-only'
      />
      <label
        className='flex cursor-pointer items-center gap-1.5 rounded-md px-3 py-1 hover:bg-muted-md peer-checked/dark:cursor-default peer-checked/dark:bg-muted-lg'
        htmlFor='dark'
      >
        <Moon size={16} strokeWidth={2} />
        <span>dark</span>
      </label>
    </form>
  );
}

export default ThemeSwitch;
