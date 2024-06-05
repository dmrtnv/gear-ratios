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
  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    setTimeout(() => setInitialRender(false), 1);
  }, []);

  useEffect(() => {
    if (childRef.current) {
      const { width } = childRef.current.getBoundingClientRect();
      setWidth(Math.ceil(width));
    }
  }, [children]);

  return (
    <div
      data-state={state}
      style={{ '--width': width + 32 + 'px' } as React.CSSProperties}
      className={cn(
        'group flex items-center justify-center transition-[max-width] duration-300 ease-in-out data-[state=closed]:max-w-0 data-[state=open]:max-w-[var(--width)]',
        initialRender && 'duration-0',
      )}
    >
      <Slash
        data-state={state}
        size={16}
        className={cn(
          '-rotate-45 transition-all duration-300 ease-in-out data-[state=open]:-rotate-12',
          initialRender && 'duration-0',
        )}
      />

      <div
        data-state={state}
        style={{ '--width': width + 'px' } as React.CSSProperties}
        className={cn(
          'max-w-0 overflow-hidden text-nowrap transition-[max-width] duration-300 ease-in-out data-[state=open]:max-w-[var(--width)]',
          initialRender && 'duration-0',
        )}
      >
        {React.cloneElement(children, { ref: childRef })}
      </div>

      <Slash
        data-state={state}
        size={16}
        className={cn(
          'relative -translate-x-[100%] -rotate-45 transition-all duration-300 ease-in-out data-[state=open]:translate-x-0 data-[state=open]:-rotate-12',
          initialRender && 'duration-0',
        )}
      />
    </div>
  );
}
