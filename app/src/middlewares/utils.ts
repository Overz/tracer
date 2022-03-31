import { Indexable, isEmptyObject } from '@utils';
import { Request, Response } from 'express';
import { RequestMetadata } from './types';

const skiped = ['/favicon.ico'];

export const shouldSkipRequest = (url: string, toSkip = skiped): boolean =>
  toSkip.includes(url);

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
