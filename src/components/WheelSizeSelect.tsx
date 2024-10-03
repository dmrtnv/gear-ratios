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

      <div className='flex items-center gap-1'>
        {WHEEL_SIZES.map((ws) => (
          <label
            style={
              {
                '--bg-color-hover': drivetrain.color.hexValue + '30',
                '--bg-color-selected': drivetrain.color.hexValue + '40',
                '--bg-color-active': drivetrain.color.hexValue + '50',
              } as React.CSSProperties
            }
            data-state={ws === drivetrain.wheelSize ? 'selected' : 'not-selected'}
            className='cursor-pointer rounded-md py-1 pl-3 pr-2 font-semibold transition-colors ease-in-out hover:bg-[var(--bg-color-hover)] active:bg-[var(--bg-color-active)] data-[state=selected]:cursor-default data-[state=selected]:bg-[var(--bg-color-selected)] data-[state=selected]:shadow-sm'
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
