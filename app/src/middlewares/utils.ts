const skiped = ['/favicon.ico'];

export const shouldSkipRequest = (url: string, toSkip = skiped): boolean =>
  toSkip.includes(url);
