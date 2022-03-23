import { Counter } from 'prom-client';
import { MetricsHelp, MetricsIds } from './types';

export const metricsCounterNewRequest = new Counter({
  name: MetricsIds.NEW_REQUEST,
  help: MetricsHelp.NEW_REQUEST,
  labelNames: ['request_1xx', 'request_2xx', 'new_request'],
});

export const metricsCounterInternalError = new Counter({
  name: MetricsIds.INTERNAL_ERROR,
  help: MetricsHelp.INTERNAL_ERROR,
  labelNames: ['error_500', 'error_5xx', 'server_error'],
});

export const metricsCounterAppError = new Counter({
  name: MetricsIds.COMMON_ERROR,
  help: MetricsHelp.COMMON_ERROR,
  labelNames: ['error_3xx', 'error_4xx', 'error_thrown'],
});

export const metricsCounterTotalErrors = new Counter({
  name: MetricsIds.TOTAL_ERROR,
  help: MetricsHelp.TOTAL_ERROR,
  labelNames: ['total_error', 'error_4xx', 'error_5xx', 'error_thrown'],
});

export const metricsCounterNotFoundError = new Counter({
  name: MetricsIds.NOT_FOUND_ERROR,
  help: MetricsHelp.NOT_FOUND_ERROR,
  labelNames: ['not_found', 'error_404', 'error_4xx'],
});

export const metricsCounterCriticalError = new Counter({
  name: MetricsIds.CRITICAL_ERROR,
  help: MetricsHelp.CRITICAL_ERROR,
  labelNames: ['error_fatal', 'error_critical', 'error_exit', 'error_finish'],
});

export const metricsCounterGetRequests = new Counter({
  name: MetricsIds.GET_REQUEST,
  help: MetricsHelp.GET_REQUEST,
  labelNames: ['request_2xx', 'get_request'],
});

export const metricsCounterPutRequests = new Counter({
  name: MetricsIds.PUT_REQUEST,
  help: MetricsHelp.PUT_REQUEST,
  labelNames: ['request_2xx', 'put_request'],
});

export const metricsCounterPostRequests = new Counter({
  name: MetricsIds.POST_REQUEST,
  help: MetricsHelp.POST_REQUEST,
  labelNames: ['request_2xx', 'post_request'],
});

export const metricsCounterDeleteRequests = new Counter({
  name: MetricsIds.DELETE_REQUEST,
  help: MetricsHelp.DELETE_REQUEST,
  labelNames: ['request_2xx', 'delete_request'],
});
