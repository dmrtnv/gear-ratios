import { cn } from '@/lib/utils';
import { COLORS, Color } from '@/types/Color';
import React from 'react';

type ColorSelectProps = {
  color: Color;
  setColor: (newColor: Color) => void;
};

function ColorSelect({ color, setColor }: ColorSelectProps) {
  return (
    <fieldset>
      <legend className='mb-2 text-xl font-bold'>Color</legend>

      <div className='flex gap-4'>
        {COLORS.map((clr) => (
          <label
            key={clr.name}
            style={
              {
                '--bg-color': `${clr.hexValue}a0`,
                '--outline-color': `${clr.hexValue}d2`,
              } as React.CSSProperties
            }
            className={cn(
              'h-6 w-6 cursor-pointer rounded-full bg-[var(--bg-color)]',
              clr.name === color.name && 'cursor-default outline outline-[var(--outline-color)]',
            )}
          >
            <input
              checked={clr.name === color.name}
              className='sr-only'
              onChange={(e) => setColor(COLORS.find((c) => c.name === e.target.value) as Color)}
              type='radio'
              name='color'
              value={clr.name}
            />
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default ColorSelect;
