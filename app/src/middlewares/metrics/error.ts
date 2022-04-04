import { metricsCounter } from '@services';
import { Request, Response } from 'express';
import { getLabelErrorMetrics } from './utils';

export const errorTrackMetrics = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
  req: Request,
  res: Response
): void => {
  req.isError = true;
  const { counter, gauge, histogram } = getLabelErrorMetrics(err, req, res);

  metricsCounter.inc(counter, 1);
};
