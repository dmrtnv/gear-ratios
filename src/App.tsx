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

function App() {
  const [searchParams, setSearchParams] = useSearchParams();

  const drivetrains = useAppSelector((state) => state.drivetrain);
  const { addNew, set, reset } = drivetrainSlice.actions;
  const dispatch = useAppDispatch();

  const [initialRender, setInitiaRender] = useState(true);

  useEffect(() => {
    const drivetrainStrings = searchParams.getAll('d');

    if (!drivetrainStrings.length) {
      dispatch(reset());
      return;
    }

    const newDrivetrains: { cassette: number[]; crankset: number[] }[] = [];

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

    setInitiaRender(false);
  }, []);

  useEffect(() => {
    if (initialRender) return;

    // console.log('drivetrains', drivetrains);

    if (!drivetrains.length) {
      dispatch(reset());
    }
  }, [drivetrains, dispatch, reset, initialRender]);

  useEffect(() => {
    const searchParamsString: [string, string][] = [];

    drivetrains.forEach((d) => {
      if (d.cassette.length && d.crankset.length) {
        // searchParamsString += `d${i + 1}_crankset=${d.crankset.join(',')}&d${i + 1}_cassette=${d.cassette.join(',')}&`;
        searchParamsString.push(['d', `${d.crankset.join('-')}x${d.cassette.join('-')}`]);
      }
    });

    setSearchParams(searchParamsString);
  }, [drivetrains, setSearchParams]);

  return (
    <div className='flex w-full flex-col items-center gap-8 p-2'>
      <Header />

      <div className='flex w-full flex-col items-center gap-2 md:w-fit md:flex-row md:flex-wrap md:items-stretch md:justify-center'>
        {/* {drivetrains.length < 5 && <div className='hidden h-14 w-14 flex-shrink border sm:flex'></div>} */}
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
      </div>

      <Chart drivetrains={drivetrains.filter((d) => d.cassette.length && d.crankset.length)} />
    </div>
  );
}

export default App;
