import { LongDesc } from '@/types/formDataTypes';

// from backend to form
export function transformLongDescToForm(
  longDesc: LongDesc
): { text: string }[] {
  return Object.entries(longDesc)
    .filter(([key]) => key.startsWith('section'))
    .sort(([a], [b]) => {
      const numA = parseInt(a.replace('section', ''), 10);
      const numB = parseInt(b.replace('section', ''), 10);
      return numA - numB;
    })
    .map(([, value]) => ({ text: value }));
}
// form form to backend
export function transformFormToLongDesc(
  arr: { text: string }[]
): Record<string, string> {
  return arr.reduce((acc, item, index) => {
    acc[`section${index + 1}`] = item.text;
    return acc;
  }, {} as Record<string, string>);
}
