import { Indexable } from './types';

export const isEmptyObject = (obj: Indexable): boolean =>
  obj.constructor === Object && Object.keys(obj).length === 0;
