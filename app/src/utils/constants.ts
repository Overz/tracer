import { get as env } from 'env-var';
import { resolve } from 'path';
import { EnvKeys, Envs, EnvsProps } from './types';

export const { NODE_ENV, TS_NODE_DEV } = process.env;
export const isNormalMode = NODE_ENV != 'test';
export const required = isNormalMode && !TS_NODE_DEV;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let setup: EnvsProps | null = {
  DEBUG: { required, type: 'asBool' },
  PORT: { required, type: 'asPortNumber' },
  APP_NAME: { required, type: 'asString' },
  VERSIONS: { required, type: 'asArray' },
  MAX_REQUEST: { required, type: 'asInt' },
  MAX_REQUEST_TIMEOUT: { required, type: 'asString' },
  LOG_COLORED: { required, type: 'asBool' },
  LOG_FILE_NAME: { required, type: 'asString' },
  LOG_LEVEL: { required, type: 'asString' },
  LOG_MAX_FILES: { required, type: 'asInt' },
  LOG_MAX_SIZE: { required, type: 'asString' },
  LOG_PATH: { required, type: 'asString' },
};

export const ENV = {} as Envs;
export let LOGS_PATH = '';
export let APP_NAME_LOWERED = '';

export const envs = (): void => {
  if (!setup) {
    throw new Error('[Constants] Setup is undefined');
  }

  const keys = Object.keys(setup) as EnvKeys[];

  for (const key of keys) {
    const { required, type } = setup[key];
    // eslint-disable-next-line @typescript-eslint/ban-types
    ENV[key] = (env(key).required(required)[type] as Function)();
  }

  LOGS_PATH = ENV['DEBUG'] ? resolve(__dirname, '..', 'logs') : ENV['LOG_PATH'];
  APP_NAME_LOWERED = (ENV['APP_NAME'] as string).toLowerCase();

  setup = null;
};
