import { useDrivetrainSelectGroupContext } from '@/contexts/DrivetrainSelectGroupProvider';
import { useAppSelector } from '@/hooks/redux';
import { cn } from '@/lib/utils';
import DrivetrainInput from './DrivetrainInput';

function DrivetrainView() {
  const drivetrains = useAppSelector((state) => state.drivetrain.drivetrains);
  const { selectedDrivetrainId } = useDrivetrainSelectGroupContext();

  if (!selectedDrivetrainId) return null;

  return (
    <>
      {drivetrains.map((d) => (
        <div
          key={d.id}
          style={{ '--bg-color': d.color.hexValue + '35' } as React.CSSProperties}
          className={cn('flex justify-center bg-[var(--bg-color)]', selectedDrivetrainId !== d.id && 'hidden')}
        >
          <DrivetrainInput drivetrain={d} className='max-w-[min(734px,_100%)] bg-transparent shadow-none' />
        </div>
      ))}
    </>
  );
}

export default DrivetrainView;
