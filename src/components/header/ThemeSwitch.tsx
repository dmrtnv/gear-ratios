import { Theme, useTheme } from '@/contexts/ThemeProvider';
import { useWithoutTransition } from '@/hooks/useWithoutTransition';
import { cn } from '@/lib/utils';
import { Moon, Sun } from 'lucide-react';
import { useCallback } from 'react';
import { SelectGroup } from '../ui/select-group/SelectGroup';
import { SelectGroupItem } from '../ui/select-group/SelectGroupItem';
import SelectGroupLegend from '../ui/select-group/SelectGroupLegend';

function ThemeSwitch({ className = '', ...props }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  const setThemeWithoutTransition = useWithoutTransition(setTheme);

  const handleThemeChange = useCallback(
    (newTheme: Theme) => {
      if (theme !== newTheme) {
        setThemeWithoutTransition(newTheme);
      }
    },
    [theme, setThemeWithoutTransition],
  );

  return (
    <SelectGroup groupName='theme-switch' areaLabel='Theme switch' className={cn('', className)} {...props}>
      <SelectGroupLegend hidden>Choose theme</SelectGroupLegend>

      <div className='flex items-center justify-center gap-4 text-muted-foreground'>
        <SelectGroupItem
          id='light'
          checked={theme === 'light'}
          onChange={() => handleThemeChange('light')}
          className='flex items-center gap-1.5'
        >
          <Sun size={16} strokeWidth={2} />
          <span>light</span>
        </SelectGroupItem>

        <SelectGroupItem
          id='dark'
          checked={theme === 'dark'}
          onChange={() => handleThemeChange('dark')}
          className='flex items-center gap-1.5'
        >
          <Moon size={16} strokeWidth={2} />
          <span>dark</span>
        </SelectGroupItem>
      </div>
    </SelectGroup>
  );
}

export default ThemeSwitch;
