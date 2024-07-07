import { DrivetrainSelectGroupProvider } from '@/contexts/DrivetrainSelectGroupProvider';
import DrivetrainNavBar from './DrivetrainNavBar';
import DrivetrainView from './DrivetrainView';

function DrivetrainSelectGroup() {
  return (
    <DrivetrainSelectGroupProvider>
      <section className='w-full overflow-hidden font-medium'>
        <DrivetrainNavBar />

        <DrivetrainView />
      </section>
    </DrivetrainSelectGroupProvider>
  );
}

export default DrivetrainSelectGroup;
