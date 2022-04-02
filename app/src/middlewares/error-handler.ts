import { Request, Response, NextFunction } from 'express';
import { logger, metricsCounterError } from '@services';
import { AppError } from '@errors';
import { Indexable } from '@utils';
import { getMedatada, hasRequestData, shouldSkipRequest } from './utils';

const internalErrorMessage = 'Internal Server Error';
const internalErrorStatus = 500;

export const errorHandler = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): Response<Indexable, Record<string, Indexable>> | undefined | void => {
  if (shouldSkipRequest(req.url)) {
    return next();
  }

  const { method, url, ...rest } = getMedatada(req);
  const meta = {
    label: '[ERROR]',
    meta: { method, url, ...rest },
  };

  const { name } = err;

  const counter = {
    method,
    url,
    error: name,
    payload: `${hasRequestData(req)}`,
  };

  if (err instanceof AppError) {
    const { statusCode: status, serialize } = err;
    const { message, errors } = serialize();

    logger.warn(message, meta);
    metricsCounterError.inc({ ...counter, status });

    return res.status(status).send({ message, errors });
  }

  delete err.message;
  logger.error(internalErrorMessage, { ...meta, err });

  metricsCounterError.inc({
    ...counter,
    status: internalErrorStatus,
  });

  res.status(internalErrorStatus).send({ message: internalErrorMessage });
};
