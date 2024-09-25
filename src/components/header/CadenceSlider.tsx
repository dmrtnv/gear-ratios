import { useId, useState } from 'react';
import { Slider } from '../ui/slider';

type CadenceSliderProps = {
  label: string;
  defaultValue: number[];
  max: number;
  min: number;
  step?: number;
};

function CadenceSlider({ label, defaultValue, max, min, step = 1 }: CadenceSliderProps) {
  const id = useId();
  const [value, setValue] = useState(defaultValue);

  return (
    <div className='flex w-full items-center justify-between gap-3 font-semibold text-muted-foreground'>
      <label htmlFor={id} className='w-16'>
        {label}
      </label>
      <Slider
        defaultValue={defaultValue}
        value={value}
        onValueChange={(value) => setValue(value)}
        max={max}
        min={min}
        step={step}
        id={id}
        className='pt-1'
      />

      <p className='w-12 text-end tabular-nums'>{value}</p>
    </div>
  );
}

export default CadenceSlider;
