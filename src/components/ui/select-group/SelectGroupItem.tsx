import { cn } from '@/lib/utils';
import { useSelectGroupContext } from './SelectGroupContext';
import React from 'react';

type SelectGroupItemProps = {
  checked: boolean;
  id: string;
  onChange: () => void;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export function SelectGroupItem({ checked, id, onChange, children, className = '', style = {} }: SelectGroupItemProps) {
  const { groupName, salt } = useSelectGroupContext();

  const idWithSalt = id + salt;

  return (
    <div>
      <input
        id={idWithSalt}
        checked={checked}
        onChange={onChange}
        name={groupName}
        type='radio'
        className='peer sr-only'
      />
      <label
        style={style}
        className={cn(
          'flex cursor-pointer items-center rounded-md px-3 py-1 hover:bg-muted-md peer-checked:cursor-default peer-checked:bg-muted-lg peer-checked:shadow-sm peer-focus-visible:outline',
          className,
        )}
        htmlFor={idWithSalt}
      >
        {children}
      </label>
    </div>
  );
}
