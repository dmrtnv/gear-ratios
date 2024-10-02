import { Slider } from '../ui/slider';

type CadenceSliderProps = {
  value: number[];
  setValue: (newValue: number[]) => void;
  label: string;
  max: number;
  min: number;
  step?: number;
};

function CadenceSlider({ value, setValue, label, max, min, step = 1 }: CadenceSliderProps) {
  return (
    <div className='flex w-full items-center justify-between gap-3 font-semibold text-muted-foreground'>
      <h4 className='w-16'>{label}</h4>

      <Slider
        value={value}
        onValueChange={(value) => setValue(value)}
        max={max}
        min={min}
        step={step}
        className='pt-1'
      />

      <p className='w-16 text-end tabular-nums'>{value}</p>
    </div>
  );
}

export default CadenceSlider;
