import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { cn } from '@/lib/utils';
import { drivetrainSlice } from '@/store/features/drivetrain/drivetrainSlice';
import { Drivetrain } from '@/types/Drivetrain';
import { WHEEL_SIZES } from '@/types/WheelSize';
import { LinkButton } from './LinkButton';
import { SelectGroup } from './ui/select-group/SelectGroup';
import { SelectGroupItem } from './ui/select-group/SelectGroupItem';
import SelectGroupLegend from './ui/select-group/SelectGroupLegend';

type WheelSizeSelectProps = {
  drivetrain: Drivetrain;
};

function WheelSizeSelect({ drivetrain }: WheelSizeSelectProps) {
  const link = useAppSelector((state) => state.drivetrain.options.linkWheelSize);
  const { toggleLinkWheelSize, updateWheelSize } = drivetrainSlice.actions;
  const dispatch = useAppDispatch();

  return (
    <SelectGroup groupName='wheel-size-select' areaLabel='Wheel size select'>
      <SelectGroupLegend>Wheel size</SelectGroupLegend>

      <div className='flex items-center gap-1'>
        {WHEEL_SIZES.map((ws) => (
          <SelectGroupItem
            key={ws}
            id={ws}
            checked={ws === drivetrain.wheelSize}
            onChange={() => dispatch(updateWheelSize({ ...drivetrain, wheelSize: ws }))}
            style={
              {
                '--bg-color-hover': drivetrain.color.hexValue + '30',
                '--bg-color-selected': drivetrain.color.hexValue + '40',
                '--bg-color-active': drivetrain.color.hexValue + '50',
              } as React.CSSProperties
            }
            className={cn(
              // base
              'py-1 pl-3 pr-2 font-semibold',
              // transitions
              'transition-colors ease-in-out',
              // colors
              'hover:bg-[var(--bg-color-hover)] active:bg-[var(--bg-color-active)] peer-checked:bg-[var(--bg-color-selected)]',
            )}
          >
            {ws}&Prime;
          </SelectGroupItem>
        ))}

        <LinkButton link={link} toggle={() => dispatch(toggleLinkWheelSize(drivetrain.id))} />
      </div>
    </SelectGroup>
  );
}

export default WheelSizeSelect;
