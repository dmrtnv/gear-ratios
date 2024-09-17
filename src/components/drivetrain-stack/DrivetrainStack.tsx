import { useAppSelector } from '@/hooks/redux';
import DrivetrainInput from '../DrivetrainInput';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import AddNewDrivetrainButton from './AddNewDrivetrainButton';
import LayoutToggle from '../LayoutToggle';
import { useLayout } from '@/contexts/LayoutProvider';
import { cn } from '@/lib/utils';

const DEFAULT_MAX_LENGTH = 5;

function DrivetrainStack({ maxLength = DEFAULT_MAX_LENGTH }: { maxLength?: number }) {
  const drivetrains = useAppSelector((state) => state.drivetrain.drivetrains);

  const { isMobile } = useLayout();

  return (
    <section className='relative flex w-full flex-col items-center overflow-hidden px-2 md:block md:w-auto'>
      <ScrollArea type='auto' className='w-full pb-3 md:mx-12'>
        <div className='flex flex-col gap-1 overflow-hidden rounded-xl md:flex-row'>
          {drivetrains.map((d) => (
            <DrivetrainInput key={d.id} drivetrain={d} className='flex-initial rounded-md' />
          ))}
        </div>

        <ScrollBar orientation='horizontal' />
      </ScrollArea>

      {!isMobile && <LayoutToggle className='absolute right-1 top-0' />}

      {drivetrains.length < maxLength && (
        <AddNewDrivetrainButton className={cn(!isMobile && 'absolute right-1 top-[calc(50%-12px)]')} />
      )}
    </section>
  );
}

export default DrivetrainStack;
