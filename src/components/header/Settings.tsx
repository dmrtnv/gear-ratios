import { SettingsIcon } from 'lucide-react';
import { SettingsProvider, useSettings } from './SettingsContext';
import ThemeSwitch from './ThemeSwitch';
import { useEffect, useRef } from 'react';

function Settings() {
  return (
    <SettingsProvider>
      <div className='relative border'>
        <SettingsTrigger />
        <SettingsContent />
      </div>
    </SettingsProvider>
  );
}

function SettingsTrigger() {
  const { state, setState } = useSettings();

  const handleClick = () => {
    if (state === 'open') setState('closed');
    if (state === 'closed') setState('open');
  };

  return (
    <button
      onClick={handleClick}
      className='group flex aspect-square cursor-pointer items-center justify-center rounded-lg p-2 transition-colors ease-in-out hover:bg-muted active:bg-muted-md'
    >
      <SettingsIcon
        size={24}
        strokeWidth={2.4}
        className='text-muted-foreground-lg transition-colors ease-in-out group-hover:text-muted-foreground-md group-active:text-muted-foreground'
      />
    </button>
  );
}

function SettingsContent() {
  const { state, setState } = useSettings();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: React.MouseEvent<HTMLElement>) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) setState('closed');
    };

    if (state === 'open') {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [state, setState]);

  return (
    <div
      ref={modalRef}
      data-state={state}
      className='absolute -bottom-2 right-0 translate-y-full rounded-md bg-muted p-4 data-[state=open]:block data-[state=closed]:hidden'
    >
      <h2 className='text-center text-lg font-bold text-muted-foreground'>Settings</h2>

      <ul className='mt-2'>
        <li>
          <h3 className='font-bold text-muted-foreground'>Theme</h3>
          <ThemeSwitch className='mt-1' />
        </li>
      </ul>
    </div>
  );
}

export default Settings;
