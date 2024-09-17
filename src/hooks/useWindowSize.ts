import { useEffect, useState } from 'react';

type WindowSize = {
  height: number;
  width: number;
};

export default function useWindowSize() {
  const [size, setSize] = useState<WindowSize>({ height: window.innerHeight, width: window.innerWidth });

  useEffect(() => {
    const handleResize = () => {
      if (typeof window === 'undefined') return;

      const height = window.innerHeight;
      const width = window.innerWidth;

      setSize({ height, width });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return size;
}
