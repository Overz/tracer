import { isEmptyObject } from '@utils';
import { Request } from 'express';
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

export const hasPayload = ({ body, query, params }: Request): boolean =>
  isEmptyObject(body) && isEmptyObject(params) && isEmptyObject(query);
