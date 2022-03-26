import { metrics, metricsCounter, metricsHistogram } from '@services';
import { metricsGauge } from '@services/metrics/registers/gauges';

export const setupMetrics = (): void => {
  metrics.addCustomMetrics(metricsCounter, metricsHistogram, metricsGauge);
};
