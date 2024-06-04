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
          <div key={clr.name}>
            <label htmlFor={clr.name}>{clr.name}</label>
            <input
              id={clr.name}
              style={
                {
                  '--bg-color': `${clr.hexValue}a0`,
                  '--outline-color': `${clr.hexValue}d2`,
                } as React.CSSProperties
              }
              checked={clr.name === color.name}
              className='h-6 w-6 cursor-pointer appearance-none rounded-full bg-[var(--bg-color)] outline-[3px] outline-[var(--outline-color)] checked:cursor-default checked:outline'
              onChange={(e) => setColor(COLORS.find((c) => c.name === e.target.value) as Color)}
              type='radio'
              name='color'
              value={clr.name}
            />
          </div>
        ))}
      </div>
    </fieldset>
  );
}

export default ColorSelect;
