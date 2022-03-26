import { Router } from 'express';

import {
  helloDeleteRouter,
  helloGetRouter,
  helloPostRouter,
  helloPutRouter,
  helloErrorRouter,
} from '@routes/hello';

import {
  counterMetricsRouter,
  gaugeMetricsRouter,
  histogramMetricsRouter,
  customMetricsRouter,
  resetMetricsRouter,
  summaryMetricsRouter,
} from '@routes/metrics';

const metrics = (): Router[] => [
  counterMetricsRouter,
  gaugeMetricsRouter,
  histogramMetricsRouter,
  customMetricsRouter,
  resetMetricsRouter,
  summaryMetricsRouter,
];

const hello = (): Router[] => [
  helloDeleteRouter,
  helloGetRouter,
  helloPostRouter,
  helloPutRouter,
  helloErrorRouter,
];

export const routes: Router[] = [...hello(), ...metrics()];
