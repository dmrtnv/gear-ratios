import { Drivetrain } from '@/types/Drivetrain';
import {
  getAverageStepAssessmentCriteria,
  getMaxSpeedAssessmentCriteria,
  getMaxStepAssessmentCriteria,
  getMinSpeedAssessmentCriteria,
  getRangeAssessmentCriteria,
} from './assessmentCriteria';

type GetSpeedAssessmentReturnType =
  | {
      speedKPH: number;
      speedMPH: number;
      score: 'poor' | 'mediocre' | 'good';
      cadenceRPM: number;
      key: string;
    }
  | { score: 'not applicable' };

type GetRangeAssessmentReturnType =
  | {
      range: number;
      score: 'poor' | 'mediocre' | 'good';
    }
  | { score: 'not applicable' };

type GetAverageStepAssessmentReturnType =
  | {
      step: number;
      score: 'poor' | 'mediocre' | 'good';
    }
  | { score: 'not applicable' };

type GetMaxStepAssessmentReturnType =
  | {
      key: string;
      step: number;
      score: 'poor' | 'mediocre' | 'good';
    }
  | { score: 'not applicable' };

export function getMaxSpeedAssessment(drivetrain: Drivetrain, cadenceRPM = 100): GetSpeedAssessmentReturnType {
  const { ridingStyle, wheelSize, crankset, cassette } = drivetrain;

  const assessments = getMaxSpeedAssessmentCriteria(ridingStyle);

  // speed = cadence * gearRatio * wheelCircumference
  // gearRatio = front / rear
  // wheelCircumference = Pi * wheelDiameter

  const front = crankset.at(-1);
  const rear = cassette.at(-1);
  const wheelDiameter = Number.parseFloat(wheelSize);

  if (!front || !rear || !wheelDiameter) return { score: 'not applicable' };

  const gearRatio = front / rear;

  const speedInchesPerMinute = cadenceRPM * gearRatio * Math.PI * wheelDiameter;

  const speedMPH = Math.round((speedInchesPerMinute * 60) / 63360);
  const speedKPH = Math.round((speedInchesPerMinute * 60) / 39370.1);

  for (const assessment of assessments.toReversed()) {
    if (speedKPH > assessment.speedKPH) {
      return { speedKPH, speedMPH, score: assessment.score, cadenceRPM, key: `${front}-${rear}` };
    }
  }

  return { speedKPH, speedMPH, score: 'poor', cadenceRPM, key: `${front}-${rear}` };
}

export function getMinSpeedAssessment(drivetrain: Drivetrain, cadenceRPM = 60): GetSpeedAssessmentReturnType {
  const { ridingStyle, wheelSize, crankset, cassette } = drivetrain;

  const assessments = getMinSpeedAssessmentCriteria(ridingStyle);

  // speed = cadence * gearRatio * wheelCircumference
  // gearRatio = front / rear
  // wheelCircumference = Pi * wheelDiameter

  const front = crankset.at(0);
  const rear = cassette.at(0);
  const wheelDiameter = Number.parseFloat(wheelSize);

  if (!front || !rear || !wheelDiameter) return { score: 'not applicable' };

  const gearRatio = front / rear;

  const speedInchesPerMinute = cadenceRPM * gearRatio * Math.PI * wheelDiameter;

  const speedMPH = Math.round((speedInchesPerMinute * 60) / 63360);
  const speedKPH = Math.round((speedInchesPerMinute * 60) / 39370.1);

  for (const assessment of assessments.toReversed()) {
    if (speedKPH < assessment.speedKPH) {
      return { speedKPH, speedMPH, score: assessment.score, cadenceRPM, key: `${front}-${rear}` };
    }
  }

  return { speedKPH, speedMPH, score: 'poor', cadenceRPM, key: `${front}-${rear}` };
}

export function getGearRangeAssessment(drivetrain: Drivetrain): GetRangeAssessmentReturnType {
  const { crankset, cassette, ridingStyle } = drivetrain;

  if (cassette.length === 1 && crankset.length === 1) return { score: 'not applicable' };

  const assessments = getRangeAssessmentCriteria(ridingStyle);

  const highestCrankCog = crankset.at(-1);
  const highestCassetteCog = cassette.at(-1);
  const lowestCrankCog = crankset.at(0);
  const lowestCassetteCog = cassette.at(0);

  if (!highestCrankCog || !highestCassetteCog || !lowestCrankCog || !lowestCassetteCog) {
    return { score: 'not applicable' };
  }

  const range = Math.round(100 * (highestCrankCog / lowestCrankCog) * (lowestCassetteCog / highestCassetteCog));

  for (const assessment of assessments.toReversed()) {
    if (range > assessment.range) {
      return { range, score: assessment.score };
    }
  }

  return { range, score: 'poor' };
}

