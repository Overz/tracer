import { Request, Response, NextFunction } from 'express';
import {
  logger,
  metricsCounter,
  metricsGauge,
  metricsHistogram,
} from '@services';
import { getMedatada } from './track';
import { AppError, NotFoundError } from '@errors';
import { Indexable } from '@utils';
import { shouldSkipRequest } from './utils';

const internalError = 'Internal Server Error';

export const errorHandler = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): Response<Indexable, Record<string, Indexable>> | undefined | void => {
  if (shouldSkipRequest(req.url)) {
    return next();
  }

  const meta = {
    label: '[ERROR]',
    meta: getMedatada(req),
  };

  const errname = err.name;

  if (err instanceof AppError) {
    const { statusCode, serialize } = err;
    const { message, errors } = serialize();

    logger.warn(message, meta);

    // metricsCounter.inc({ error_total: errname, status_total: statusCode }, 1);
    // metricsHistogram.observe({ app_error: errname }, 1);
    // metricsGauge.inc({ gauge_app_error: errname }, 1);

    return res.status(statusCode).send({ message, errors });
  }

  delete err.message;
  logger.error(internalError, { ...meta, err });

  // metricsCounter.inc({ error_unmaped_total: errname }, 1);
  // metricsGauge.inc({ gauge_unmaped_error: errname }, 1);

  res.status(500).send({ message: internalError });
};

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (shouldSkipRequest(req.url)) {
    return next();
  }

  logger.warn('request not found!', {
    label: '[REQUEST]',
    meta: getMedatada(req),
  });

  throw new NotFoundError();
};
