import { Counter } from 'prom-client';
import { MetricsLabels, MetricsHelp, MetricsId } from './types';
import { labels } from './utils';

export const metricsCounter = new Counter<MetricsLabels>({
  name: `api_${MetricsId.HTTP_REQUEST}_total`,
  help: MetricsHelp.HTTP_REQUEST,
  labelNames: labels(),
});

// export const metricsCounterResponse = new Counter<MetricsLabels>({
//   name: `api_${MetricsId.HTTP_RESPONSE}_total`,
//   help: MetricsHelp.HTTP_REQUEST,
//   labelNames: labels(),
// });

// export const metricsCounterError = new Counter<MetricsLabels>({
//   name: `api_${MetricsId.ERROR}_total`,
//   help: MetricsHelp.ERROR,
//   labelNames: labels(),
// });
