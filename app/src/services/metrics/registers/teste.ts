import { Counter, Histogram, Gauge, Summary } from 'prom-client';
import { MetricsId } from './types';

export const counter = new Counter({
  name: 'app_counter',
  help: 'app all counter metrics',
  labelNames: [
    `${MetricsId.HTTP_REQUEST}_total`,
    `${MetricsId.HTTP_REQUEST}_endpoint_total`,
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

export const histogram = new Histogram({
  name: 'app_histogram',
  help: 'app all histogram metrics',
  labelNames: [
    `${MetricsId.HTTP_REQUEST}_duration_seconds`,
    `${MetricsId.HTTP_REQUEST}_payload_sent_bytes`,
    `${MetricsId.HTTP_REQUEST}_payload_received_bytes`,
    `${MetricsId.HTTP_REQUEST}_top_notfound_error`,
    `${MetricsId.HTTP_REQUEST}_top_internal_error`,
    `${MetricsId.HTTP_REQUEST}_top_endpoint`,
    `${MetricsId.HTTP_METHOD}_top_error`,
    `${MetricsId.HTTP_METHOD}_top`,
    // `${MetricsId.}`,
  ],
});

export const gauge = new Gauge({
  name: 'app_gauge',
  help: 'app all gauge metris',
});

export const summary = new Summary({
  name: 'app_summary',
  help: 'app all summary metrics',
});
