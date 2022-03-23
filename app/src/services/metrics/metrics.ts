import {
  Pushgateway,
  Registry,
  register as defaultRegister,
  Metric,
  Counter,
  Gauge,
  Histogram,
  Summary,
  collectDefaultMetrics,
} from 'prom-client';
import { RequestOptions as HttpsRequestOptions } from 'https';
import { RequestOptions as HttpRequestOptions } from 'http';
import { Indexable, APP_NAME_LOWERED } from '@utils';

type GatewayOpts = HttpsRequestOptions | HttpRequestOptions;

type MetricsData = {
  data: string;
  contenttype: string;
};

export class MetricsService {
  private register!: Registry;
  private gateway!: { [url: string]: Pushgateway };

  public constructor() {
    this.register = new Registry();
    collectDefaultMetrics({
      register: this.register,
      prefix: APP_NAME_LOWERED,
    });
  }

  private getData = async (
    name: string,
    register: Registry
  ): Promise<MetricsData> => ({
    data: await register.getSingleMetricAsString(name),
    contenttype: register.contentType,
  });

  setDefaultLabels = (labels: Indexable): void =>
    this.register.setDefaultLabels(labels);

  addGateway = (url: string, options: GatewayOpts): void => {
    const g = this.gateway[url];

    if (g) {
      throw new Error(`Found a gateway with url: ${url}`);
    }

    this.gateway[url] = new Pushgateway(url, options, this.register);
  };

  getGateway = (url: string): Pushgateway => {
    const g = this.gateway[url];

    if (!g) {
      throw new Error(`Not found gateway with url: ${url}`);
    }

    return g;
  };

  addMetric = (metric: Metric<string>): MetricsService => {
    this.register.registerMetric(metric);
    return this;
  };

  addAllMetrics = (...metrics: Metric<string>[]): void => {
    for (const metric of metrics) {
      this.register.registerMetric(metric);
    }
  };

  getMetric = (name: string): Metric<string> => {
    const m = this.register.getSingleMetric(name);

    if (!m) {
      throw new Error(`Not found metric named '${name}'`);
    }

    return m;
  };

  removeMetric = (name: string): void => {
    this.register.removeSingleMetric(name);
  };

  getMetricData = async (name: string): Promise<MetricsData> =>
    await this.getData(name, this.register);

  getDefaultMetricsData = async (name: string): Promise<MetricsData> =>
    await this.getData(name, defaultRegister);

  resetMetrics = (): void => this.register.resetMetrics();

  removeAllMetrics = (): void => this.register.clear();

  getCounter = (name: string): Counter<string> =>
    this.getMetric(name) as Counter<string>;

  getCounterData = async (name: string): Promise<MetricsData> =>
    await this.getData(name, this.register);

  getGauge = (name: string): Gauge<string> =>
    this.getMetric(name) as Gauge<string>;

  getGaugeData = async (name: string): Promise<MetricsData> =>
    await this.getData(name, this.register);

  getHistogram = (name: string): Histogram<string> =>
    this.getMetric(name) as Histogram<string>;

  getHistogramData = async (name: string): Promise<MetricsData> =>
    await this.getData(name, this.register);

  getSummary = (name: string): Summary<string> =>
    this.getMetric(name) as Summary<string>;

  getSummaryData = async (name: string): Promise<MetricsData> =>
    await this.getData(name, this.register);
}

const metrics = new MetricsService();
export { metrics };
