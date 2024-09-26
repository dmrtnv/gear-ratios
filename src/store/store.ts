import { configureStore } from '@reduxjs/toolkit';
import { drivetrainReducer } from './features/drivetrain/drivetrainSlice';
import { settingsReducer } from './features/settings/settingsSlice';

export const store = configureStore({
  reducer: {
    drivetrain: drivetrainReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
