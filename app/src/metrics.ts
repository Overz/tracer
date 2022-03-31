import {
  metrics,
  metricsCounterRequest,
  metricsCounterResponse,
} from '@services';

export const setupMetrics = (): void => {
  metrics.addCustomMetrics(
    metricsCounterRequest,
    metricsCounterResponse
    // metricsHistogram,
    // metricsGauge
  );
};