export function getGearRatios(drivetrain: Drivetrain) {
  const { crankset, cassette, wheelSize } = drivetrain;

  const wheelDiameter = Number.parseFloat(wheelSize);

  // Gear inches =
  // Diameter of drive wheel in inches × (number of teeth in front chainring / number of teeth in rear sprocket).
  // Normally rounded to nearest whole number.

  const gearRatios: { key: string; value: number }[] = [];
  let startLeft = 0;

  for (let i = 0; i < crankset.length - 1 || i === 0; i++) {
    for (let jl = startLeft, jr = cassette.length - 1; jl < cassette.length && jr >= 0; jl++, jr--) {
      if (crankset.length === 1) {
        gearRatios.push({
          key: `${crankset[0]}-${cassette[jl]}`,
          value: Math.round(wheelDiameter * (crankset[0] / cassette[jl])),
        });
        continue;
      }

      const left = {
        key: `${crankset[i]}-${cassette[jl]}`,
        value: Math.round(wheelDiameter * (crankset[i] / cassette[jl])),
      };
      const right = {
        key: `${crankset[i + 1]}-${cassette[jr]}`,
        value: Math.round(wheelDiameter * (crankset[i + 1] / cassette[jr])),
      };

      if (crankset.length === 2) {
        if (left.value < right.value) {
          gearRatios.push(left, right);
        }
        if (left.value === right.value) {
          gearRatios.push(right);
        }
        if (left.value > right.value) {
          const last = gearRatios.at(-1);
          const secondLast = gearRatios.at(-2);

          if (last !== undefined && secondLast !== undefined) {
            const middle = Math.round(last.value + secondLast.value / 2);

            const deltaLeft = Math.abs(middle - left.value);
            const deltaRight = Math.abs(middle - right.value);

            if (deltaLeft < deltaRight) {
              gearRatios.push(left);
            } else {
              gearRatios.push(right);
            }
          }

          break;
        }
      }

      if (crankset.length === 3) {
        if (left.value < right.value) {
          if (i === 0) {
            gearRatios.push(left);
            startLeft = jr;
          } else {
            gearRatios.push(left, right);
          }
        }
        if (left.value === right.value) {
          gearRatios.push(right);
        }
        if (left.value > right.value) {
          const last = gearRatios.at(-1);
          const secondLast = gearRatios.at(-2);

          if (last !== undefined && secondLast !== undefined) {
            const middle = Math.round(last.value + secondLast.value / 2);

            const deltaLeft = Math.abs(middle - left.value);
            const deltaRight = Math.abs(middle - right.value);

            if (deltaLeft < deltaRight) {
              gearRatios.push(left);
            } else {
              gearRatios.push(right);
            }
          }

          break;
        }
      }
    }
  }

  // console.log(gearRatios);

  return gearRatios.toSorted((a, b) => a.value - b.value);
}

export function getGearSteps(drivetrain: Drivetrain) {
  const gearRatios = getGearRatios(drivetrain);

  const gearSteps: { key: string; value: number }[] = [];

  for (let i = 0; i < gearRatios.length - 1; i++) {
    const key = `From ${gearRatios[i].key} to ${gearRatios[i + 1].key}`;
    const value = Math.round((100 * (gearRatios[i + 1].value - gearRatios[i].value)) / gearRatios[i].value);

    gearSteps.push({ key, value });
  }

  return gearSteps;
}

export function getAverageGearStepAssessment(drivetrain: Drivetrain): GetAverageStepAssessmentReturnType {
  const gearSteps = getGearSteps(drivetrain).map((gs) => gs.value);

  if (!gearSteps.length) return { score: 'not applicable' };

  const { ridingStyle } = drivetrain;

  const assessments = getAverageStepAssessmentCriteria(ridingStyle);

  const step = Math.round(gearSteps.reduce((sum, value) => sum + value, 0) / gearSteps.length);

  for (const assessment of assessments.toReversed()) {
    if (step < assessment.step) {
      return { step, score: assessment.score };
    }
  }

  return { step, score: 'poor' };
}

export function getMaxGearStepAssessment(drivetrain: Drivetrain): GetMaxStepAssessmentReturnType {
  const gearSteps = getGearSteps(drivetrain);

  if (!gearSteps.length) return { score: 'not applicable' };

  const { ridingStyle } = drivetrain;

  const assessments = getMaxStepAssessmentCriteria(ridingStyle);

  const maxStep: { key: string; value: number } = gearSteps[0];

  gearSteps.forEach((gs) => {
    if (maxStep.value <= gs.value) {
      Object.assign(maxStep, gs);
    }
  });

  for (const assessment of assessments.toReversed()) {
    if (maxStep.value < assessment.step) {
      return { step: maxStep.value, key: maxStep.key, score: assessment.score };
    }
  }

  return { step: maxStep.value, key: maxStep.key, score: 'poor' };
}
