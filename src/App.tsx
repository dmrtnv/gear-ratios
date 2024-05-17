import { useEffect } from 'react';
import './App.css';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { drivetrainSlice } from './store/features/drivetrain/drivetrainSlice';
import Header from './components/Header';
import DrivetrainInput from './components/DrivetrainInput';
import { Button } from './components/ui/button';
import { Plus } from 'lucide-react';
import Chart from './components/Chart';

function App() {
  const drivetrains = useAppSelector((state) => state.drivetrain);
  const { addNew, set } = drivetrainSlice.actions;
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('drivetrains', drivetrains);

    if (!drivetrains.length) {
      dispatch(
        set([
          {
            cassette: [],
            crankset: [],
          },
        ]),
      );
    }
  }, [drivetrains, dispatch, set]);

  return (
    <div className='flex flex-col items-center gap-8'>
      <Header />

      <div className='flex items-center justify-center gap-2'>
        {drivetrains.length < 5 && <div className='h-14 w-14 shrink'></div>}
        <div className='flex flex-wrap gap-2'>
          {drivetrains.map((drivetrain) => (
            <DrivetrainInput key={drivetrain.id} drivetrain={drivetrain} />
          ))}
        </div>
        {drivetrains.length < 5 && (
          <Button size={'icon-lg'} variant={'ghost'} onClick={() => dispatch(addNew())}>
            <Plus strokeWidth={1.7} size={32} />
          </Button>
        )}
      </div>

      <Chart drivetrains={drivetrains.filter((d) => d.cassette.length && d.crankset.length)} />
    </div>
  );
}

export default App;
