import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { drivetrainSlice } from '@/store/features/drivetrain/drivetrainSlice';
import { Drivetrain } from '@/types/Drivetrain';
import { WHEEL_SIZES, WheelSize } from '@/types/WheelSize';
import { LinkButton } from './LinkButton';

type WheelSizeSelectProps = {
  drivetrain: Drivetrain;
};

function WheelSizeSelect({ drivetrain }: WheelSizeSelectProps) {
  const link = useAppSelector((state) => state.drivetrain.options.linkWheelSize);
  const { toggleLinkWheelSize, updateWheelSize } = drivetrainSlice.actions;
  const dispatch = useAppDispatch();

  return (
    <fieldset>
      <legend className='mb-2 text-xl font-bold'>Wheel size</legend>

      <div className='flex gap-1'>
        {WHEEL_SIZES.map((ws) => (
          <label
            data-state={ws === drivetrain.wheelSize ? 'selected' : 'not-selected'}
            className='cursor-pointer rounded-md py-1 pl-3 pr-2 font-semibold transition-colors ease-in-out hover:bg-background/60 active:bg-background data-[state=selected]:cursor-default data-[state=selected]:bg-background/85'
            key={ws}
          >
            <span>{ws}&Prime;</span>
            <input
              checked={ws === drivetrain.wheelSize}
              className='sr-only'
              onChange={(e) => dispatch(updateWheelSize({ ...drivetrain, wheelSize: e.target.value as WheelSize }))}
              type='radio'
              name='wheelSize'
              value={ws}
            />
          </label>
        ))}

        <LinkButton link={link} toggle={() => dispatch(toggleLinkWheelSize(drivetrain.id))} />
      </div>
    </fieldset>
  );
}

export default WheelSizeSelect;
