import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Chart from './components/Chart';
import DrivetrainInput from './components/DrivetrainInput';
import Header from './components/Header';
import { Button } from './components/ui/button';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { parseDrivetrain } from './lib/parseDrivetrain';
import { drivetrainSlice } from './store/features/drivetrain/drivetrainSlice';
import { Drivetrain } from './types/Drivetrain';

function App() {
  const [searchParams, setSearchParams] = useSearchParams();

  const drivetrains = useAppSelector((state) => state.drivetrain.drivetrains);
  const { addNew, set, reset } = drivetrainSlice.actions;
  const dispatch = useAppDispatch();

  const [initialRender, setInitiaRender] = useState(true);

  useEffect(() => {
    setInitiaRender(false);

    const drivetrainStrings = searchParams.getAll('d');

    if (!drivetrainStrings.length) {
      dispatch(reset());
      return;
    }

    const newDrivetrains: Omit<Drivetrain, 'id' | 'name' | 'color'>[] = [];

    drivetrainStrings.forEach((d) => {
      const parsedDrivetrain = parseDrivetrain(d);

      if (!parsedDrivetrain.success) return;

      newDrivetrains.push(parsedDrivetrain.data);
    });

    if (newDrivetrains.length) {
      dispatch(set(newDrivetrains));
    } else {
      dispatch(reset());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // console.log('drivetrains', drivetrains);

    if (initialRender) return;

    if (!drivetrains.length) {
      dispatch(reset());
    }
  }, [drivetrains, dispatch, reset, initialRender]);

  useEffect(() => {
    const searchParamsString: [string, string][] = [];

    drivetrains.forEach((d) => {
      if (d.cassette.length && d.crankset.length) {
        searchParamsString.push([
          'd',
          `${d.ridingStyle}x${d.wheelSize}x${d.crankset.join('-')}x${d.cassette.join('-')}`,
        ]);
      }
    });

    setSearchParams(searchParamsString);
  }, [drivetrains, setSearchParams]);

  return (
    <div className='flex w-full flex-col items-center gap-8 p-2'>
      <Header />

      <section className='flex w-full flex-col items-center gap-2 md:w-fit md:flex-row md:flex-wrap md:items-stretch md:justify-center'>
        <>
          {drivetrains.map((drivetrain) => (
            <DrivetrainInput key={drivetrain.id} drivetrain={drivetrain} />
          ))}
        </>
        {drivetrains.length < 5 && (
          <div className='flex items-center justify-center'>
            <Button size={'icon-lg'} variant={'ghost'} onClick={() => dispatch(addNew())}>
              <Plus strokeWidth={1.7} size={32} />
            </Button>
          </div>
        )}
      </section>

      <section className='hidden w-full md:block'>
        <Chart drivetrains={drivetrains.filter((d) => d.cassette.length && d.crankset.length)} />
      </section>
      <section className='block w-full md:hidden'>
        <Chart vertical drivetrains={drivetrains.filter((d) => d.cassette.length && d.crankset.length)} />
      </section>
    </div>
  );
}

export default App;
