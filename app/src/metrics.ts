import {
  metrics,
  metricsCounterNewRequest,
  metricsCounterAppError,
  metricsCounterInternalError,
  metricsCounterCriticalError,
  metricsCounterGetRequests,
  metricsCounterPutRequests,
  metricsCounterPostRequests,
  metricsCounterDeleteRequests,
  metricsCounterNotFoundError,
  metricsCounterTotalErrors,
} from '@services';

export const setupMetrics = (): void => {
  const counterErrors = [
    metricsCounterAppError,
    metricsCounterInternalError,
    metricsCounterCriticalError,
    metricsCounterNotFoundError,
    metricsCounterTotalErrors,
  ];

  const counterRequests = [
    metricsCounterNewRequest,
    metricsCounterGetRequests,
    metricsCounterPutRequests,
    metricsCounterPostRequests,
    metricsCounterDeleteRequests,
  ];

  metrics.addAllMetrics(...counterErrors, ...counterRequests);
};
