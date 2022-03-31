import { Request, Response, NextFunction } from 'express';
import { logger, metricsCounterRequestError } from '@services';
import { AppError } from '@errors';
import { Indexable } from '@utils';
import { getMedatada, hasPayload, shouldSkipRequest } from './utils';

const internalErrorMessage = 'Internal Server Error';
const internalErrorStatus = 500;

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

  const { method, url, ...rest } = getMedatada(req);
  const meta = {
    label: '[ERROR]',
    meta: { method, url, ...rest },
  };

  const { name } = err;

  const counterReq = {
    method,
    handler: url,
    error: name,
    payload: `${hasPayload(req)}`,
  };

  if (err instanceof AppError) {
    const { statusCode, serialize } = err;
    const { message, errors } = serialize();

    logger.warn(message, meta);
    metricsCounterRequestError.inc({ ...counterReq, status: statusCode });

    return res.status(statusCode).send({ message, errors });
  }

  // loger
  delete err.message;
  logger.error(internalErrorMessage, { ...meta, err });

  // metrics
  metricsCounterRequestError.inc({
    ...counterReq,
    status: internalErrorStatus,
  });

  // final
  res.status(internalErrorStatus).send({ message: internalErrorMessage });
};
