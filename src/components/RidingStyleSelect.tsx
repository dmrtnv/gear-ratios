import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { cn } from '@/lib/utils';
import { drivetrainSlice } from '@/store/features/drivetrain/drivetrainSlice';
import { Drivetrain } from '@/types/Drivetrain';
import { RIDING_STYLES, RidingStyle } from '@/types/RidingStyle';
import _ from 'lodash';
import { Link2, Link2Off } from 'lucide-react';
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

      <div className='flex items-center justify-center'>
        <span className='mr-1'>/</span>
        <div
          data-state={active ? 'enabled' : 'disabled'}
          className='overflow-hidden text-nowrap transition-[width] duration-1000 ease-out data-[state=active]:w-[100px] data-[state=disabled]:w-0'
        >
          {link ? <span>riding styles linked</span> : <span>riding styles unlinked</span>}
        </div>
        <span className='ml-1'>/</span>
      </div>
    </div>
  );
}

export default RidingStyleSelect;
