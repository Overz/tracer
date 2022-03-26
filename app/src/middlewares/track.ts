import { logger, metricsHistogram } from '@services';
import { metricsCounter } from '@services';
import { metricsGauge } from '@services/metrics/registers/gauges';
import { isEmptyObject } from '@utils';
import { Request, Response, NextFunction } from 'express';
import { nanoid } from 'nanoid';
import { RequestMetadata, RequestsReturn } from './types';
import { shouldSkipRequest } from './utils';

const CORRELATION_ID = 20;
const TRACK_ID = 'x-correlation-id';

export const getMedatada = (req: Request): RequestMetadata => ({
  method: req.method,
  url: req.url,
  ip: req.ip,
  uuid: req.uuid,
  useragent: req.headers['user-agent'] as string,
  params: JSON.stringify(req.params),
  querys: JSON.stringify(req.query),
});

const hasPayload = ({ body, query, params }: Request): boolean =>
  isEmptyObject(body) && isEmptyObject(params) && isEmptyObject(query);

const getMetrics = (req: Request): RequestsReturn => {
  const { method, url } = req;

  const stopGauge = metricsGauge.startTimer({
    http_request_duration_second: url,
  });

  metricsGauge.set({ http_request_duration_second: method }, 1);

  metricsCounter.inc({ http_method_total: method, http_request_total: url }, 1);

  if (hasPayload(req)) {
    metricsCounter.inc({ http_payload_received_total: url }, 1);
  }

  return { stopGauge };
};

const stopMetrics = (
  req: Request,
  res: Response,
  stopFn: RequestsReturn
): void => {
  const { url, method } = req;
  const { stopGauge } = stopFn;

  metricsGauge.dec({ http_request_duration_second: url }, 1);

  stopGauge({ gauge_http_request: method });

  // TODO: utilizar em q?
  // const time = stopCounter({ histogram_request: method });
  // console.log({ time });
};

export const requestTrack =
  () =>
  (req: Request, res: Response, next: NextFunction): void => {
    if (shouldSkipRequest(req.url)) {
      return next();
    }

    const meta = getMedatada(req);
    logger.info('new request received', { meta, label: '[REQUEST]' });

    const { method } = req;

    const stopFn = getMetrics(req);

    req.on('end', () => stopMetrics(req, res, stopFn));

    const correlationId = (req.headers[TRACK_ID] ||
      nanoid(CORRELATION_ID)) as string;

    req.uuid = correlationId;
    req.headers[TRACK_ID] = correlationId;
    res.set({ [TRACK_ID]: correlationId });

    next();
  };
