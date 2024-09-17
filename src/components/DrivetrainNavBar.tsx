import { useDrivetrainSelectGroupContext } from '@/contexts/DrivetrainSelectGroupProvider';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { drivetrainSlice } from '@/store/features/drivetrain/drivetrainSlice';
import { Drivetrain } from '@/types/Drivetrain';
import { Plus, X } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import LayoutToggle from './LayoutToggle';

const DEFAULT_MAX_LENGTH = 5;

function DrivetrainNavBar({ maxLength = DEFAULT_MAX_LENGTH }: { maxLength?: number }) {
  const drivetrains = useAppSelector((state) => state.drivetrain.drivetrains);

  return (
    <ul className='flex w-full items-center gap-2 px-2'>
      {drivetrains.map((drivetrain) => (
        <DrivetrainNavBarItem key={drivetrain.id} drivetrain={drivetrain} />
      ))}

      {drivetrains.length < maxLength && (
        <li className='py-1'>
          <DrivetrainNavBarAddButton />
        </li>
      )}

      <li className='ml-auto py-1'>
        <LayoutToggle iconSize={16} className='p-1.5' />
      </li>
    </ul>
  );
}

type DrivetrainNavBarItemProps = {
  drivetrain: Drivetrain;
};

function DrivetrainNavBarItem({ drivetrain }: DrivetrainNavBarItemProps) {
  const dispatch = useAppDispatch();
  const { remove } = drivetrainSlice.actions;
  const { selectedDrivetrainId, setSelectedDrivetrainId } = useDrivetrainSelectGroupContext();

  const selected = selectedDrivetrainId === drivetrain.id;

  return (
    <li
      style={{ '--bg-color': drivetrain.color.hexValue + '35' } as React.CSSProperties}
      data-state={selected ? 'selected' : 'not-selected'}
      className='flex min-w-0 select-none rounded-t-xl py-1 transition-colors ease-in-out data-[state=selected]:bg-[var(--bg-color)]'
    >
      <div
        onClick={() => {
          if (selected) return;

          setSelectedDrivetrainId(drivetrain.id);
        }}
        data-state={selected ? 'selected' : 'not-selected'}
        className='group flex min-w-0 cursor-pointer items-center rounded-lg py-0.5 pl-3 pr-2 transition-colors ease-in-out data-[state=selected]:cursor-default data-[state=not-selected]:bg-muted data-[state=not-selected]:hover:bg-muted-md'
      >
        <span
          data-state={selected ? 'selected' : 'not-selected'}
          className='mr-1.5 min-w-0 flex-initial truncate transition-colors ease-in-out data-[state=not-selected]:text-muted-foreground-lg data-[state=selected]:text-muted-foreground data-[state=not-selected]:group-hover:text-muted-foreground-md'
        >
          {drivetrain.name}
        </span>

        <button
          data-state={selected ? 'selected' : 'not-selected'}
          className='cursor-pointer rounded-full p-0.5 transition-colors ease-in-out hover:bg-muted-foreground-lg/30'
          onClick={(e) => {
            e.stopPropagation();
            dispatch(remove(drivetrain.id));
          }}
        >
          <X
            data-state={selected ? 'selected' : 'not-selected'}
            size={14}
            strokeWidth={2.4}
            className='transition-colors ease-in-out data-[state=not-selected]:text-muted-foreground-lg data-[state=selected]:text-muted-foreground data-[state=not-selected]:group-hover:text-muted-foreground-md'
          />
        </button>
      </div>
    </li>
  );
}

function DrivetrainNavBarAddButton() {
  const dispatch = useAppDispatch();
  const { addNew } = drivetrainSlice.actions;
  const { setSelectedDrivetrainId } = useDrivetrainSelectGroupContext();

  return (
    <button
      onClick={() => {
        const id = uuidv4();

        dispatch(addNew({ id }));

        setSelectedDrivetrainId(id);
      }}
      className='group flex cursor-pointer items-center justify-center rounded-lg p-1.5 transition-colors ease-in-out hover:bg-muted active:bg-muted-md'
    >
      <Plus
        size={16}
        strokeWidth={2.4}
        className='text-muted-foreground-lg transition-colors ease-in-out group-hover:text-muted-foreground-md group-active:text-muted-foreground'
      />
    </button>
  );
}

export default DrivetrainNavBar;
