export enum MetricsId {
  HTTP_REQUEST = 'http_request',
  HTTP_RESPONSE = 'http_response',
  ERROR = 'error',
}

export enum MetricsHelp {
  HTTP_REQUEST = 'http request metrics',
  HTTP_RESPONSE = 'http request metrics',
  ERROR = 'app error metrics',
}

export type MetricsLabels =
  | 'method'
  | 'url'
  | 'payload'
  | 'isUser'
  | 'status'
  | 'error';

export type MetricsCounterLabels = MetricsLabels;

export type MetricsHistogramLabels = MetricsLabels;

export type MetricsGaugeLabels = MetricsLabels;
