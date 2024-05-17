import { configureStore } from '@reduxjs/toolkit';
import { drivetrainReducer } from './features/drivetrain/drivetrainSlice';

export const store = configureStore({
  reducer: {
    drivetrain: drivetrainReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
