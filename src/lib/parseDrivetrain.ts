export function parseDrivetrain(
  drivetrainString: string
): { success: true; data: { cassette: number[]; crankset: number[] } } | { success: false } {
  const drivetrainRegEx = /^\d{1,2}((?:,\d{1,2}){0,2})x\d{1,2}((?:,\d{1,2}){0,14})$/;

  if (drivetrainRegEx.test(drivetrainString)) {
    const [cranksetString, cassetteString] = drivetrainString.split('x');

    const crankset = [...new Set(JSON.parse(`[${cranksetString}]`) as number[])].filter((c) => c !== 0);
    const cassette = [...new Set(JSON.parse(`[${cassetteString}]`) as number[])].filter((c) => c !== 0);

    return { success: true, data: { crankset, cassette } };
  }

  return { success: false };
}
