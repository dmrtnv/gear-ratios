import useWindowSize from '@/hooks/useWindowSize';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const MOBILE_MAX_WIDTH = 768;

type Layout = 'tabs' | 'columns';

type LayoutProviderProps = {
  children: React.ReactNode;
  defaultLayout?: Layout;
  storageKey?: string;
};

type LayoutProviderState = {
  isMobile: boolean;
  layout: Layout;
  setLayout: (layout: Layout) => void;
};

const initialState: LayoutProviderState = {
  isMobile: true,
  layout: 'columns',
  setLayout: () => null,
};

const LayoutContext = createContext<LayoutProviderState>(initialState);

export default function LayoutProvider({
  children,
  defaultLayout = 'tabs',
  storageKey = 'gear-ratios-layout',
  ...props
}: LayoutProviderProps) {
  const { width } = useWindowSize();

  const isMobile = useMemo(() => width < MOBILE_MAX_WIDTH, [width]);

  const [layout, setLayout] = useState<Layout>(
    () => (isMobile && 'columns') || (localStorage.getItem(storageKey) as Layout) || defaultLayout,
  );

  useEffect(() => {
    if (isMobile) {
      setLayout('columns');
    } else {
      setLayout((localStorage.getItem(storageKey) as Layout) || defaultLayout);
    }
  }, [isMobile, defaultLayout, storageKey]);

  const value: LayoutProviderState = {
    isMobile,
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
