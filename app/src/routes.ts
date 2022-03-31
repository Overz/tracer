import { Router } from 'express';

import {
  helloDeleteRouter,
  helloGetRouter,
  helloPostRouter,
  helloPutRouter,
} from '@routes/hello';

import {
  counterMetricsRouter,
  gaugeMetricsRouter,
  histogramMetricsRouter,
  customMetricsRouter,
  resetMetricsRouter,
  summaryMetricsRouter,
} from '@routes/metrics';

import { healthCheckRouter, errorRouter } from '@routes';

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
  errorRouter,
];

const others = (): Router[] => [healthCheckRouter, errorRouter];

export const routes: Router[] = [...hello(), ...metrics(), ...others()];
