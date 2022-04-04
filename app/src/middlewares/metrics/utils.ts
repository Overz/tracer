import { AppError } from '@errors';
import {
  hasResponseData,
  internalErrorMessage,
  internalErrorStatus,
} from '@middlewares/utils';
import { getMetricsLabels } from '@services';
import bytes from 'bytes';
import { Request, Response } from 'express';
import { StopRequestFunctions, TrackLabels } from './types';

const content = 'content-length';

export const getLabelsRequestMetrics = (req: Request): TrackLabels => {
  const { method, url, statusCode: status } = req;
  const payload = bytes(req.headers[content] || '0');

  const tmpMetrics = getMetricsLabels({
    method,
    url,
    status,
    label: '[REQUEST]',
    payload,
  });

  const counter = getMetricsLabels({
    ...tmpMetrics,
    payload: `${payload > 0}`,
  });

  const histogram = getMetricsLabels({ ...tmpMetrics });

  const gauge = getMetricsLabels({ ...tmpMetrics });

  return { counter, gauge, histogram };
};

export const getLabelsResponseMetrics = (
  res: Response,
  labels: Required<StopRequestFunctions['labels']>
): TrackLabels => {
  const { statusCode: status } = res;
  const payload = bytes((res.getHeader(content) as string) || '0');
  const restLabels = getMetricsLabels({ status, label: '[RESPONSE]' });
  const { counter: tmpCounter, gauge: tmpGauge, histogram: tmpHist } = labels;

  const counter = getMetricsLabels({
    ...tmpCounter,
    ...restLabels,
    payload: `${hasResponseData(res)}`,
  });

  const histogram = getMetricsLabels({ ...tmpHist, ...restLabels, payload });

  const gauge = getMetricsLabels({ ...tmpGauge, ...restLabels, payload });

  return { counter, histogram, gauge };
};

export const getLabelErrorMetrics = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
  req: Request,
  res: Response
): TrackLabels => {
  const { method, url } = req;
  const payload = bytes((res.getHeader(content) as string) || '');

  const metrics = getMetricsLabels({
    method,
    url,
    status: internalErrorStatus,
    label: '[ERROR]',
    payload,
    error: internalErrorMessage,
  });

  if (err instanceof AppError) {
    metrics.status = err.statusCode;
    metrics.error = err.name;
  }

  return {
    counter: { ...metrics, payload: `${payload > 0}` },
    gauge: metrics,
    histogram: metrics,
  };
};
