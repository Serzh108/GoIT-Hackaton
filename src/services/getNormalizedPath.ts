export const getNormalizedPath = (path: string): string[] => {
  return path.split('/').filter(part => part.length > 0);
};