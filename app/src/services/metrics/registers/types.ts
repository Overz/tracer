export enum MetricsId {
  HTTP_REQUEST = 'http_request',
  ERROR = 'error',
}

export enum MetricsHelp {
  HTTP_REQUEST = 'http request metrics',
  ERROR = 'app error metrics',
}

export type MetricsLabels =
  | 'method'
  | 'url'
  | 'payload'
  | 'isUser'
  | 'status'
  | 'error'
  | 'label'
  | 'type';
