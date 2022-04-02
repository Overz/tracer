import { PartialsIndexable } from '@utils';
import { Histogram } from 'prom-client';
import { MetricsHistogramLabels, MetricsHelp, MetricsId } from './types';
import { buckets, labels } from './utils';

export const metricsHistogramRequest = new Histogram<MetricsHistogramLabels>({
  name: `api_${MetricsId.HTTP_REQUEST}_buckets`,
  help: MetricsHelp.HTTP_REQUEST,
  labelNames: labels(),
  buckets: buckets(),
});

export const metricsHistogramResponse = new Histogram<MetricsHistogramLabels>({
  name: 'a',
  help: 'a',
  labelNames: labels(),
  buckets: buckets(),
});

export const getMetricsHistogramLabels = (
  meta: PartialsIndexable<MetricsHistogramLabels>
): PartialsIndexable<MetricsHistogramLabels> => meta;
