import { useAppDispatch, useAppSelector } from '@/hooks/redux';
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

      <div className='flex items-center gap-1'>
        {RIDING_STYLES.map((rs) => (
          <label
            data-state={rs === drivetrain.ridingStyle ? 'selected' : 'not-selected'}
            className='cursor-pointer rounded-md px-3 py-1 font-semibold transition-colors ease-in-out hover:bg-background/60 active:bg-background data-[state=selected]:cursor-default data-[state=selected]:bg-background/85'
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
