import {
  metrics,
  metricsCounterRequestReceived,
  metricsHistogram,
  metricsGauge,
  metricsSummary,
} from '@services';

export const setupMetrics = (): void => {
  metrics.addCustomMetrics(
    metricsCounterRequestReceived
    // metricsHistogram,
    // metricsGauge
  );
};
