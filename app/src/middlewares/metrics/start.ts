import { Request } from 'express';
import { metricsCounter, metricsHistogram } from '@services';
import { StopRequestFunctions } from './types';
import { getLabelsRequestMetrics } from '.';

export const startTrackMetrics = (req: Request): StopRequestFunctions => {
  const { counter, gauge, histogram } = getLabelsRequestMetrics(req);

  metricsCounter.inc(counter, 1);

  const histLabels = metricsHistogram.labels(histogram);
  histLabels.observe(1);

  return {
    toStop: {
      stopHistogramRequest: histLabels.startTimer(),
    },
    labels: { counter, histogram, gauge },
  };
};
