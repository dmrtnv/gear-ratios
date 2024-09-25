import { SettingsIcon } from 'lucide-react';
import React, { useEffect, useRef } from 'react';
import { SettingsProvider, useSettings } from './SettingsContext';
import ThemeSwitch from './ThemeSwitch';
import { cn } from '@/lib/utils';
import CadenceSlider from './CadenceSlider';

function Settings() {
  return (
    <SettingsProvider>
      <div className='relative'>
        <SettingsTrigger />

        <SettingsContent>
          <div className='flex flex-col items-start gap-2'>
            <div>
              <h3 className='font-bold text-muted-foreground'>Theme</h3>
              <ThemeSwitch className='mt-1' />
            </div>

            <div className='w-full'>
              <h3 className='font-bold text-muted-foreground'>Cadence</h3>

              <CadenceSlider label='min' defaultValue={[60]} max={80} min={40} />

              <CadenceSlider label='max' defaultValue={[100]} max={160} min={80} />
            </div>
          </div>
        </SettingsContent>

        <Overlay />
      </div>
    </SettingsProvider>
  );
}

function SettingsTrigger() {
  const { state, setState } = useSettings();

  const handleClick = () => {
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

function Overlay({ className = '' }: { className?: string }) {
  const { state } = useSettings();

  return (
    <div
      data-state={state}
      className={cn('fixed bottom-0 left-0 right-0 top-0 hidden data-[state=open]:block', className)}
    ></div>
  );
}

function SettingsContent({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { state, setState } = useSettings();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) setState('closed');
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setState('closed');
    };

    if (state === 'open') {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [state, setState]);

  useEffect(() => {
    if (state !== 'open' || !modalRef.current) return;

    (document.activeElement as HTMLElement).blur();

    const focusableElements = modalRef.current.querySelectorAll(
      'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])',
    );

    const firstElement = modalRef.current.querySelector('input[name=theme]:checked') as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTab = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        firstElement.focus();
        // 3 is temporary
        if (focusableElements.length < 3) {
          event.preventDefault();
          return;
        }

        if (event.shiftKey && firstElement.contains(document.activeElement)) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && lastElement.contains(document.activeElement)) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTab);

    return () => {
      document.removeEventListener('keydown', handleTab);
    };
  }, [state, setState]);

  return (
    <div
      ref={modalRef}
      data-state={state}
      className={cn(
        'absolute -bottom-2 right-0 z-10 translate-y-full rounded-md bg-muted p-4 data-[state=open]:block data-[state=closed]:hidden',
        className,
      )}
    >
      <h2 className='mb-2 text-center text-lg font-bold text-muted-foreground'>Settings</h2>

      {children}
    </div>
  );
}

export default Settings;
