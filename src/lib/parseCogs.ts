export function parseCogs(text: string): { success: false } | { success: true; data: string[] } {
  text = text.trim();

  const hyphenSeparatedRegEx = /^\d{1,2}(?:-\d{1,2})*$/;
  const spaceSeparatedRegEx = /^\d{1,2}(?:\s\d{1,2})*$/;
  const comaSeparatedRegEx = /^\d{1,2}(?:,\d{1,2})*$/;
  const comaSpaceSeparatedRegEx = /^\d{1,2}(?:,\s\d{1,2})*$/;

  if (hyphenSeparatedRegEx.test(text)) return { success: true, data: text.split('-') };
  if (spaceSeparatedRegEx.test(text)) return { success: true, data: text.split(' ') };
  if (comaSeparatedRegEx.test(text)) return { success: true, data: text.split(',') };
  if (comaSpaceSeparatedRegEx.test(text)) return { success: true, data: text.split(', ') };

  return { success: false };
}
