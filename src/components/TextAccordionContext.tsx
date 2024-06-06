import React, { createContext, useContext, useEffect, useState } from 'react';

type Item = {
  id: string;
  state: 'open' | 'closed';
  setOpenState: () => void;
  setClosedState: () => void;
};

type TextAccordionContextProps = {
  getItem: (id: string) => Item | undefined;
  options: Options;
};

const TextAccordionContext = createContext<TextAccordionContextProps | undefined>(undefined);

export type Options = {
  closeAfterMilliseconds?: number;
  collapsible?: boolean;
  type?: 'single' | 'multiple';
  defaultOpenItems?: string[];
};

type TextAccordionProviderProps = {
  children: React.ReactNode;
  options: Options;
  ids: string[];
};

export function TextAccordionProvider({ children, options, ids }: TextAccordionProviderProps) {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    console.log(ids);

    const registerItems = (ids: string[]) => {
      setItems(
        ids.map((id) => {
          const setOpenState = () => {
            setItems((prevItems) =>
              prevItems.map((item) =>
                id === item.id
                  ? { ...item, state: 'open' }
                  : { ...item, ...(options.type === 'single' && { state: 'closed' }) },
              ),
            );
          };

          const setClosedState = () => {
            setItems((prevItems) => prevItems.map((item) => (id === item.id ? { ...item, state: 'closed' } : item)));
          };

          return {
            id,
            state: options.defaultOpenItems?.includes(id) ? 'open' : 'closed',
            setOpenState,
            setClosedState,
          };
        }),
      );
    };

    registerItems(ids);
  }, []);

  const getItem = (id: string) => {
    return items.find((item) => item.id === id);
  };

  return <TextAccordionContext.Provider value={{ getItem, options }}>{children}</TextAccordionContext.Provider>;
}

export function useTextAccordion() {
  const context = useContext(TextAccordionContext);

  if (!context) throw new Error('useTextAccordion must be used within an TextAccordionProvider');

  return context;
}
