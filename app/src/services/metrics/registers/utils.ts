import { MetricsCounterLabels } from './types';

export const labels = (): MetricsCounterLabels[] => [
  'method',
  'url',
  'payload',
  'isUser',
  'status',
  'error',
];

export const buckets = (): number[] => [
  0.2, 0.5, 1, 1.5, 2, 2.5, 3, 5, 8, 10, 20,
];
