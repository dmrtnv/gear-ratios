import { useAppDispatch } from '@/hooks/redux';
import { cn } from '@/lib/utils';
import { drivetrainSlice } from '@/store/features/drivetrain/drivetrainSlice';
import { Plus } from 'lucide-react';

function AddNewDrivetrainButton({ className = '' }: { className?: string }) {
  const dispatch = useAppDispatch();
  const { addNew } = drivetrainSlice.actions;

  return (
    <button
      onClick={() => dispatch(addNew())}
      className={cn(
        'group flex aspect-square cursor-pointer items-center justify-center rounded-lg p-2 transition-colors ease-in-out hover:bg-muted active:bg-muted-md',
        className,
      )}
    >
      <Plus
        size={24}
        strokeWidth={2.4}
        className='text-muted-foreground-lg transition-colors ease-in-out group-hover:text-muted-foreground-md group-active:text-muted-foreground'
      />
    </button>
  );
}

export default AddNewDrivetrainButton;
