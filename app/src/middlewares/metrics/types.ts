/* eslint-disable @typescript-eslint/no-explicit-any */
import { MetricsLabels } from '@services';
import { PartialsIndexable } from '@utils';

export type TrackLabels = {
  counter: PartialsIndexable<MetricsLabels>;
  histogram: PartialsIndexable<MetricsLabels>;
  gauge: PartialsIndexable<MetricsLabels>;
};

export type ToStop = 'histogram';

export type StopLabels = (
  labels?: Partial<Record<string, string | number>> | undefined
) => void;

type StopFunctions<Type extends string> = {
  toStop: Partial<{
    [K in ToStop as `stop${Capitalize<K>}${Capitalize<Type>}`]: StopLabels;
  }>;
  labels: TrackLabels;
};

export type StopRequestFunctions = StopFunctions<'request'>;

export type StopResponseFunctions = StopFunctions<'response'>;
