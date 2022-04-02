import { Summary } from 'prom-client';

export const metricsSummary = new Summary({
  name: 'app_summary',
  help: 'resumo das estatisticas',
  // ageBuckets: 1,
  // compressCount: 10,
  // percentiles: [1],
  labelNames: ['summary_request'],
});
