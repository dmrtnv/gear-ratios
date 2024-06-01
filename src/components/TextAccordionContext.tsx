import React, { createContext, useContext, useState } from 'react';

type TextAccordionContextProps = {
  state: 'open' | 'closed';
  setOpenState: () => void;
  setClosedState: () => void;
};

const TextAccordionContext = createContext<TextAccordionContextProps | undefined>(undefined);

export function TextAccordionProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<'open' | 'closed'>('closed');

  const setOpenState = () => {
    setState('open');
  };

  const setClosedState = () => {
    setState('closed');
  };

  return (
    <TextAccordionContext.Provider value={{ state, setOpenState, setClosedState }}>
      {children}
    </TextAccordionContext.Provider>
  );
}

export function useTextAccordion() {
  const context = useContext(TextAccordionContext);

  if (!context) throw new Error('useTextAccordion must be used within an TextAccordionProvider');

  return context;
}
