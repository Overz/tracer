import { logger } from '@services';
import {
  metricsCounterNewRequest,
  metricsCounterGetRequests,
  metricsCounterPutRequests,
  metricsCounterPostRequests,
  metricsCounterDeleteRequests,
} from '@services';
import { Indexable } from '@utils';
import { Request, Response, NextFunction } from 'express';
import { nanoid } from 'nanoid';

interface Metadata {
  method: string;
  url: string;
  ip: string;
  uuid: string;
  useragent: string;
  params: string;
  querys: string;
}

const CORRELATION_ID = 20;
const TRACK_ID = 'x-correlation-id';
const skiped = ['/favicon.ico'];

const REQUESTS: Indexable = {
  GET: (): void => metricsCounterGetRequests.inc(1),
  PUT: (): void => metricsCounterPutRequests.inc(1),
  POST: (): void => metricsCounterPostRequests.inc(1),
  DELETE: (): void => metricsCounterDeleteRequests.inc(1),
};

export const getMedatada = (req: Request): Metadata => ({
  method: req.method,
  url: req.url,
  ip: req.ip,
  uuid: req.uuid,
  useragent: req.headers['user-agent'] as string,
  params: JSON.stringify(req.params),
  querys: JSON.stringify(req.query),
});

export const shouldSkipRequest = (url: string): boolean => skiped.includes(url);

export const requestTrack =
  () =>
  (req: Request, res: Response, next: NextFunction): void => {
    if (shouldSkipRequest(req.url)) {
      return next();
    }

    REQUESTS[req.method]();

    req.start = Date.now();
    console.time('request');
    req.on('end', () => {
      console.timeEnd('request');
    });

    const correlationId = (req.headers[TRACK_ID] ||
      nanoid(CORRELATION_ID)) as string;

    req.uuid = correlationId;
    req.headers[TRACK_ID] = correlationId;
    res.set({ [TRACK_ID]: correlationId });

    metricsCounterNewRequest.inc(1);

    logger.info('new request received', {
      meta: getMedatada(req),
      label: '[REQUEST]',
    });

    next();
  };
