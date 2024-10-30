import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SettingsSlice = {
  cadence: {
    min: number[];
    max: number[];
  };
};

const initialState: SettingsSlice = {
  cadence: {
    min: [60],
    max: [100],
  },
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setMinCadence({ cadence }, action: PayloadAction<number[]>) {
      cadence.min = action.payload;
    },
    setMaxCadence({ cadence }, action: PayloadAction<number[]>) {
      cadence.max = action.payload;
    },
  },
});

export const settingsReducer = settingsSlice.reducer;
