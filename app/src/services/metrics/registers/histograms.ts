import { Histogram } from 'prom-client';
import { MetricsId } from './types';

export const metricsHistogram = new Histogram({
  name: 'app_histogram',
  help: 'histogram e estatisticas da aplicação',
  labelNames: [
    // `${MetricsId.HTTP_REQUEST}_duration_seconds`,
    // `${MetricsId.HTTP_REQUEST}_payload_sent_bytes`,
    // `${MetricsId.HTTP_REQUEST}_payload_received_bytes`,
    // `${MetricsId.HTTP_REQUEST}_top_endpoint_rate`,
    // `${MetricsId.HTTP_REQUEST}_top_notfound_error`,
    // `${MetricsId.HTTP_REQUEST}_top_internal_error`,
    // `${MetricsId.HTTP_REQUEST}_top_endpoint_error`,
    // `${MetricsId.HTTP_METHOD}_top_error`,
    // `${MetricsId.APP_ERROR}`,
    // `${MetricsId.APP_FATAL_ERROR}`,
    // `${MetricsId.APP_UNMAPED_ERROR}`,
  ],
  buckets: [
    0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 0.75, 1, 2, 2.5, 3, 3.5, 5, 6, 7,
    8, 9, 10, 15, 20, 25, 30, 40, 50, 60, 70, 80, 90, 100,
  ],
});
