import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { cn } from '@/lib/utils';
import { drivetrainSlice } from '@/store/features/drivetrain/drivetrainSlice';
import { Drivetrain } from '@/types/Drivetrain';
import { WHEEL_SIZES, WheelSize } from '@/types/WheelSize';
import { Link2, Link2Off } from 'lucide-react';

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

      <div className='flex gap-4'>
        {WHEEL_SIZES.map((ws) => (
          <label
            className={cn(
              'cursor-pointer font-semibold',
              ws === drivetrain.wheelSize && 'underline decoration-2 underline-offset-4',
            )}
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

        <button className='ml-2 mt-1' onClick={() => dispatch(toggleLinkWheelSize(drivetrain.id))}>
          {link ? <Link2 size={18} strokeWidth={2} /> : <Link2Off size={18} strokeWidth={2} />}
        </button>
      </div>
    </fieldset>
  );
}

export default WheelSizeSelect;
