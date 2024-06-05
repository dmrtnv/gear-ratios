import { cn } from '@/lib/utils';
import _ from 'lodash';
import { Slash } from 'lucide-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Options, TextAccordionProvider, useTextAccordion } from './TextAccordionContext';
import { TextAccordionItemProvider, useTextAccordionItem } from './TextAccordionItemContext';

type TextAccordionProps = {
  children: React.ReactNode;
  className?: string;
} & Options;

export function TextAccordion({
  children,
  className = '',
  closeAfterMilliseconds,
  collapsible = false,
  type = 'single',
  defaultOpenItems = [],
}: TextAccordionProps) {
  return (
    <TextAccordionProvider options={{ closeAfterMilliseconds, collapsible, type, defaultOpenItems }}>
      <div className={cn('', className)}>{children}</div>
    </TextAccordionProvider>
  );
}

type TextAccordionItemProps = {
  children: React.ReactNode;
  id: string;
  className?: string;
};

export function TextAccordionItem({ id, children, className = '' }: TextAccordionItemProps) {
  const { registerItem } = useTextAccordion();

  useEffect(() => {
    registerItem(id);
  }, [id, registerItem]);

  return (
    <TextAccordionItemProvider id={id}>
      <div className={cn('flex items-center justify-center gap-3', className)}>{children}</div>
    </TextAccordionItemProvider>
  );
}

type TextAccordionTriggerProps = {
  children: React.ReactNode;
  action?: () => void;
  className?: string;
  asChild?: boolean;
};

export function TextAccordionTrigger({ children, action, className = '', asChild = false }: TextAccordionTriggerProps) {
  const { closeAfterMilliseconds, collapsible } = useTextAccordion().options;
  const { state, setOpenState, setClosedState } = useTextAccordionItem();

  const deboucedSetClosed = useCallback(
    _.debounce(() => setClosedState(), closeAfterMilliseconds),
    [],
  );

  const handleClick = () => {
    if (action) action();

    if (collapsible) {
      if (state === 'closed') setOpenState();
      if (state === 'open') setClosedState();
    } else {
      setOpenState();
    }

    if (closeAfterMilliseconds) deboucedSetClosed();
  };

  if (asChild && React.isValidElement(children)) {
    return (
      <>
        {React.cloneElement(children, {
          ...children.props,
          onClick: handleClick,
          className: cn('select-none', children.props.className),
        })}
      </>
    );
  }

  return (
    <button className={cn('select-none', className)} onClick={handleClick}>
      {children}
    </button>
  );
}

export function TextAccordionContent({ children }: { children: React.ReactElement }) {
  const { state } = useTextAccordionItem();
  const childRef = useRef<Element>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (childRef.current) {
      const { width } = childRef.current.getBoundingClientRect();
      setWidth(Math.ceil(width));
    }
  }, [children]);

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
        {React.cloneElement(children, { ref: childRef })}
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
