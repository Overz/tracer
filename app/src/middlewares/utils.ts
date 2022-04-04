import { Indexable, isEmptyObject } from '@utils';
import { Request, Response } from 'express';
import { RequestMetadata } from './types';

export const internalErrorMessage = 'Internal Server Error';
export const internalErrorStatus = 500;

const skiped = ['/favicon.ico', '/metrics'];

export const shouldSkipRequest = (url: string, toSkip = skiped): boolean => {
  let skip = false;

  for (const path of toSkip) {
    if (url.includes(path)) {
      skip = true;
    }
  }

  return skip;
};

export const getMedatada = (req: Request): RequestMetadata => ({
  method: req.method,
  url: req.url,
  ip: req.ip,
  uuid: req.uuid,
  useragent: req.headers['user-agent'] as string,
  params: JSON.stringify(req.params),
  querys: JSON.stringify(req.query),
});

export const hasRequestData = ({ body, query, params }: Request): boolean =>
  !isEmptyObject(body) && !isEmptyObject(params) && !isEmptyObject(query);

export const hasResponseData = (res: Response): boolean => {
  const headers = res.getHeaders() as Indexable;
  return (headers['content-length'] as number) > 0;
};
