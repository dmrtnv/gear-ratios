import { cn } from '@/lib/utils';
import _ from 'lodash';
import { Slash } from 'lucide-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { TextAccordionProvider, useTextAccordion } from './TextAccordionContext';

export function TextAccordion({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <TextAccordionProvider>
      <div className={cn('flex items-center justify-center gap-3', className ?? '')}>{children}</div>
    </TextAccordionProvider>
  );
}

type TextAccordionTriggerProps = { children: React.ReactNode; action: () => void; className?: string };

export function TextAccordionTrigger({ children, action, className }: TextAccordionTriggerProps) {
  const { setOpenState, setClosedState } = useTextAccordion();

  const deboucedSetClosed = useCallback(
    _.debounce(() => setClosedState(), 2000),
    [],
  );

  const handleClick = () => {
    action();
    setOpenState();
    deboucedSetClosed();
  };

  return (
    <button className={cn('', className ?? '')} onClick={handleClick}>
      {children}
    </button>
  );
}

export function TextAccordionContent({ text }: { text: string }) {
  const { state } = useTextAccordion();
  const textRef = useRef<HTMLSpanElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (textRef.current) {
      const { width } = textRef.current.getBoundingClientRect();
      setWidth(Math.ceil(width));
    }
  }, [text]);

  return (
    <div className='group flex items-center justify-center'>
      <Slash
        size={16}
        className={cn(
          '-rotate-45  transition-all duration-300',
          state === 'open' ? '-rotate-12 opacity-100' : 'opacity-0 delay-150',
        )}
      />

      <div
        style={{ '--width': width + 'px' } as React.CSSProperties}
        className={cn(
          'max-w-0 overflow-hidden text-nowrap transition-[max-width] duration-300',
          state === 'open' && 'max-w-[var(--width)]',
        )}
      >
        <span ref={textRef}>{text}</span>
      </div>

      <Slash
        size={16}
        className={cn(
          'relative -translate-x-[100%] -rotate-45  transition-all duration-300',
          state === 'open' ? 'translate-x-0 -rotate-12 opacity-100' : 'opacity-0 delay-150',
        )}
      />
    </div>
  );
}
