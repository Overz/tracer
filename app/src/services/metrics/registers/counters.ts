import { Counter } from 'prom-client';
import { MetricsHelp, MetricsId } from './types';

type HttpRequest =
  | 'method'
  | 'handler'
  | 'payload'
  | 'isUser'
  | 'status'
  | 'error';

const labels = (): HttpRequest[] => [
  'method',
  'handler',
  'payload',
  'isUser',
  'status',
  'error',
];

export const metricsCounterRequest = new Counter<HttpRequest>({
  name: `api_${MetricsId.HTTP_REQUEST}_total`,
  help: MetricsHelp.HTTP_REQUEST,
  labelNames: labels(),
});

export const metricsCounterResponse = new Counter<HttpRequest>({
  name: `api_${MetricsId.HTTP_RESPONSE}_total`,
  help: MetricsHelp.HTTP_REQUEST,
  labelNames: labels(),
});

export const metricsCounterError = new Counter<HttpRequest>({
  name: `api_${MetricsId.ERROR}_total`,
  help: MetricsHelp.ERROR,
  labelNames: labels(),
});
