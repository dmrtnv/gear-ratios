import { COLORS } from '@/types/Color';
import { Drivetrain } from '@/types/Drivetrain';
import { RidingStyle } from '@/types/RidingStyle';
import { WheelSize } from '@/types/WheelSize';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

type DrivetrainSlice = {
  drivetrains: Drivetrain[];
  options: {
    linkRidingStyle: boolean;
    linkWheelSize: boolean;
  };
};

const initialState: DrivetrainSlice = {
  drivetrains: [],
  options: {
    linkRidingStyle: false,
    linkWheelSize: false,
  },
};

export const drivetrainSlice = createSlice({
  name: 'drivetrain',
  initialState,
  reducers: {
    set({ drivetrains }, action: PayloadAction<{ crankset: number[]; cassette: number[] }[]>) {
      drivetrains.splice(0, drivetrains.length);

      action.payload.forEach((d, i) => {
        drivetrains.push({
          ...d,
          id: uuidv4(),
          name: 'Drivetrain ' + (i + 1),
          ridingStyle: 'road',
          wheelSize: '28',
          color: COLORS[i],
        });
      });
    },
    reset({ drivetrains }) {
      drivetrains.splice(0, drivetrains.length);

      drivetrains.push({
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
      const { drivetrains, options } = state;
      let ridingStyle: RidingStyle = 'road';
      let wheelSize: WheelSize = '28';

      if (options.linkRidingStyle && drivetrains.length > 0) {
        ridingStyle = drivetrains[0].ridingStyle;
      }

      if (options.linkWheelSize && drivetrains.length > 0) {
        wheelSize = drivetrains[0].wheelSize;
      }

      drivetrains.push({
        id: uuidv4(),
        name: `Drivetrain ${drivetrains.length + 1}`,
        ridingStyle,
        wheelSize,
        color: COLORS[drivetrains.length],
        cassette: [],
        crankset: [],
      });
    },
    remove({ drivetrains }, action: PayloadAction<string>) {
      const index = drivetrains.findIndex((d) => d.id === action.payload);
      if (index !== -1) {
        drivetrains.splice(index, 1);

        const defaultNameRegex = /^Drivetrain [1-5]$/;

        for (let i = index; i < drivetrains.length; i++) {
          if (defaultNameRegex.test(drivetrains[i].name)) {
            drivetrains[i].name = `Drivetrain ${i + 1}`;
          }
        }

        // drivetrains.forEach((d, i) => {
        //   d.name = `Drivetrain ${i + 1}`;
        // });
      }
    },
    update({ drivetrains }, action: PayloadAction<Drivetrain>) {
      const { id } = action.payload;
      const existingDrivetrain = drivetrains.find((d) => d.id === id);

      if (existingDrivetrain) {
        Object.assign(existingDrivetrain, action.payload);
      }
    },
    updateRidingStyle(state, action: PayloadAction<Drivetrain>) {
      const linkRidingStyle = state.options.linkRidingStyle;

      state.drivetrains.forEach((d) => {
        if (linkRidingStyle || d.id === action.payload.id) {
          d.ridingStyle = action.payload.ridingStyle;
        }
      });
    },
    updateWheelSize(state, action: PayloadAction<Drivetrain>) {
      const linkWheelSize = state.options.linkWheelSize;

      state.drivetrains.forEach((d) => {
        if (linkWheelSize || d.id === action.payload.id) {
          d.wheelSize = action.payload.wheelSize;
        }
      });
    },
    toggleLinkRidingStyle({ drivetrains, options }, action: PayloadAction<Drivetrain['id']>) {
      options.linkRidingStyle = !options.linkRidingStyle;

      if (!options.linkRidingStyle) return;

      const ridingStyle = drivetrains.find((d) => d.id === action.payload)?.ridingStyle;

      if (!ridingStyle) return;

      drivetrains.forEach((d) => {
        d.ridingStyle = ridingStyle;
      });
    },
    toggleLinkWheelSize({ drivetrains, options }, action: PayloadAction<Drivetrain['id']>) {
      options.linkWheelSize = !options.linkWheelSize;

      if (!options.linkWheelSize) return;

      const wheelSize = drivetrains.find((d) => d.id === action.payload)?.wheelSize;

      if (!wheelSize) return;

      drivetrains.forEach((d) => {
        d.wheelSize = wheelSize;
      });
    },
  },
});

export const drivetrainReducer = drivetrainSlice.reducer;
