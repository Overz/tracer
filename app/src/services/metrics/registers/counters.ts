import { PartialsIndexable } from '@utils';
import { Counter } from 'prom-client';
import { MetricsCounterLabels, MetricsHelp, MetricsId } from './types';
import { labels } from './utils';

export const metricsCounterRequest = new Counter<MetricsCounterLabels>({
  name: `api_${MetricsId.HTTP_REQUEST}_total`,
  help: MetricsHelp.HTTP_REQUEST,
  labelNames: labels(),
});

export const metricsCounterResponse = new Counter<MetricsCounterLabels>({
  name: `api_${MetricsId.HTTP_RESPONSE}_total`,
  help: MetricsHelp.HTTP_REQUEST,
  labelNames: labels(),
});

export const metricsCounterError = new Counter<MetricsCounterLabels>({
  name: `api_${MetricsId.ERROR}_total`,
  help: MetricsHelp.ERROR,
  labelNames: labels(),
});

export const getMetricsCounterLabels = (
  meta: PartialsIndexable<MetricsCounterLabels>
): PartialsIndexable<MetricsCounterLabels> => meta;
