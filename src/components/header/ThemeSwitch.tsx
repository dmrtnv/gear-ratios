import { Theme, useTheme } from '@/contexts/ThemeProvider';
import { cn } from '@/lib/utils';
import { Moon, Sun } from 'lucide-react';
import React, { useCallback } from 'react';

function ThemeSwitch({ className = '', ...props }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = useCallback(
    (newTheme: Theme) => {
      if (theme !== newTheme) setTheme(newTheme);
    },
    [theme, setTheme],
  );

  return (
    <fieldset
      role='radiogroup'
      aria-label='Theme switcher'
      className={cn('flex items-center justify-center gap-4 text-muted-foreground', className)}
      {...props}
    >
      <legend className='sr-only'>Choose theme</legend>

      <ThemeSwitchInput id='light' checked={theme === 'light'} onChange={() => handleThemeChange('light')}>
        <Sun size={16} strokeWidth={2} />
        <span>light</span>
      </ThemeSwitchInput>

      <ThemeSwitchInput id='dark' checked={theme === 'dark'} onChange={() => handleThemeChange('dark')}>
        <Moon size={16} strokeWidth={2} />
        <span>dark</span>
      </ThemeSwitchInput>
    </fieldset>
  );
}

type ThemeSwitchInputProps = {
  checked: boolean;
  id: string;
  onChange: () => void;
  children: React.ReactNode;
  className?: string;
};

function ThemeSwitchInput({ id, checked, onChange, children, className = '' }: ThemeSwitchInputProps) {
  return (
    <div>
      <input id={id} checked={checked} onChange={onChange} name='theme' type='radio' className='peer sr-only' />
      <label
        className={cn(
          'flex cursor-pointer items-center gap-1.5 rounded-md px-3 py-1 hover:bg-muted-md peer-checked:cursor-default peer-checked:bg-muted-lg peer-focus-visible:outline',
          className,
        )}
        htmlFor={id}
      >
        {children}
      </label>
    </div>
  );
}

export default ThemeSwitch;
