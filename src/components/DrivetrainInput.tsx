import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
  getAverageGearStepAssessment,
  getGearRangeAssessment,
  getMaxGearStepAssessment,
  getMaxSpeedAssessment,
  getMinSpeedAssessment,
} from '@/lib/describeDrivetrain';
import { drivetrainSlice } from '@/store/features/drivetrain/drivetrainSlice';
import { Drivetrain } from '@/types/Drivetrain';
import { Check, Frown, Meh, Pencil, Plus, Slash, Smile, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import CogsInput from './CogsInput';
import ColorSelect from './ColorSelect';
import RidingStyleSelect from './RidingStyleSelect';
import WheelSizeSelect from './WheelSizeSelect';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { cn } from '@/lib/utils';

function DrivetrainInput({
  drivetrain,
  className = '',
}: {
  drivetrain: Drivetrain;
  className?: React.HTMLProps<HTMLElement>['className'];
}) {
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

  const isFilled = () => !!drivetrain.cassette.length && !!drivetrain.crankset.length;

  useEffect(() => {
    // console.log('inputDrivetrain', inputDrivetrain);
  }, [inputDrivetrain]);

  return (
    <div
      style={{ '--bg-color': drivetrain.color.hexValue + '35' } as React.CSSProperties}
      className={cn(
        'flex w-full flex-1 flex-col justify-between gap-6 rounded-2xl bg-[var(--bg-color)] p-4 shadow-sm transition-colors duration-300 md:w-fit',
        className,
      )}
    >
      <div className='flex flex-1 flex-col space-y-6'>
        <DrivetrainInputHeader
          drivetrain={drivetrain}
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
          <Trash2 size={18} className='mr-2' strokeWidth={1.75} />
          Delete
        </Button>
        <Button
          className='bg-background/60 text-foreground shadow-sm hover:bg-background/85 active:bg-background'
          disabled={isSync() || !inputDrivetrain.cassette.length || !inputDrivetrain.crankset.length}
          onClick={() =>
            dispatch(update({ ...drivetrain, cassette: inputDrivetrain.cassette, crankset: inputDrivetrain.crankset }))
          }
        >
          <Plus size={20} className='mr-2' strokeWidth={1.75} />
          {isFilled() ? 'Update' : 'Add drivetrain'}
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
  const { cadence } = useAppSelector((state) => state.settings);

  const maxSpeed = getMaxSpeedAssessment(drivetrain, cadence.max[0]);
  const minSpeed = getMinSpeedAssessment(drivetrain, cadence.min[0]);
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
                <div className='flex items-center justify-between gap-4'>
                  <span className='font-semibold'>{maxSpeed.speedKPH + ' kph'}</span>
                  <div className='flex items-center justify-center gap-1'>
                    <Slash size={16} className='-rotate-12' />
                    <span className=''>{`Gears ${maxSpeed.key} at ${maxSpeed.cadenceRPM} rpm`}</span>
                    <Slash size={16} className='-rotate-12' />
                  </div>
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
                <div className='flex items-center justify-between gap-4'>
                  <span className='font-semibold'>{minSpeed.speedKPH + ' kph'}</span>
                  <div className='flex items-center justify-center gap-1'>
                    <Slash size={16} className='-rotate-12' />
                    <span className=''>{`Gears ${minSpeed.key} at ${minSpeed.cadenceRPM} rpm`}</span>
                    <Slash size={16} className='-rotate-12' />
                  </div>
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
                <div className='flex items-center justify-between gap-4'>
                  <span className='font-semibold'>{maxStep.step + '%'}</span>
                  <div className='flex items-center justify-center gap-1'>
                    <Slash size={16} className='-rotate-12' />
                    <span className=''>{`${maxStep.key}`}</span>
                    <Slash size={16} className='-rotate-12' />
                  </div>
                </div>
              </div>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
}

function DrivetrainInputHeader({ drivetrain, setName }: { drivetrain: Drivetrain; setName: (arg0: string) => void }) {
  const [isEditModeEnabled, setIsEditModeEnabled] = useState(false);
  const [inputValue, setInputValue] = useState(drivetrain.name);
  const [inputId, setInputId] = useState('');

  useEffect(() => {
    setInputValue(drivetrain.name);
  }, [drivetrain.name]);

  useEffect(() => {
    setInputId(crypto.randomUUID());
  }, []);

  return (
    <div
      style={
        {
          '--bg-color-hover': drivetrain.color.hexValue + '30',
          '--bg-color-focus': drivetrain.color.hexValue + '40',
        } as React.CSSProperties
      }
      className='group relative flex w-full justify-center rounded-lg p-3 transition-all duration-300 focus-within:bg-[var(--bg-color-focus)] focus-within:shadow-sm hover:bg-[var(--bg-color-hover)] hover:shadow-sm hover:focus-within:bg-[var(--bg-color-focus)]'
    >
      {isEditModeEnabled ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();

            if (inputValue) setName(inputValue);
            if (!inputValue) setInputValue(drivetrain.name);

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
              setInputValue(drivetrain.name);
            }}
            onChange={(e) => setInputValue(e.target.value)}
            className='flex max-w-80 bg-transparent text-center text-3xl font-bold outline-none'
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
          <h2 className='text-center text-3xl font-bold'>{drivetrain.name}</h2>
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
