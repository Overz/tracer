import { metrics, metricsCounter, metricsHistogram } from '@services/metrics';

export const setupMetrics = (): void => {
  metrics.addCustomMetrics(metricsCounter, metricsHistogram);
};
