import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { cn } from '@/lib/utils';
import { drivetrainSlice } from '@/store/features/drivetrain/drivetrainSlice';
import { Drivetrain } from '@/types/Drivetrain';
import { RIDING_STYLES } from '@/types/RidingStyle';
import { LinkButton } from './LinkButton';
import { SelectGroup } from './ui/select-group/SelectGroup';
import { SelectGroupItem } from './ui/select-group/SelectGroupItem';
import SelectGroupLegend from './ui/select-group/SelectGroupLegend';

type RidingStyleSelectProps = {
  drivetrain: Drivetrain;
};

function RidingStyleSelect({ drivetrain }: RidingStyleSelectProps) {
  const link = useAppSelector((state) => state.drivetrain.options.linkRidingStyle);
  const { toggleLinkRidingStyle, updateRidingStyle } = drivetrainSlice.actions;
  const dispatch = useAppDispatch();

  return (
    <SelectGroup groupName='riding-style-select' areaLabel='Riding style select'>
      <SelectGroupLegend>Riding style</SelectGroupLegend>

      <div className='flex items-center gap-1'>
        {RIDING_STYLES.map((rs) => (
          <SelectGroupItem
            key={rs}
            id={rs}
            checked={rs === drivetrain.ridingStyle}
            onChange={() => dispatch(updateRidingStyle({ ...drivetrain, ridingStyle: rs }))}
            style={
              {
                '--bg-color-hover': drivetrain.color.hexValue + '30',
                '--bg-color-selected': drivetrain.color.hexValue + '40',
                '--bg-color-active': drivetrain.color.hexValue + '50',
              } as React.CSSProperties
            }
            className={cn(
              // base
              'px-3 py-1 font-semibold',
              // transitions
              'transition-colors ease-in-out',
              // colors
              'hover:bg-[var(--bg-color-hover)] active:bg-[var(--bg-color-active)] peer-checked:bg-[var(--bg-color-selected)]',
            )}
          >
            {rs}
          </SelectGroupItem>
        ))}

        <LinkButton link={link} toggle={() => dispatch(toggleLinkRidingStyle(drivetrain.id))} />
      </div>
    </SelectGroup>
  );
}

export default RidingStyleSelect;
