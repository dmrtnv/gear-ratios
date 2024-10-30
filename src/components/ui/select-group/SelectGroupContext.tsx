import React, { createContext, useContext, useId } from 'react';

type SelectGroupProvider = {
  groupName: string;
  salt: string;
};

const initialState: SelectGroupProvider = {
  groupName: '',
  salt: '',
};

const SelectGroupContext = createContext<SelectGroupProvider>(initialState);

type SelectGroupProviderProps = {
  groupName: string;
  children?: React.ReactNode;
};

export function SelectGroupProvider({ children, groupName, ...props }: SelectGroupProviderProps) {
  const salt = useId();

  return (
    <SelectGroupContext.Provider value={{ groupName: groupName + salt, salt }} {...props}>
      {children}
    </SelectGroupContext.Provider>
  );
}

export function useSelectGroupContext() {
  const context = useContext(SelectGroupContext);

  if (!context) throw new Error('useSelectGroupContext must be used within a SelectGroupProvider');

  return context;
}
