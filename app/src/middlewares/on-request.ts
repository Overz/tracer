import {
  logger,
  metricsCounterRequest,
  metricsCounterResponse,
} from '@services';
import { Request, Response, NextFunction } from 'express';
import { nanoid } from 'nanoid';
import {
  getMedatada,
  hasRequestData,
  hasResponseData,
  shouldSkipRequest,
} from './utils';

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
  const payload = `${hasRequestData(req)}`;

  metricsCounterRequest.inc({ method, handler, payload }, 1);

  const correlationId = (req.headers[TRACK_ID] ||
    nanoid(CORRELATION_ID)) as string;

  req.uuid = correlationId;
  req.headers[TRACK_ID] = correlationId;
  res.set({ [TRACK_ID]: correlationId });

  logger.info('new request received', {
    meta: getMedatada(req),
    label: '[REQUEST]',
  });

  res.on('finish', () => onResponse(req, res));

  next();
};

const onResponse = (req: Request, res: Response): void => {
  logger.info('request finished!', { label: '[REQUEST]' });

  const { method, originalUrl: handler } = req;
  const { statusCode: status } = res;
  const payload = `${hasResponseData(res)}`;

  const counter = { method, handler, payload, status };

  metricsCounterResponse.inc(counter, 1);
};
