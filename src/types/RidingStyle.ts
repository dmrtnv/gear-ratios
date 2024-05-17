export const RIDING_STYLES = ['road', 'gravel', 'mtb'] as const;
export type RidingStyle = (typeof RIDING_STYLES)[number];
