export const COLORS = [
  { name: 'red', hexValue: '#ef4444' },
  { name: 'sky', hexValue: '#0ea5e9' },
  { name: 'emerald', hexValue: '#10b981' },
  { name: 'purple', hexValue: '#a855f7' },
  { name: 'orange', hexValue: '#f97316' },
  { name: 'gray', hexValue: '#6b7280' },
] as const;
export type Color = (typeof COLORS)[number];
