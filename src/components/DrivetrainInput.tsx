import { useAppDispatch } from '@/hooks/redux';
import {
  getAverageGearStepAssessment,
  getGearRangeAssessment,
  getMaxGearStepAssessment,
  getMaxSpeedAssessment,
  getMinSpeedAssessment,
} from '@/lib/describeDrivetrain';
import { drivetrainSlice } from '@/store/features/drivetrain/drivetrainSlice';
import { Drivetrain } from '@/types/Drivetrain';
import { Frown, Meh, Smile, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import CogsInput from './CogsInput';
import ColorSelect from './ColorSelect';
import RidingStyleSelect from './RidingStyleSelect';
import WheelSizeSelect from './WheelSizeSelect';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

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
    <div className='flex w-full flex-1 flex-col justify-between gap-6 border-2 p-4 md:w-fit'>
      <div className='flex flex-1 flex-col space-y-6'>
        <h2 className='mt-4 min-w-fit text-center text-3xl font-bold'>{drivetrain.name}</h2>

        <Separator />

        <RidingStyleSelect drivetrain={drivetrain} />

        <WheelSizeSelect drivetrain={drivetrain} />

        <ColorSelect
          color={drivetrain.color}
          setColor={(newColor) => dispatch(update({ ...drivetrain, color: newColor }))}
        />

        <div className='flex flex-1 flex-col'>
          <h3 className='mb-2 flex text-xl font-bold'>Crankset</h3>
          <CogsInput
            globalCogs={inputDrivetrain.crankset}
            setGlobalCogs={(newCogs) => setInputDrivetrain({ ...inputDrivetrain, crankset: newCogs })}
            maxLength={3}
          />
        </div>

        <div className='flex flex-1 flex-col'>
          <h3 className='mb-2 flex text-xl font-bold'>Cassette</h3>
          <CogsInput
            globalCogs={inputDrivetrain.cassette}
            setGlobalCogs={(newCogs) => setInputDrivetrain({ ...inputDrivetrain, cassette: newCogs })}
            orderBy='desc'
          />
        </div>
      </div>
      <div className='flex flex-1 items-end justify-between gap-2'>
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
      {!!drivetrain.cassette.length && !!drivetrain.crankset.length && (
        <>
          <Separator />

          <DrivetrainDescription drivetrain={drivetrain} />
        </>
      )}
    </div>
  );
}

function DrivetrainDescription({ drivetrain }: { drivetrain: Drivetrain }) {
  const maxSpeed = getMaxSpeedAssessment(drivetrain);
  const minSpeed = getMinSpeedAssessment(drivetrain);
  const gearRange = getGearRangeAssessment(drivetrain);
  const averageStep = getAverageGearStepAssessment(drivetrain);
  const maxStep = getMaxGearStepAssessment(drivetrain);

  return (
    <div>
      <h3 className='mb-2 text-xl font-bold'>Description</h3>

      <ul className='space-y-1'>
        {maxSpeed.score !== 'not applicable' && (
          <li className='@container'>
            <div className='flex flex-col @[424px]:flex-row'>
              <h4 className='w-1/3 font-semibold'>Max speed:</h4>
              <div className='flex items-center gap-3'>
                {maxSpeed.score === 'poor' && <Frown className='text-red-500' size={18} />}
                {maxSpeed.score === 'mediocre' && <Meh className='text-yellow-500' size={18} />}
                {maxSpeed.score === 'good' && <Smile className='text-green-500' size={18} />}
                <div className='flex items-center justify-between gap-3'>
                  <span className='font-semibold'>{maxSpeed.speedKPH + ' kph'}</span>
                  <span className=''>/ {`Gears ${maxSpeed.key} at ${maxSpeed.cadenceRPM} rpm`} /</span>
                </div>
              </div>
            </div>
          </li>
        )}
        {minSpeed.score !== 'not applicable' && (
          <li className='@container'>
            <div className='flex flex-col @[424px]:flex-row'>
              <h4 className='w-1/3 font-semibold'>Min speed:</h4>
              <div className='flex items-center gap-3'>
                {minSpeed.score === 'poor' && <Frown className='text-red-500' size={18} />}
                {minSpeed.score === 'mediocre' && <Meh className='text-yellow-500' size={18} />}
                {minSpeed.score === 'good' && <Smile className='text-green-500' size={18} />}
                <div className='flex items-center justify-between gap-3'>
                  <span className='font-semibold'>{minSpeed.speedKPH + ' kph'}</span>
                  <span className=''>/ {`Gears ${minSpeed.key} at ${minSpeed.cadenceRPM} rpm`} /</span>
                </div>
              </div>
            </div>
          </li>
        )}
        {gearRange.score !== 'not applicable' && (
          <li className='@container'>
            <div className='flex flex-col @[424px]:flex-row'>
              <h4 className='w-1/3 font-semibold'>Gear range:</h4>
              <div className='flex items-center gap-3'>
                {gearRange.score === 'poor' && <Frown className='text-red-500' size={18} />}
                {gearRange.score === 'mediocre' && <Meh className='text-yellow-500' size={18} />}
                {gearRange.score === 'good' && <Smile className='text-green-500' size={18} />}
                <span className='font-semibold'>{gearRange.range + '%'}</span>
              </div>
            </div>
          </li>
        )}
        {averageStep.score !== 'not applicable' && (
          <li className='@container'>
            <div className='flex flex-col @[424px]:flex-row'>
              <h4 className='w-1/3 font-semibold'>Average step:</h4>
              <div className='flex items-center gap-3'>
                {averageStep.score === 'poor' && <Frown className='text-red-500' size={18} />}
                {averageStep.score === 'mediocre' && <Meh className='text-yellow-500' size={18} />}
                {averageStep.score === 'good' && <Smile className='text-green-500' size={18} />}
                <span className='font-semibold'>{averageStep.step + '%'}</span>
              </div>
            </div>
          </li>
        )}
        {maxStep.score !== 'not applicable' && (
          <li className='@container'>
            <div className='flex flex-col @[424px]:flex-row'>
              <h4 className='w-1/3 font-semibold'>Max step:</h4>
              <div className='flex items-center gap-3'>
                {maxStep.score === 'poor' && <Frown className='text-red-500' size={18} />}
                {maxStep.score === 'mediocre' && <Meh className='text-yellow-500' size={18} />}
                {maxStep.score === 'good' && <Smile className='text-green-500' size={18} />}
                <div className='flex items-center justify-between gap-3'>
                  <span className='font-semibold'>{maxStep.step + '%'}</span>
                  <span className=''>/ {`${maxStep.key}`} /</span>
                </div>
              </div>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
}

export default DrivetrainInput;
