import { cn } from '@/lib/utils';
import { RIDING_STYLES, RidingStyle } from '@/types/RidingStyle';

type RidingStyleSelectProps = {
  ridingStyle: RidingStyle;
  setRidingStyle: (newRidingStyle: RidingStyle) => void;
};

function RidingStyleSelect({ ridingStyle, setRidingStyle }: RidingStyleSelectProps) {
  return (
    <fieldset>
      <legend className='mb-2 text-xl font-bold'>Riding Style</legend>

      <div className='flex gap-4'>
        {RIDING_STYLES.map((rs) => (
          <label
            className={cn(
              'cursor-pointer font-semibold',
              rs === ridingStyle && 'underline decoration-2 underline-offset-4',
            )}
            key={rs}
          >
            <span>{rs}</span>
            <input
              checked={rs === ridingStyle}
              className='sr-only'
              onChange={(e) => setRidingStyle(e.target.value as RidingStyle)}
              type='radio'
              name='ridingStyle'
              value={rs}
            />
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default RidingStyleSelect;
