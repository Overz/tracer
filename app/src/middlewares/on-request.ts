import {
  getMetricsCounterLabels,
  getMetricsHistogramLabels,
  logger,
  metricsCounterRequest,
  metricsCounterResponse,
  metricsHistogramRequest,
} from '@services';
import { Indexable } from '@utils';
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

type ToStop = 'histogram';

type StopFunctions = {
  [K in ToStop as `stop${Capitalize<K>}`]: (
    labels?: Partial<Record<string, string | number>> | undefined
  ) => void;
};

const startTrackMetrics = (metrics: Indexable): StopFunctions => {
  const counter = getMetricsCounterLabels(metrics);
  const histogram = getMetricsHistogramLabels(metrics);

  const counterLabels = metricsCounterRequest.labels(counter);
  counterLabels.inc(1);

  const histLabels = metricsHistogramRequest.labels(histogram);
  histLabels.observe(1);

  return {
    stopHistogram: histLabels.startTimer(),
  };
};

const stopTrackMetrics = (metrics: Indexable, toStop: StopFunctions): void => {
  const { stopHistogram } = toStop;

  const histogram = getMetricsHistogramLabels(metrics);

  const n = stopHistogram(histogram);
  console.log({ n });
};

export const onRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { method, url } = req;

  if (shouldSkipRequest(url)) {
    return next();
  }

  const metrics = { method, url, payload: `${hasRequestData(req)}` };

  const toStop = startTrackMetrics(metrics);

  const correlationId = (req.headers[TRACK_ID] ||
    nanoid(CORRELATION_ID)) as string;

  req.uuid = correlationId;
  req.headers[TRACK_ID] = correlationId;
  res.set({ [TRACK_ID]: correlationId });

  logger.info('new request received', {
    meta: getMedatada(req),
    label: '[REQUEST]',
  });

  res.on('finish', () => onResponse(req, res, metrics, toStop));

  next();
};

const onResponse = (
  req: Request,
  res: Response,
  metrics: Indexable,
  toStop: StopFunctions
): void => {
  logger.info('request finished!', { label: '[REQUEST]' });

  metrics = {
    ...metrics,
    payload: `${hasResponseData(res)}`,
    status: res.statusCode,
  };

  stopTrackMetrics(metrics, toStop);

  metricsCounterResponse.inc(metrics, 1);
};
