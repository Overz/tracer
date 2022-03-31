import { Request, Response, NextFunction } from 'express';
import { getMedatada } from './utils';

export const onResponse = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  req.on('end', () => {
    console.log('REQUEST FINISHED');
    console.log({ req: getMedatada(req) });

    const {
      writableLength,
      writableObjectMode,
      finished,
      writableFinished,
      writableEnded,
      statusCode,
      statusMessage,
    } = res;

    console.log({
      res: {
        writableLength,
        writableObjectMode,
        finished,
        writableFinished,
        writableEnded,
        statusCode,
        statusMessage,
      },
    });
  });

  next();
};
