import { Router, Request, Response } from 'express';
import { RequestOptions as HttpsRequestOptions } from 'https';
import { RequestOptions as HttpRequestOptions } from 'http';
import {
  register as defaultRegister,
  Histogram,
  Counter,
  Gauge,
  Summary,
  Pushgateway,
  Registry,
} from 'prom-client';

const histogram = new Histogram({
  name: 'histogram',
  help: 'help histogram',
});

const counter = new Counter({
  name: 'counter',
  help: 'help counter',
});

const gauge = new Gauge({
  name: 'gauge',
  help: 'help gauge',
});

const summary = new Summary({
  name: 'summary',
  help: 'help summary',
});

const register = new Registry();
register.registerMetric(histogram);
register.registerMetric(counter);
register.registerMetric(gauge);
register.registerMetric(summary);

const options: HttpsRequestOptions | HttpRequestOptions = {};
const gateway = new Pushgateway('', options, register);

const defaultMetrics = Router();

defaultMetrics.get('/metrics', async (req: Request, res: Response) => {
  res.set('Content-Type', defaultRegister.contentType);
  res.send(await defaultRegister.metrics());
});

const customMetrics = Router();

customMetrics.get('/metrics/custom', async (req: Request, res: Response) => {
  res.set('Content-Type', register.contentType);
  res.send(await register.metrics());
});

const gatewayRouter = Router();

gatewayRouter.post('/push', async (req: Request, res: Response) => {
  const pushed = await gateway.push({ jobName: 'bunda_job' });
  res.send(pushed);
});

export {
  defaultMetrics as defaultMetricsRouter,
  customMetrics as customMetricsRouter,
  gatewayRouter,
};
