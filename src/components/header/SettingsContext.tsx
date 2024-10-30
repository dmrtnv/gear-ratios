import React, { createContext, useContext, useState } from 'react';

type State = 'open' | 'closed';

type SettingsProviderState = {
  state: State;
  setState: (state: State) => void;
};

const initialState: SettingsProviderState = {
  state: 'closed',
  setState: () => null,
};

const SettingsContext = createContext<SettingsProviderState>(initialState);

type SettingsProviderProps = {
  children: React.ReactNode;
};

export function SettingsProvider({ children, ...props }: SettingsProviderProps) {
  const [state, setState] = useState<State>('closed');

  return (
    <SettingsContext.Provider value={{ state, setState }} {...props}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);

  if (!context) throw new Error('useSettings must be used within a SettingsProvider');

  return context;
}
