import React, { createContext, useContext, useState } from 'react';

type Item = {
  id: string;
  state: 'open' | 'closed';
  setOpenState: () => void;
  setClosedState: () => void;
};

type TextAccordionContextProps = {
  registerItem: (id: string) => void;
  getItem: (id: string) => Item | undefined;
  options: Options;
};

const TextAccordionContext = createContext<TextAccordionContextProps | undefined>(undefined);

type Options = { closeAfterMilliseconds?: number; togglableClose?: boolean };

type TextAccordionProviderProps = {
  children: React.ReactNode;
  options: Options;
};

export function TextAccordionProvider({ children, options }: TextAccordionProviderProps) {
  const [items, setItems] = useState<Item[]>([]);

  const getItem = (id: string) => {
    return items.find((item) => item.id === id);
  };

  const registerItem = (id: string) => {
    if (getItem(id)) return;

    const setOpenState = () => {
      setItems((prevItems) => prevItems.map((item) => (id === item.id ? { ...item, state: 'open' } : item)));
    };

    const setClosedState = () => {
      setItems((prevItems) => prevItems.map((item) => (id === item.id ? { ...item, state: 'closed' } : item)));
    };

    setItems([
      ...items,
      {
        id,
        state: 'closed',
        setOpenState,
        setClosedState,
      },
    ]);
  };

  return (
    <TextAccordionContext.Provider value={{ registerItem, getItem, options }}>{children}</TextAccordionContext.Provider>
  );
}

export function useTextAccordion() {
  const context = useContext(TextAccordionContext);

  if (!context) throw new Error('useTextAccordion must be used within an TextAccordionProvider');

  return context;
}
