import 'express-async-errors';
import express, { Express, json, urlencoded } from 'express';
import limiter from 'express-rate-limit';
import { errorHandler, notFoundHandler, requestTrack } from '@middlewares';
import { routes } from './routes';
import cors from 'cors';
import ms from 'ms';
import { ENV, LOGS_PATH, APP_NAME_LOWERED } from '@utils';
import helmet from 'helmet';

let app: Express;

const server = (): Express => {
  app = express();

  app.use(json());
  app.use(cors());
  app.use(helmet());
  app.use(requestTrack());
  app.use(urlencoded({ extended: true }));
  app.use(
    limiter({
      skipFailedRequests: true,
      windowMs: ms(ENV['MAX_REQUEST_TIMEOUT'] as string),
      max: ENV['MAX_REQUEST'],
      skip: (req) => req.headers['x-requests-skip'] === 'requested',
      standardHeaders: true,
      handler: (req, res, next, opt) => {
        // TODO: Track IP's, Methods and Endpoints
        res.status(opt.statusCode).send({ message: opt.message });
      },
    })
  );

  app.use(`/v1/${APP_NAME_LOWERED}`, routes);
  app.use('/logs', express.static(LOGS_PATH));

  app.all('*', notFoundHandler);

  // must be the last
  app.use(errorHandler);

  return app;
};

export { server, app };
