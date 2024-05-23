import { RidingStyle } from '@/types/RidingStyle';

type SpeedByRidingStyleAssessment = {
  ridingStyle: RidingStyle;
  results: {
    score: 'poor' | 'mediocre' | 'good';
    speedKPH: number;
  }[];
};

type RangeByRidingStyleAssessment = {
  ridingStyle: RidingStyle;
  results: {
    score: 'poor' | 'mediocre' | 'good';
    range: number;
  }[];
};

type StepByRidingStyleAssessment = {
  ridingStyle: RidingStyle;
  results: {
    score: 'poor' | 'mediocre' | 'good';
    step: number;
  }[];
};

const MAX_SPEED_BY_RIDING_STYLE: SpeedByRidingStyleAssessment[] = [
  {
    ridingStyle: 'road',
    results: [
      { score: 'poor', speedKPH: 50 },
      { score: 'mediocre', speedKPH: 55 },
      { score: 'good', speedKPH: 60 },
    ],
  },
  {
    ridingStyle: 'gravel',
    results: [
      { score: 'poor', speedKPH: 40 },
      { score: 'mediocre', speedKPH: 45 },
      { score: 'good', speedKPH: 50 },
    ],
  },
  {
    ridingStyle: 'mtb',
    results: [
      { score: 'poor', speedKPH: 35 },
      { score: 'mediocre', speedKPH: 40 },
      { score: 'good', speedKPH: 45 },
    ],
  },
];

const MIN_SPEED_BY_RIDING_STYLE: SpeedByRidingStyleAssessment[] = [
  {
    ridingStyle: 'road',
    results: [
      { score: 'poor', speedKPH: 14 },
      { score: 'mediocre', speedKPH: 12 },
      { score: 'good', speedKPH: 10 },
    ],
  },
  {
    ridingStyle: 'gravel',
    results: [
      { score: 'poor', speedKPH: 12 },
      { score: 'mediocre', speedKPH: 10 },
      { score: 'good', speedKPH: 8 },
    ],
  },
  {
    ridingStyle: 'mtb',
    results: [
      { score: 'poor', speedKPH: 10 },
      { score: 'mediocre', speedKPH: 8 },
      { score: 'good', speedKPH: 6 },
    ],
  },
];

const RANGE_BY_RIDING_STYLE: RangeByRidingStyleAssessment[] = [
  {
    ridingStyle: 'road',
    results: [
      { score: 'poor', range: 300 },
      { score: 'mediocre', range: 325 },
      { score: 'good', range: 350 },
    ],
  },
  {
    ridingStyle: 'gravel',
    results: [
      { score: 'poor', range: 350 },
      { score: 'mediocre', range: 375 },
      { score: 'good', range: 400 },
    ],
  },
  {
    ridingStyle: 'mtb',
    results: [
      { score: 'poor', range: 400 },
      { score: 'mediocre', range: 425 },
      { score: 'good', range: 450 },
    ],
  },
];

const AVERAGE_STEP_BY_RIDING_STYLE: StepByRidingStyleAssessment[] = [
  {
    ridingStyle: 'road',
    results: [
      { score: 'poor', step: 15 },
      { score: 'mediocre', step: 13 },
      { score: 'good', step: 11 },
    ],
  },
  {
    ridingStyle: 'gravel',
    results: [
      { score: 'poor', step: 17 },
      { score: 'mediocre', step: 15 },
      { score: 'good', step: 13 },
    ],
  },
  {
    ridingStyle: 'mtb',
    results: [
      { score: 'poor', step: 19 },
      { score: 'mediocre', step: 17 },
      { score: 'good', step: 15 },
    ],
  },
];

const MAX_STEP_BY_RIDING_STYLE: StepByRidingStyleAssessment[] = [
  {
    ridingStyle: 'road',
    results: [
      { score: 'poor', step: 19 },
      { score: 'mediocre', step: 17 },
      { score: 'good', step: 15 },
    ],
  },
  {
    ridingStyle: 'gravel',
    results: [
      { score: 'poor', step: 21 },
      { score: 'mediocre', step: 19 },
      { score: 'good', step: 17 },
    ],
  },
  {
    ridingStyle: 'mtb',
    results: [
      { score: 'poor', step: 23 },
      { score: 'mediocre', step: 21 },
      { score: 'good', step: 19 },
    ],
  },
];

export function getMaxSpeedAssessmentCriteria(ridingStyle: RidingStyle) {
  return (
    MAX_SPEED_BY_RIDING_STYLE.find((category) => category.ridingStyle === ridingStyle) as SpeedByRidingStyleAssessment
  ).results;
}

export function getMinSpeedAssessmentCriteria(ridingStyle: RidingStyle) {
  return (
    MIN_SPEED_BY_RIDING_STYLE.find((category) => category.ridingStyle === ridingStyle) as SpeedByRidingStyleAssessment
  ).results;
}

export function getRangeAssessmentCriteria(ridingStyle: RidingStyle) {
  return (
    RANGE_BY_RIDING_STYLE.find((category) => category.ridingStyle === ridingStyle) as RangeByRidingStyleAssessment
  ).results;
}

export function getAverageStepAssessmentCriteria(ridingStyle: RidingStyle) {
  return (
    AVERAGE_STEP_BY_RIDING_STYLE.find((category) => category.ridingStyle === ridingStyle) as StepByRidingStyleAssessment
  ).results;
}

export function getMaxStepAssessmentCriteria(ridingStyle: RidingStyle) {
  return (
    MAX_STEP_BY_RIDING_STYLE.find((category) => category.ridingStyle === ridingStyle) as StepByRidingStyleAssessment
  ).results;
}
