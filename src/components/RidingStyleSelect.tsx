import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { cn } from '@/lib/utils';
import { drivetrainSlice } from '@/store/features/drivetrain/drivetrainSlice';
import { Drivetrain } from '@/types/Drivetrain';
import { RIDING_STYLES, RidingStyle } from '@/types/RidingStyle';
import { LinkButton } from './LinkButton';

type RidingStyleSelectProps = {
  drivetrain: Drivetrain;
};

function RidingStyleSelect({ drivetrain }: RidingStyleSelectProps) {
  const link = useAppSelector((state) => state.drivetrain.options.linkRidingStyle);
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

        <LinkButton link={link} toggle={() => dispatch(toggleLinkRidingStyle(drivetrain.id))} />
      </div>
    </fieldset>
  );
}

export default RidingStyleSelect;
