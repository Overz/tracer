import { Request, Response } from 'express';
import { logger, metricsCounter } from '@services';
import { ENV, Indexable } from '@utils';
import { getMedatada } from '@middlewares/utils';
import { getLabelsResponseMetrics } from './utils';
import { StopRequestFunctions } from './types';

export const stopTrackMetrics = (
  req: Request,
  res: Response,
  { toStop, labels }: StopRequestFunctions
): void => {
  if (req.isError) {
    return;
  }

  const metrics: Indexable = {};

  const { stopHistogramRequest } = toStop as Required<
    StopRequestFunctions['toStop']
  >;

  const { counter, gauge, histogram } = getLabelsResponseMetrics(res, labels);

  metricsCounter.inc(counter, 1);

  metrics['stopHistogram'] = stopHistogramRequest(histogram);

  const meta = getMedatada(req);
  logger.info('request finished!', { label: '[RESPONSE]', meta });

  if (ENV['DEBUG']) {
    logger.info('printing metrics', { label: '[METRICS]', meta, metrics });
  }
};
