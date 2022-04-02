import {
  metrics,
  metricsCounterRequest,
  metricsCounterResponse,
  metricsHistogramRequest,
  metricsHistogramResponse,
  metricsCounterError,
} from '@services/metrics';

export const setupMetrics = (): void => {
  metrics.addCustomMetrics(
    metricsCounterError,
    metricsCounterRequest,
    metricsCounterResponse,
    metricsHistogramRequest,
    metricsHistogramResponse
  );
};
