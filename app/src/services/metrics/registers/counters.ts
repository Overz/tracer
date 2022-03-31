import { Counter } from 'prom-client';
import { MetricsHelp, MetricsId } from './types';

// export const metricsCounter = new Counter({
//   name: 'app_counters',
//   help: 'contador de estatisticas da aplicação',
//   labelNames: [
//     `${MetricsId.HTTP_REQUEST}_total`,
//     `${MetricsId.HTTP_METHOD}_total`,
//     `${MetricsId.HTTP_ERROR}_method_total`,
//     `${MetricsId.HTTP_ERROR}_unmaped_total`,
//     `${MetricsId.HTTP_PAYLOAD}_received_total`,
//     `${MetricsId.HTTP_PAYLOAD}_sent_total`,
//     `${MetricsId.APP_ERROR}_total`,
//     `${MetricsId.APP_FATAL_ERROR}_total`,
//     `${MetricsId.APP_UNMAPED_ERROR}_total`,
//   ],
// });

export const metricsCounterRequestReceived = new Counter({
  name: `api_${MetricsId.HTTP_REQUEST}_total`,
  help: MetricsHelp.HTTP_REQUEST,
  labelNames: ['method', 'handler', 'payload', 'isUser'],
});

export const metricsCounterRequestSent = new Counter({
  name: `api_${MetricsId.HTTP_RESPONSE}_total`,
  help: MetricsHelp.HTTP_REQUEST,
  labelNames: ['method', 'handler', 'payload', 'isUser', 'status'],
});

export const metricsCounterRequestError = new Counter({
  name: `api_${MetricsId.HTTP_ERROR}_total`,
  help: MetricsHelp.HTTP_ERROR,
  labelNames: ['method', 'handler', 'payload', 'isUser', 'status', 'error'],
});
