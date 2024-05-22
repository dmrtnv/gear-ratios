import { COLORS } from '@/types/Color';
import { Drivetrain } from '@/types/Drivetrain';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState: Drivetrain[] = [];

export const drivetrainSlice = createSlice({
  name: 'drivetrain',
  initialState,
  reducers: {
    set(state, action: PayloadAction<{ crankset: number[]; cassette: number[] }[]>) {
      state.splice(0, state.length);

      action.payload.forEach((d, i) => {
        state.push({
          ...d,
          id: uuidv4(),
          name: 'Drivetrain ' + (i + 1),
          ridingStyle: 'road',
          wheelSize: '28',
          color: COLORS[i],
        });
      });
    },
    reset(state) {
      state.splice(0, state.length);

      state.push({
        id: uuidv4(),
        name: 'Drivetrain 1',
        ridingStyle: 'road',
        wheelSize: '28',
        color: COLORS[0],
        crankset: [],
        cassette: [],
      });
    },
    addNew(state) {
      state.push({
        id: uuidv4(),
        name: `Drivetrain ${state.length + 1}`,
        ridingStyle: 'road',
        wheelSize: '28',
        color: COLORS[state.length],
        cassette: [],
        crankset: [],
      });
    },
    remove(state, action: PayloadAction<string>) {
      const index = state.findIndex((d) => d.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);

        state.forEach((d, i) => {
          d.name = `Drivetrain ${i + 1}`;
        });
      }
    },
    update(state, action: PayloadAction<Drivetrain>) {
      const { id } = action.payload;
      const existingDrivetrain = state.find((d) => d.id === id);

      if (existingDrivetrain) {
        Object.assign(existingDrivetrain, action.payload);
      }
    },
  },
});

export const drivetrainReducer = drivetrainSlice.reducer;
