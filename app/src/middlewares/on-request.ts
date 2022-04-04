import { logger } from '@services';
import { Request, Response, NextFunction } from 'express';
import { nanoid } from 'nanoid';
import { startTrackMetrics, stopTrackMetrics } from './metrics';
import { getMedatada, shouldSkipRequest } from './utils';

const CORRELATION_ID = 20;
const TRACK_ID = 'X-Correlation-Id';

export const onRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (shouldSkipRequest(req.url)) {
    return next();
  }

  const correlationId = (req.headers[TRACK_ID] ||
    nanoid(CORRELATION_ID)) as string;

  req.isError = false;
  req.uuid = correlationId;
  req.headers[TRACK_ID] = correlationId;
  res.set({ [TRACK_ID]: correlationId });

  logger.info('new request received', {
    meta: getMedatada(req),
    label: '[REQUEST]',
  });

  const toStop = startTrackMetrics(req);
  res.on('finish', () => stopTrackMetrics(req, res, toStop));

  next();
};

// type StopFunctionsMap = {
//   [key: string]: StopLabels[];
// };

// const a = (m: any): StopFunctionsMap => {
//   const histLabels = metricsHistogramRequest.labels(m);
//   histLabels.observe(1);

//   return {
//     [m]: [histLabels.startTimer()],
//   };
// }

// const b = (m: any, toStop: StopFunctionsMap): void => {
//   const functions = toStop[m]
//   for (const fn of functions) {
//       fn(m);
//   }
// }
