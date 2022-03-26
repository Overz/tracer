import { LabelValues } from 'prom-client';

export interface RequestMetadata {
  method: string;
  url: string;
  ip: string;
  uuid: string;
  useragent: string;
  params: string;
  querys: string;
}

export type StopCounterFunction = (labels?: LabelValues<string>) => number;
export type StopGaugeFunction = (labels?: LabelValues<string>) => void;

export type RequestsReturn = {
  [key: `${string}Counter`]: StopCounterFunction;
  [key: `${string}Gauge`]: StopGaugeFunction;
};
