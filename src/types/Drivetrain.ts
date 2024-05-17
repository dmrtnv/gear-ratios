import { Color } from './Color';
import { RidingStyle } from './RidingStyle';
import { WheelSize } from './WheelSize';

export type Drivetrain = {
  id: string;
  name: string;
  ridingStyle: RidingStyle;
  wheelSize: WheelSize;
  color: Color;
  crankset: number[];
  cassette: number[];
};
