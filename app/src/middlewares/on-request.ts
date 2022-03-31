import { logger, metricsCounterRequestReceived } from '@services';
import { Request, Response, NextFunction } from 'express';
import { nanoid } from 'nanoid';
import { getMedatada, hasPayload, shouldSkipRequest } from './utils';

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

  const { method, url: handler } = req;
  const payload = `${hasPayload(req)}`;

  metricsCounterRequestReceived.inc({ method, handler, payload }, 1);

  const correlationId = (req.headers[TRACK_ID] ||
    nanoid(CORRELATION_ID)) as string;

  console.log({ correlationId });

  req.uuid = correlationId;
  req.headers[TRACK_ID] = correlationId;
  res.set({ [TRACK_ID]: correlationId });

  logger.info('new request received', {
    meta: getMedatada(req),
    label: '[REQUEST]',
  });

  next();
};
