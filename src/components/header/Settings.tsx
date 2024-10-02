import { useLayout } from '@/contexts/LayoutProvider';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { cn } from '@/lib/utils';
import { settingsSlice } from '@/store/features/settings/settingsSlice';
import { SettingsIcon } from 'lucide-react';
import React, { useEffect, useRef } from 'react';
import CadenceSlider from './CadenceSlider';
import { SettingsProvider, useSettings } from './SettingsContext';
import ThemeSwitch from './ThemeSwitch';

function Settings() {
  const { cadence } = useAppSelector((state) => state.settings);
  const { setMaxCadence, setMinCadence } = settingsSlice.actions;
  const dispatch = useAppDispatch();

  return (
    <SettingsProvider>
      <div className='md:relative'>
        <SettingsTrigger />

        <SettingsContent>
          <div className='flex flex-col items-start gap-2'>
            <div>
              <h3 className='font-bold text-muted-foreground'>Theme</h3>
              <ThemeSwitch className='mt-1' />
            </div>

            <div className='w-full'>
              <h3 className='font-bold text-muted-foreground'>Cadence</h3>

              <CadenceSlider
                label='min'
                value={cadence.min}
                setValue={(newValue) => dispatch(setMinCadence(newValue))}
                max={80}
                min={40}
              />

              <CadenceSlider
                label='max'
                value={cadence.max}
                setValue={(newValue) => dispatch(setMaxCadence(newValue))}
                max={160}
                min={80}
              />
            </div>
          </div>
        </SettingsContent>

        <Overlay
          className={cn(
            // mobile
            'bg-muted-lg/70 backdrop-blur-sm',
            // desktop
            'md:bg-transparent md:backdrop-blur-none',
          )}
        />
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
  const { isMobile } = useLayout();

  useEffect(() => {
    if (isMobile && state === 'open') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMobile, state]);

  return (
    <div
      data-state={state}
      className={cn('fixed bottom-0 left-0 right-0 top-0 z-10 hidden data-[state=open]:block', className)}
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

    // console.log(focusableElements);

    const firstElement = modalRef.current.querySelector('input[name=theme]:checked') as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    // console.log({ firstElement });
    // console.log({ lastElement });
    // console.log({ active: document.activeElement });

    const handleTab = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        if (!modalRef.current?.contains(document.activeElement)) {
          event.preventDefault();
          console.log('triggered');
          console.log({ active: document.activeElement });
          firstElement.focus();
          console.log({ active: document.activeElement });
          return;
        }

        // 3 is temporary
        if (focusableElements.length < 3) {
          event.preventDefault();
          return;
        }

        if (
          event.shiftKey &&
          (modalRef.current.querySelector('input[name=theme]:checked') as HTMLElement).contains(document.activeElement)
        ) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && lastElement.contains(document.activeElement)) {
          event.preventDefault();
          (modalRef.current.querySelector('input[name=theme]:checked') as HTMLElement).focus();
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
        // base
        'z-20 items-center justify-center rounded-md bg-muted p-4 shadow-sm data-[state=open]:flex data-[state=closed]:hidden',
        // mobile
        'fixed left-10 right-10 top-1/2 h-1/2 -translate-y-1/2',
        // desktop
        'md:absolute md:-bottom-2 md:left-auto md:right-0 md:top-auto md:h-auto md:translate-y-full',
        className,
      )}
    >
      <div className='w-fit'>
        <h2 className='mb-2 text-center text-lg font-bold text-muted-foreground'>Settings</h2>

        {children}
      </div>
    </div>
  );
}

export default Settings;
