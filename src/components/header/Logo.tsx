import { cn } from '@/lib/utils';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import CrankIcon from './CrankIcon';
import { drivetrainSlice } from '@/store/features/drivetrain/drivetrainSlice';
import { useAppDispatch } from '@/hooks/redux';

function Logo() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [width, setWidth] = useState(0);

  const { reset } = drivetrainSlice.actions;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (headingRef.current) {
      const { width } = headingRef.current.getBoundingClientRect();
      setWidth(Math.ceil(width));
    }
  }, [headingRef]);

  return (
    <Link to='/' onClick={() => dispatch(reset())} className='group flex items-center justify-center gap-2'>
      <CrankIcon
        className={cn(
          // base
          'h-20 w-20 fill-muted-foreground-lg group-active:fill-muted-foreground',
          // animation
          '-rotate-45 transition-transform duration-700 group-hover:rotate-[270deg]',
        )}
      />

      <div
        style={{ '--width': width + 'px' } as React.CSSProperties}
        className='flex max-w-0 overflow-hidden text-nowrap transition-[max-width] duration-700 group-hover:max-w-[var(--width)]'
      >
        <h1 ref={headingRef} className='text-3xl text-muted-foreground-lg group-active:text-muted-foreground'>
          GEAR RATIOS
        </h1>
      </div>
    </Link>
  );
}

export default Logo;
