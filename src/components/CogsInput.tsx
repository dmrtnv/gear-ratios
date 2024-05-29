import { parseCogs } from '@/lib/parseCogs';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';

type CogsInputProps = {
  globalCogs: number[];
  setGlobalCogs: (newCogs: number[]) => void;
  maxLength?: number;
  orderBy?: 'asc' | 'desc';
};

function CogsInput({ globalCogs, setGlobalCogs, maxLength = 15, orderBy = 'asc' }: CogsInputProps) {
  const [cogs, setCogs] = useState<string[]>(() => [
    ...globalCogs.map((c) => c + ''),
    ...Array(maxLength - globalCogs.length).fill(''),
  ]);
  const [numberOfFilledCogs, setNumberOfFilledCogs] = useState(() => globalCogs.length);
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(maxLength).fill(null));
  const [focusedInputs, setFocusedInputs] = useState<string[]>([]);

  useEffect(() => {
    // console.log('cogs', cogs);
  }, [cogs]);

  useEffect(() => {
    const hasGaps = cogs.findIndex((c, i, arr) => i < arr.length - 1 && c === '' && arr[i + 1]) !== -1;
    const hasZeros = cogs.findIndex((c) => parseInt(c) === 0) !== -1;
    const hasDuplicates = cogs
      .slice(0, numberOfFilledCogs)
      .some((c, i, arr) => i < arr.length - 1 && arr.indexOf(c, i + 1) !== -1);
    const isSorted = cogs.slice(0, numberOfFilledCogs).every((c, i, arr) => {
      if (i < arr.length - 1) return orderBy === 'asc' ? c < arr[i + 1] : c > arr[i + 1];
      return true;
    });

    if (numberOfFilledCogs && !hasGaps && !hasZeros && !hasDuplicates && isSorted) {
      setGlobalCogs(cogs.filter((c) => !!c).map((c) => parseInt(c)));
    }
  }, [cogs, numberOfFilledCogs, orderBy]);

  useEffect(() => {
    let length = 0;

    for (let i = cogs.length - 1; i >= 0; i--) {
      if (cogs[i]) {
        length = i + 1;
        break;
      }
    }
    setNumberOfFilledCogs(length);
  }, [cogs]);

  useEffect(() => {
    // remove duplicates and zeros, then sort if neither slot is focused

    if (!focusedInputs.length) {
      setCogs((prevCogs) => {
        const filteredCogs = [...new Set(prevCogs.slice(0, numberOfFilledCogs))].filter((c) => parseInt(c) !== 0);

        return [
          ...filteredCogs.toSorted((a, b) =>
            orderBy === 'asc' ? parseInt(a) - parseInt(b) : parseInt(b) - parseInt(a),
          ),
          ...Array(maxLength - filteredCogs.length).fill(''),
        ];
      });
    }
  }, [focusedInputs, numberOfFilledCogs, maxLength, orderBy]);

  useEffect(() => {
    // remove gaps if the slot with gap is not focused

    const indexOfGap = cogs.findIndex((c, i, arr) => i < arr.length - 1 && c === '' && arr[i + 1]);

    if (indexOfGap !== -1) {
      if (!focusedInputs.length || !focusedInputs.includes(indexOfGap + ''))
        setCogs((prevCogs) => [...prevCogs.filter((c) => !!c), ...Array(maxLength - numberOfFilledCogs).fill('')]);
    }
  }, [focusedInputs, cogs, numberOfFilledCogs, maxLength]);

  const handleFocus = (e: React.FocusEvent<HTMLDivElement, Element>) => {
    if (e.target.tagName !== 'INPUT') return;

    const target = e.target as HTMLInputElement;
    // console.log(`Focused on ${index}\nCurrent focused element: ${document.activeElement}`);
    setFocusedInputs((prevFocusedInputs) => [...prevFocusedInputs, target.name]);
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement, Element>) => {
    if (e.target.tagName !== 'INPUT') return;

    const target = e.target as HTMLInputElement;
    // console.log(`Blurred ${index}\nCurrent focused element: ${document.activeElement}`);
    setFocusedInputs((prevFocusedInputs) => prevFocusedInputs.filter((fi) => fi !== target.name));
  };

  const insertCogsAt = (newCogs: string[], pos: number) => {
    const newArray = [...cogs.slice(0, pos), ...newCogs.slice(0, maxLength - pos)];

    setCogs([...newArray, ...Array(maxLength - newArray.length).fill('')]);
  };

  return (
    <div onFocus={handleFocus} onBlur={handleBlur} className='flex flex-1 flex-wrap gap-1 sm:min-w-[348px]'>
      {cogs.map((cog, index) => (
        <InputSlot
          key={index}
          cog={cog}
          inputRefs={inputRefs}
          index={index}
          maxLength={maxLength}
          numberOfFilledCogs={numberOfFilledCogs}
          setCog={(newCog: string) => {
            setCogs((prevCogs) => prevCogs.map((c, i) => (i === index ? newCog : c)));
          }}
          insertCogs={(newCogs: string[]) => {
            insertCogsAt(newCogs, index);
          }}
        />
      ))}

      {!!numberOfFilledCogs && (
        <Button onClick={() => setCogs(Array(maxLength).fill(''))} size={'icon'} variant={'ghost'}>
          <X size={26} strokeWidth={1.7} />
        </Button>
      )}
    </div>
  );
}

