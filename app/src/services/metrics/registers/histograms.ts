import { Histogram } from 'prom-client';
import { MetricsLabels, MetricsHelp, MetricsId } from './types';
import { buckets, labels } from './utils';

export const metricsHistogram = new Histogram<MetricsLabels>({
  name: `api_${MetricsId.HTTP_REQUEST}`,
  help: MetricsHelp.HTTP_REQUEST,
  labelNames: labels(),
  buckets: buckets(),
});

// export const metricsHistogramResponse = new Histogram<MetricsLabels>({
//   name: `api_${MetricsId.HTTP_RESPONSE}_buckets`,
//   help: MetricsHelp.HTTP_RESPONSE,
//   labelNames: labels(),
//   buckets: buckets(),
// });
