import React, { createContext, useContext, useState } from 'react';

type Layout = 'tabs' | 'columns';

type LayoutProviderProps = {
  children: React.ReactNode;
  defaultLayout?: Layout;
  storageKey?: string;
};

type LayoutProviderState = {
  layout: Layout;
  setLayout: (layout: Layout) => void;
};

const initialState: LayoutProviderState = {
  layout: 'tabs',
  setLayout: () => null,
};

const LayoutContext = createContext<LayoutProviderState>(initialState);

export default function LayoutProvider({
  children,
  defaultLayout = 'tabs',
  storageKey = 'gear-ratios-layout',
  ...props
}: LayoutProviderProps) {
  const [layout, setLayout] = useState<Layout>(() => (localStorage.getItem(storageKey) as Layout) || defaultLayout);

  const value: LayoutProviderState = {
    layout,
    setLayout: (newLayout: Layout) => {
      localStorage.setItem(storageKey, newLayout);
      setLayout(newLayout);
    },
  };

  return (
    <LayoutContext.Provider {...props} value={value}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  const context = useContext(LayoutContext);

  if (!context) throw new Error('useLayout must be used within a LayoutContext');

  return context;
}
