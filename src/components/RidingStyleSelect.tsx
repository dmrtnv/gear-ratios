import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { cn } from '@/lib/utils';
import { drivetrainSlice } from '@/store/features/drivetrain/drivetrainSlice';
import { Drivetrain } from '@/types/Drivetrain';
import { RIDING_STYLES, RidingStyle } from '@/types/RidingStyle';
import _ from 'lodash';
import { Link2, Link2Off, Slash } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

type RidingStyleSelectProps = {
  drivetrain: Drivetrain;
};

function RidingStyleSelect({ drivetrain }: RidingStyleSelectProps) {
  const { toggleLinkRidingStyle, updateRidingStyle } = drivetrainSlice.actions;
  const dispatch = useAppDispatch();

  return (
    <fieldset>
      <legend className='mb-2 text-xl font-bold'>Riding Style</legend>

      <div className='flex items-center gap-4'>
        {RIDING_STYLES.map((rs) => (
          <label
            className={cn(
              'cursor-pointer font-semibold',
              rs === drivetrain.ridingStyle && 'underline decoration-2 underline-offset-4',
            )}
            key={rs}
          >
            <span>{rs}</span>
            <input
              checked={rs === drivetrain.ridingStyle}
              className='sr-only'
              onChange={(e) =>
                dispatch(updateRidingStyle({ ...drivetrain, ridingStyle: e.target.value as RidingStyle }))
              }
              type='radio'
              name='ridingStyle'
              value={rs}
            />
          </label>
        ))}

        <LinkButton toggle={() => dispatch(toggleLinkRidingStyle(drivetrain.id))} />
      </div>
    </fieldset>
  );
}

function LinkButton({ toggle }: { toggle: () => void }) {
  const link = useAppSelector((state) => state.drivetrain.options.linkRidingStyle);
  const [active, setActive] = useState(false);

  const deboucedSetDisabled = useCallback(
    _.debounce(() => setActive(false), 2000),
    [],
  );

  return (
    <div className='flex items-center justify-center gap-3'>
      <button
        className='ml-2 mt-1'
        onClick={() => {
          toggle();
          setActive(true);
          deboucedSetDisabled();
        }}
      >
        {link ? <Link2 size={18} strokeWidth={2} /> : <Link2Off size={18} strokeWidth={2} />}
      </button>

      <div className='group flex items-center justify-center'>
        <Slash
          size={16}
          className={cn(
            '-rotate-45 text-muted-foreground transition-all duration-300',
            active ? '-rotate-12 opacity-100' : 'opacity-0 delay-150',
          )}
        />

        <div
          className={cn(
            'max-w-0 overflow-hidden text-nowrap transition-[max-width] duration-300',
            active && 'max-w-16',
          )}
        >
          {link ? (
            <span className='text-muted-foreground'>linked</span>
          ) : (
            <span className='text-muted-foreground'>unlinked</span>
          )}
        </div>

        <Slash
          size={16}
          className={cn(
            'relative -translate-x-[100%] -rotate-45 text-muted-foreground transition-all duration-300',
            active ? 'translate-x-0 -rotate-12 opacity-100' : 'opacity-0 delay-150',
          )}
        />
      </div>
    </div>
  );
}

export default RidingStyleSelect;
