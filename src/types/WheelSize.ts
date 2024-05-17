export const WHEEL_SIZES = ['26', '27.5', '28', '29'] as const;
export type WheelSize = (typeof WHEEL_SIZES)[number];
