import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTextAccordion } from './TextAccordionContext';

type TextAccordionItem = {
  id: string;
  state: 'open' | 'closed';
  setOpenState: () => void;
  setClosedState: () => void;
};

const TextAccordionItemContext = createContext<TextAccordionItem | undefined>(undefined);

export function TextAccordionItemProvider({ children, id }: { children: React.ReactNode; id: string }) {
  const [item, setItem] = useState<TextAccordionItem | undefined>(undefined);
  const { getItem } = useTextAccordion();

  useEffect(() => {
    setItem(getItem(id));
  }, [id, getItem]);

  if (!item) return;

  return <TextAccordionItemContext.Provider value={item}>{children}</TextAccordionItemContext.Provider>;
}

export function useTextAccordionItem() {
  const context = useContext(TextAccordionItemContext);

  if (!context) throw new Error('useTextAccordionItem should be used within TextAccordionItemProvider');

  return context;
}
