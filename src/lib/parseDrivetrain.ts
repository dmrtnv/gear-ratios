export function parseDrivetrain(
  drivetrainString: string,
): { success: true; data: { cassette: number[]; crankset: number[] } } | { success: false } {
  const drivetrainRegEx = /^\d{1,2}((?:-\d{1,2}){0,2})x\d{1,2}((?:-\d{1,2}){0,14})$/;

  if (drivetrainRegEx.test(drivetrainString)) {
    const [cranksetString, cassetteString] = drivetrainString.split('x');

    console.log(drivetrainString);

    const crankset = [...new Set(cranksetString.split('-').map((c) => parseInt(c)))].filter((c) => c !== 0);
    const cassette = [...new Set(cassetteString.split('-').map((c) => parseInt(c)))].filter((c) => c !== 0);

    return { success: true, data: { crankset, cassette } };
  }

  return { success: false };
}
