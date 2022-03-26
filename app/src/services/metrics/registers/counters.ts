import { Counter } from 'prom-client';
import { MetricsId } from './types';

export const metricsCounter = new Counter({
  name: 'app_counters',
  help: 'contador de estatisticas da aplicação',
  labelNames: [
    `${MetricsId.HTTP_REQUEST}_total`,
    `${MetricsId.HTTP_METHOD}_total`,
    `${MetricsId.HTTP_ERROR}_method_total`,
    `${MetricsId.HTTP_ERROR}_unmaped_total`,
    `${MetricsId.HTTP_PAYLOAD}_received_total`,
    `${MetricsId.HTTP_PAYLOAD}_sent_total`,
    `${MetricsId.APP_ERROR}_total`,
    `${MetricsId.APP_FATAL_ERROR}_total`,
    `${MetricsId.APP_UNMAPED_ERROR}_total`,
  ],
});
