import { Request, Response, NextFunction } from 'express';
import {
  logger,
  metricsCounterAppError,
  metricsCounterInternalError,
  metricsCounterNotFoundError,
  metricsCounterTotalErrors,
} from '@services';
import { getMedatada, shouldSkipRequest } from './track';
import {
  AppError,
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
} from '@errors';
import { Indexable } from '@utils';

const internalError = 'Internal Server Error';

const errors = {
  [AppError.name]: internalError,
  [NotFoundError.name]: internalError,
  [BadRequestError.name]: 'Bad Request Error',
  [NotAuthorizedError.name]: 'Not Authorized Error',
};

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

  metricsCounterTotalErrors.inc(1);

  const meta = {
    label: '[APP]',
    meta: getMedatada(req),
  };

  if (err instanceof AppError) {
    metricsCounterAppError.inc(1);

    logger.warn(errors[err.name], meta);

    return res.status(err.statusCode).send(err.serialize());
  }

  metricsCounterInternalError.inc(1);

  delete err.message;
  logger.error(internalError, { ...meta, err });

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

  metricsCounterNotFoundError.inc(1);

  logger.warn('request not found!', {
    label: '[REQUEST]',
    meta: getMedatada(req),
  });

  throw new NotFoundError();
};
