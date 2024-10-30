import Chart from '@/components/Chart';
import DrivetrainStack from '@/components/drivetrain-stack/DrivetrainStack';
import DrivetrainSelectGroup from '@/components/DrivetrainSelectGroup';
import { useLayout } from '@/contexts/LayoutProvider';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { parseDrivetrain } from '@/lib/parseDrivetrain';
import { drivetrainSlice } from '@/store/features/drivetrain/drivetrainSlice';
import { Drivetrain } from '@/types/Drivetrain';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const drivetrains = useAppSelector((state) => state.drivetrain.drivetrains);
  const { set, reset } = drivetrainSlice.actions;
  const dispatch = useAppDispatch();

  const [initialRender, setInitiaRender] = useState(true);

  const { layout } = useLayout();

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
    <div className='flex w-full flex-col items-center gap-8'>
      {layout === 'columns' && <DrivetrainStack />}
      {layout === 'tabs' && <DrivetrainSelectGroup />}

      <section className='hidden w-full md:block'>
        <Chart drivetrains={drivetrains.filter((d) => d.cassette.length && d.crankset.length)} />
      </section>

      <section className='block w-full md:hidden'>
        <Chart vertical drivetrains={drivetrains.filter((d) => d.cassette.length && d.crankset.length)} />
      </section>
    </div>
  );
}

export default HomePage;