export default CogsInput;

type InputSlotProps = {
  index: number;
  inputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
  cog: string;
  numberOfFilledCogs: number;
  maxLength: number;
  setCog: (arg0: string) => void;
  insertCogs: (arg0: string[]) => void;
};

function InputSlot({ index, inputRefs, cog, numberOfFilledCogs, maxLength, setCog, insertCogs }: InputSlotProps) {
  const focusOnNext = () => {
    if (index < maxLength - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  const focusOnPrevious = () => {
    if (index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <input
      ref={(element) => {
        inputRefs.current[index] = element;
      }}
      className={cn('hidden h-10 w-10 border-2 text-center font-semibold', index <= numberOfFilledCogs && 'block')}
      type='tel'
      pattern='^\d{0,2}$'
      inputMode='numeric'
      name={index + ''}
      value={cog}
      onPaste={(e) => {
        const pastedValue = e.clipboardData.getData('text/plain');
        const parsedCogs = parseCogs(pastedValue);

        if (!parsedCogs.success) return;

        insertCogs(parsedCogs.data);
      }}
      onDrop={(e) => {
        const pastedValue = e.dataTransfer.getData('text/plain') as string;
        const parsedCogs = parseCogs(pastedValue);

        if (!parsedCogs.success) return;

        insertCogs(parsedCogs.data);
      }}
      onChange={(e) => {
        const value = e.target.value;
        const numberRegex = /^\d{0,2}$/;

        if (value.length <= 2 && numberRegex.test(value)) {
          setCog(value);
        }
        if (value.length === 2) {
          focusOnNext();
        }
      }}
      onKeyDown={(e) => {
        if (e.key === 'Backspace') {
          e.preventDefault();
          if (cog.length > 0) {
            setCog(cog.slice(0, -1));
          }
          if (cog.length === 0) {
            focusOnPrevious();
          }
        } else if (e.key === 'Delete') {
          e.preventDefault();
        } else if (e.key === 'Enter') {
          if (cog.length > 0) {
            focusOnNext();
          }
        } else if (e.key === 'ArrowLeft') {
          const cursorPosition = (e as unknown as React.ChangeEvent<HTMLInputElement>).target.selectionStart;

          if (cursorPosition === 0 && index > 0) {
            e.preventDefault();
            focusOnPrevious();
            inputRefs.current[Math.max(index - 1, 0)]?.setSelectionRange(2, 2);
          }
        } else if (e.key === 'ArrowRight') {
          const cursorPosition = (e as unknown as React.ChangeEvent<HTMLInputElement>).target.selectionStart;

          if (cursorPosition === cog.length && index < maxLength) {
            e.preventDefault();
            focusOnNext();
          }
        } else if (e.key === 'Escape') {
          inputRefs.current[index]?.blur();
        }
      }}
    />
  );
}
