import { Drivetrain } from '@/types/Drivetrain';
import { RIDING_STYLES, RidingStyle } from '@/types/RidingStyle';
import { WHEEL_SIZES, WheelSize } from '@/types/WheelSize';

export function parseDrivetrain(
  drivetrainString: string,
): { success: true; data: Omit<Drivetrain, 'id' | 'name' | 'color'> } | { success: false } {
  const ridingStylePattern = RIDING_STYLES.map((str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  const wheelSizePattern = WHEEL_SIZES.map((str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  const cranksetPattern = '\\d{1,2}((?:-\\d{1,2}){0,2})';
  const cassettePattern = '\\d{1,2}((?:-\\d{1,2}){0,14})';

  const drivetrainRegex = new RegExp(
    `(${ridingStylePattern})x(${wheelSizePattern})x(${cranksetPattern})x(${cassettePattern})`,
  );

  if (drivetrainRegex.test(drivetrainString)) {
    console.log(drivetrainString);

    const [ridingStyleString, wheelSizeString, cranksetString, cassetteString] = drivetrainString.split('x');

    const ridingStyle = ridingStyleString as RidingStyle;
    const wheelSize = wheelSizeString as WheelSize;

    const crankset = [...new Set(cranksetString.split('-').map((c) => parseInt(c)))].filter((c) => c !== 0);
    const cassette = [...new Set(cassetteString.split('-').map((c) => parseInt(c)))].filter((c) => c !== 0);

    return { success: true, data: { ridingStyle, wheelSize, crankset, cassette } };
  }

  return { success: false };
}
