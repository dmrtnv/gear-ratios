import { Plus, X } from 'lucide-react';
import DrivetrainInput from './DrivetrainInput';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { Drivetrain } from '@/types/Drivetrain';
import { useEffect, useState } from 'react';
import { drivetrainSlice } from '@/store/features/drivetrain/drivetrainSlice';
import { cn } from '@/lib/utils';

function DrivetrainSelectGroup() {
  const drivetrains = useAppSelector((state) => state.drivetrain.drivetrains);
  const [selectedDrivetrain, setSelectedDrivetrain] = useState<Drivetrain | null>(null);

  useEffect(() => {
    if (selectedDrivetrain || !drivetrains.length) return;

    setSelectedDrivetrain(drivetrains[0]);
  }, [drivetrains]);

  if (!selectedDrivetrain) return;

  return (
    <section className='w-full font-medium'>
      <DrivetrainNavBar
        drivetrains={drivetrains}
        selectedDrivetrain={selectedDrivetrain}
        setSelectedDrivetrain={setSelectedDrivetrain}
      />

      <DrivetrainView selectedDrivetrainId={selectedDrivetrain.id} />
    </section>
  );
}

type DrivetrainNavBarProps = {
  drivetrains: Drivetrain[];
  selectedDrivetrain: Drivetrain;
  setSelectedDrivetrain: (newDrivetrain: Drivetrain) => void;
};

function DrivetrainNavBar({ drivetrains, selectedDrivetrain, setSelectedDrivetrain }: DrivetrainNavBarProps) {
  return (
    <ul className='flex w-full gap-2 px-2'>
      {drivetrains.map((drivetrain) => (
        <DrivetrainNavBarItem
          drivetrain={drivetrain}
          selected={drivetrain.id === selectedDrivetrain.id}
          setSelected={setSelectedDrivetrain}
        />
      ))}

      <DrivetrainNavBarAddButton setSelectedDrivetrain={setSelectedDrivetrain} />
    </ul>
  );
}

type DrivetrainNavBarItemProps = {
  drivetrain: Drivetrain;
  selected?: boolean;
  setSelected: (newDrivetrain: Drivetrain) => void;
};

function DrivetrainNavBarItem({ drivetrain, setSelected, selected = false }: DrivetrainNavBarItemProps) {
  const dispatch = useAppDispatch();
  const { remove } = drivetrainSlice.actions;

  return (
    <li
      style={{ '--bg-color': drivetrain.color.hexValue + '55' } as React.CSSProperties}
      data-state={selected ? 'selected' : 'not-selected'}
      className='rounded-t-xl py-1 transition-colors ease-in-out data-[state=selected]:bg-[var(--bg-color)]'
    >
      <div
        onClick={() => {
          if (selected) return;

          setSelected(drivetrain);
        }}
        data-state={selected ? 'selected' : 'not-selected'}
        className='group flex cursor-pointer items-center rounded-lg py-0.5 pl-3 pr-2 transition-colors ease-in-out data-[state=selected]:cursor-default data-[state=not-selected]:bg-muted data-[state=not-selected]:hover:bg-muted-md'
      >
        <span
          data-state={selected ? 'selected' : 'not-selected'}
          className='mr-1.5 transition-colors ease-in-out data-[state=not-selected]:text-muted-foreground-lg data-[state=selected]:text-muted-foreground data-[state=not-selected]:group-hover:text-muted-foreground-md'
        >
          {drivetrain.name}
        </span>

        <button
          data-state={selected ? 'selected' : 'not-selected'}
          className='cursor-pointer rounded-full p-0.5 transition-colors ease-in-out hover:bg-muted-foreground-lg/30'
          onClick={() => dispatch(remove(drivetrain.id))}
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

type DrivetrainNavBarAddButtonProps = {
  setSelectedDrivetrain: (newDrivetrain: Drivetrain) => void;
};

function DrivetrainNavBarAddButton({ setSelectedDrivetrain }: DrivetrainNavBarAddButtonProps) {
  const drivetrains = useAppSelector((state) => state.drivetrain.drivetrains);
  const dispatch = useAppDispatch();
  const { addNew } = drivetrainSlice.actions;

  return (
    <li className='py-1'>
      <div
        onClick={() => {
          dispatch(addNew());

          const newDrivetrain = drivetrains.at(-1);

          if (newDrivetrain) setSelectedDrivetrain(newDrivetrain);
        }}
        className='group flex aspect-square h-full cursor-pointer items-center justify-center rounded-lg transition-colors ease-in-out hover:bg-muted active:bg-muted-md'
      >
        <Plus
          size={16}
          strokeWidth={2.4}
          className='text-muted-foreground-lg transition-colors ease-in-out group-hover:text-muted-foreground-md group-active:text-muted-foreground'
        />
      </div>
    </li>
  );
}

type DrivetrainViewProps = {
  selectedDrivetrainId: string;
};

function DrivetrainView({ selectedDrivetrainId }: DrivetrainViewProps) {
  const drivetrains = useAppSelector((state) => state.drivetrain.drivetrains);

  return (
    <>
      {drivetrains.map((d) => (
        <div
          style={{ '--bg-color': d.color.hexValue + '55' } as React.CSSProperties}
          className={cn('flex justify-center bg-[var(--bg-color)]', selectedDrivetrainId !== d.id && 'hidden')}
        >
          <DrivetrainInput drivetrain={d} className='max-w-[min(734px,_100%)] bg-transparent shadow-none' />
        </div>
      ))}
    </>
  );
}

export default DrivetrainSelectGroup;
