import { COLORS, Color } from '@/types/Color';
import React, { useEffect, useState } from 'react';
import { TextAccordion, TextAccordionContent, TextAccordionItem, TextAccordionTrigger } from './TextAccordion';

type ColorSelectProps = {
  color: Color;
  setColor: (newColor: Color) => void;
};

function ColorSelect({ color, setColor }: ColorSelectProps) {
  const [inputIdSalt, setInputSalt] = useState('');

  useEffect(() => {
    setInputSalt(crypto.randomUUID());
  }, []);

  return (
    <fieldset>
      <legend className='mb-2 text-xl font-bold'>Color</legend>

      <TextAccordion defaultOpenItems={[color.name]} className='flex flex-wrap gap-3'>
        {COLORS.map((clr) => (
          <TextAccordionItem id={clr.name} key={clr.name} className='gap-2'>
            <TextAccordionTrigger asChild>
              <input
                id={clr.name + inputIdSalt}
                style={
                  {
                    '--bg-color': `${clr.hexValue}a0`,
                    '--outline-color': `${clr.hexValue}d2`,
                  } as React.CSSProperties
                }
                checked={clr.name === color.name}
                className='h-6 w-6 cursor-pointer appearance-none rounded-[50%] bg-[var(--bg-color)]  transition-all duration-300 ease-in-out checked:scale-110 checked:cursor-default checked:rounded-md checked:shadow-sm'
                onChange={(e) => setColor(COLORS.find((c) => c.name === e.target.value) as Color)}
                type='radio'
                name={'color-' + inputIdSalt}
                value={clr.name}
              />
            </TextAccordionTrigger>
            <TextAccordionContent>
              <label htmlFor={clr.name + inputIdSalt}>{clr.name}</label>
            </TextAccordionContent>
          </TextAccordionItem>
        ))}
      </TextAccordion>
    </fieldset>
  );
}

export default ColorSelect;
