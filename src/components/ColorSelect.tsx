import { COLORS, Color } from '@/types/Color';
import React from 'react';
import { TextAccordion, TextAccordionContent, TextAccordionItem, TextAccordionTrigger } from './TextAccordion';

type ColorSelectProps = {
  color: Color;
  setColor: (newColor: Color) => void;
};

function ColorSelect({ color, setColor }: ColorSelectProps) {
  return (
    <fieldset>
      <legend className='mb-2 text-xl font-bold'>Color</legend>

      <TextAccordion defaultOpenItems={[color.name]} className='flex flex-wrap gap-3'>
        {COLORS.map((clr) => (
          <TextAccordionItem id={clr.name} key={clr.name} className='gap-2'>
            <TextAccordionTrigger asChild>
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
            </TextAccordionTrigger>
            <TextAccordionContent>
              <label htmlFor={clr.name}>{clr.name}</label>
            </TextAccordionContent>
          </TextAccordionItem>
        ))}
      </TextAccordion>
    </fieldset>
  );
}

export default ColorSelect;
