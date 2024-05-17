import { cn } from '@/lib/utils';
import { WHEEL_SIZES, WheelSize } from '@/types/WheelSize';

type WheelSizeSelectProps = {
  wheelSize: WheelSize;
  setWheelSize: (newWheelSize: WheelSize) => void;
};

function WheelSizeSelect({ wheelSize, setWheelSize }: WheelSizeSelectProps) {
  return (
    <fieldset>
      <legend className='mb-2 text-xl font-bold'>Wheel size</legend>

      <div className='flex gap-4'>
        {WHEEL_SIZES.map((ws) => (
          <label
            className={cn(
              'cursor-pointer font-semibold',
              ws === wheelSize && 'underline decoration-2 underline-offset-4',
            )}
            key={ws}
          >
            <span>{ws}&Prime;</span>
            <input
              checked={ws === wheelSize}
              className='sr-only'
              onChange={(e) => setWheelSize(e.target.value as WheelSize)}
              type='radio'
              name='wheelSize'
              value={ws}
            />
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default WheelSizeSelect;
