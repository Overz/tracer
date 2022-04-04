import { Request, Response, NextFunction } from 'express';
import { logger } from '@services';
import { AppError } from '@errors';
import { Indexable } from '@utils';
import {
  getMedatada,
  internalErrorMessage,
  internalErrorStatus,
  shouldSkipRequest,
} from './utils';
import { errorTrackMetrics } from './metrics/error';

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

  const meta = {
    label: '[ERROR]',
    meta: getMedatada(req),
    err,
  };

  if (err instanceof AppError) {
    const { statusCode: status, serialize } = err;
    const { message, errors } = serialize();

    delete meta.err;
    logger.warn(message, meta);
    res.status(status).send({ message, errors });

    errorTrackMetrics(err, req, res);
    return;
  }

  logger.error(internalErrorMessage, meta);

  res.status(internalErrorStatus).send({ message: internalErrorMessage });

  errorTrackMetrics(err, req, res);
};
