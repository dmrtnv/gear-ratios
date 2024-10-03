import { cn } from '@/lib/utils';
import React from 'react';
import { SelectGroupProvider } from './SelectGroupContext';

type SelectGroupProps = {
  groupName: string;
  children?: React.ReactNode;
  className?: string;
  areaLabel?: string;
};

export function SelectGroup({ children, groupName, className = '', areaLabel = '', ...props }: SelectGroupProps) {
  return (
    <SelectGroupProvider groupName={groupName}>
      <fieldset role='radiogroup' aria-label={areaLabel} className={cn('', className)} {...props}>
        {children}
      </fieldset>
    </SelectGroupProvider>
  );
}
