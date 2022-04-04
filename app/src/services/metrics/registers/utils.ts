import { PartialsIndexable } from '@utils';
import { MetricsLabels } from './types';

export const labels = (): Required<MetricsLabels>[] => [
  'method',
  'url',
  'payload',
  'isUser',
  'status',
  'error',
  'label',
  'type',
];

export const buckets = (): number[] => [2.0, 5.0, 7.0, 10.0, 20.0];

export const getMetricsLabels = (
  meta: PartialsIndexable<MetricsLabels>
): PartialsIndexable<MetricsLabels> => meta;
