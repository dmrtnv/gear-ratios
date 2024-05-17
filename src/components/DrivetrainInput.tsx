import { Drivetrain } from '@/types/Drivetrain';
import { Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import CogsInput from './CogsInput';
import ColorSelect from './ColorSelect';
import RidingStyleSelect from './RidingStyleSelect';
import WheelSizeSelect from './WheelSizeSelect';
import { Button } from './ui/button';
import { useAppDispatch } from '@/hooks/redux';
import { drivetrainSlice } from '@/store/features/drivetrain/drivetrainSlice';

function DrivetrainInput({ drivetrain }: { drivetrain: Drivetrain }) {
  const dispatch = useAppDispatch();
  const { remove, update } = drivetrainSlice.actions;

  const [inputDrivetrain, setInputDrivetrain] = useState(() => ({
    crankset: drivetrain.crankset,
    cassette: drivetrain.cassette,
  }));

  const isSync = () => {
    return (
      JSON.stringify(inputDrivetrain.crankset) === JSON.stringify(drivetrain.crankset) &&
      JSON.stringify(inputDrivetrain.cassette) === JSON.stringify(drivetrain.cassette)
    );
  };

  useEffect(() => {
    // console.log('inputDrivetrain', inputDrivetrain);
  }, [inputDrivetrain]);

  return (
    <div className='flex w-full flex-1 flex-col justify-between gap-6 border-2 p-4'>
      <div className='space-y-6'>
        <h2 className='min-w-fit text-2xl font-bold'>{drivetrain.name}</h2>

        <RidingStyleSelect
          ridingStyle={drivetrain.ridingStyle}
          setRidingStyle={(newRidingStyle) => dispatch(update({ ...drivetrain, ridingStyle: newRidingStyle }))}
        />

        <WheelSizeSelect
          wheelSize={drivetrain.wheelSize}
          setWheelSize={(newWheelSize) => dispatch(update({ ...drivetrain, wheelSize: newWheelSize }))}
        />

        <ColorSelect
          color={drivetrain.color}
          setColor={(newColor) => dispatch(update({ ...drivetrain, color: newColor }))}
        />

        <div className=''>
          <h3 className='mb-2 text-xl font-bold'>Crankset</h3>
          <CogsInput
            globalCogs={inputDrivetrain.crankset}
            setGlobalCogs={(newCogs) => setInputDrivetrain({ ...inputDrivetrain, crankset: newCogs })}
            maxLength={3}
          />
        </div>

        <div className=''>
          <h3 className='mb-2 text-xl font-bold'>Cassette</h3>
          <CogsInput
            globalCogs={inputDrivetrain.cassette}
            setGlobalCogs={(newCogs) => setInputDrivetrain({ ...inputDrivetrain, cassette: newCogs })}
            orderBy='desc'
          />
        </div>
      </div>
      <div className='flex items-center justify-between gap-2'>
        <Button size={'icon'} variant={'destructiveIcon'} onClick={() => dispatch(remove(drivetrain.id))}>
          <Trash2 size={24} strokeWidth={1.7} />
        </Button>
        <Button
          variant={'outline'}
          disabled={isSync() || !inputDrivetrain.cassette.length || !inputDrivetrain.crankset.length}
          onClick={() =>
            dispatch(update({ ...drivetrain, cassette: inputDrivetrain.cassette, crankset: inputDrivetrain.crankset }))
          }
        >
          Submit Drivetrain
        </Button>
      </div>
    </div>
  );
}

export default DrivetrainInput;
