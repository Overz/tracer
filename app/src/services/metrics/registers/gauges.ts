import { Gauge } from 'prom-client';

export const metricsGauge = new Gauge({
  name: 'app_gauge',
  help: 'gauge e estatisticas da aplicação',
  labelNames: [
    'http_request_duration_second',
    'http_request_payload_length',
    'app_error',
    'app_unmaped_error',
    'app_critical_error',
  ],
});
