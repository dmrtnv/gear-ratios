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
import { Check, Frown, Meh, Pencil, Plus, Smile, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
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
    <div
      style={{ '--bg-color': drivetrain.color.hexValue + '25' } as React.CSSProperties}
      className='flex w-full flex-1 flex-col justify-between gap-6 rounded-2xl bg-[var(--bg-color)] p-4 shadow-sm transition-colors duration-300 md:w-fit'
    >
      <div className='flex flex-1 flex-col space-y-6'>
        <DrivetrainInputHeader
          name={drivetrain.name}
          setName={(name: string) => {
            dispatch(update({ ...drivetrain, name }));
          }}
        />

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
        <Button
          className='bg-background/60 text-foreground shadow-sm hover:bg-background/85 active:bg-background'
          onClick={() => dispatch(remove(drivetrain.id))}
        >
          <Trash2 size={18} className='mr-2' strokeWidth={1.7} />
          Delete
        </Button>
        <Button
          className='bg-background/60 text-foreground shadow-sm hover:bg-background/85 active:bg-background'
          disabled={isSync() || !inputDrivetrain.cassette.length || !inputDrivetrain.crankset.length}
          onClick={() =>
            dispatch(update({ ...drivetrain, cassette: inputDrivetrain.cassette, crankset: inputDrivetrain.crankset }))
          }
        >
          <Plus size={20} className='mr-2' strokeWidth={1.7} />
          Add drivetrain
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

function DrivetrainInputHeader({ name, setName }: { name: string; setName: (arg0: string) => void }) {
  const [isEditModeEnabled, setIsEditModeEnabled] = useState(false);
  const [inputValue, setInputValue] = useState(name);
  const [inputId, setInputId] = useState('');

  useEffect(() => {
    setInputValue(name);
  }, [name]);

  useEffect(() => {
    setInputId(crypto.randomUUID());
  }, []);

  return (
    <div className='group relative flex w-full justify-center rounded-lg p-3 transition-all duration-300 focus-within:bg-background/85 focus-within:shadow-sm hover:bg-background/60 hover:shadow-sm hover:focus-within:bg-background/85'>
      {isEditModeEnabled ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();

            if (inputValue) setName(inputValue);
            if (!inputValue) setInputValue(name);

            setIsEditModeEnabled(false);
          }}
        >
          <input
            id={inputId}
            type='text'
            autoFocus
            maxLength={20}
            value={inputValue}
            onFocus={(e) => e.target.setSelectionRange(0, -1)}
            onKeyDown={(e) => e.key === 'Escape' && (e.target as HTMLInputElement).blur()}
            onBlur={(e) => {
              if (e.relatedTarget?.id === 'submit-' + inputId) return;

              setIsEditModeEnabled(false);
              setInputValue(name);
            }}
            onChange={(e) => setInputValue(e.target.value)}
            className='flex max-w-80 bg-transparent text-center text-3xl font-bold outline-none selection:bg-yellow-300'
          />

          <button
            id={'submit-' + inputId}
            type='submit'
            className='absolute right-3 top-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 group-focus-within:opacity-100 group-hover:opacity-100'
          >
            <Check size={18} />
          </button>
        </form>
      ) : (
        <>
          <h2 className='text-center text-3xl font-bold'>{name}</h2>
          <button
            onClick={() => setIsEditModeEnabled(true)}
            className='absolute right-3 top-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 group-focus-within:opacity-100 group-hover:opacity-100'
          >
            <Pencil size={18} />
          </button>
        </>
      )}
    </div>
  );
}

export default DrivetrainInput;
