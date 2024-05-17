'use client';

import { cn } from '@/lib/utils';
import Crank from '/Crank.svg';
import React, { useEffect, useRef, useState } from 'react';

function Header() {
  const leftElementRef = useRef<HTMLDivElement>(null);
  const rightElementRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [shiftValue, setShiftValue] = useState<number | null>(null);
  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    if (containerRef.current) setTimeout(() => setInitialRender(false), 1);
  }, [containerRef]);

  useEffect(() => {
    let resizeObserverEntries: ResizeObserverEntry[] = [];

    const observer = new ResizeObserver((entries) => {
      resizeObserverEntries = entries;

      if (leftElementRef.current && rightElementRef.current) {
        setShiftValue((leftElementRef.current.clientWidth - rightElementRef.current.clientWidth) / 2);
      }
    });

    if (leftElementRef.current) observer.observe(leftElementRef.current);
    if (rightElementRef.current) observer.observe(rightElementRef.current);

    return () => {
      resizeObserverEntries.forEach((entry) => entry.target.remove());
      observer.disconnect();
    };
  }, []);

  return (
    <a href={'/'} className={cn('mt-4 w-full', initialRender && 'opacity-0')}>
      <div
        ref={containerRef}
        style={{ '--shift-width': `${shiftValue}px` } as React.CSSProperties}
        className={cn(
          'group relative mx-auto flex w-fit -translate-x-[var(--shift-width)] items-center justify-center duration-0 ease-out hover:translate-x-0',
          !initialRender && 'duration-700',
        )}
      >
        <div ref={leftElementRef} className='overflow-hidden duration-700'>
          <h1 className='relative -z-10 min-w-fit translate-x-full text-right text-4xl font-bold tracking-widest duration-700 ease-out group-hover:translate-x-0 group-active:underline group-active:underline-offset-4'>
            GEAR RAT
          </h1>
        </div>
        <div className='min-w-fit'>
          <img
            className='relative h-20 w-20 -rotate-90 duration-700 ease-out group-hover:rotate-[270deg]'
            src={Crank}
            alt='Logo'
          />
        </div>
        <div ref={rightElementRef} className='overflow-hidden duration-700'>
          <div className='relative -z-10 min-w-max -translate-x-full text-4xl font-black tracking-widest  duration-700  ease-out group-hover:translate-x-0 group-active:underline group-active:underline-offset-4'>
            S
          </div>
        </div>
      </div>
    </a>
  );
}

export default Header;
