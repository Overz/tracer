import { NotFoundError } from '@errors';
import { logger } from '@services';
import { Request, Response, NextFunction } from 'express';
import { getMedatada, shouldSkipRequest } from './utils';

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
