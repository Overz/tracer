/* eslint-disable @typescript-eslint/no-explicit-any */
import { VariableAccessors } from 'env-var';

export type Indexable = Record<string, any>;

export type TypedIndexable<K extends string> = Record<K, any>;

export type PartialsIndexable<K extends string> = Partial<
  Record<K, string | number>
>;

export type EnvKeys =
  | 'DEBUG'
  | 'PORT'
  | 'APP_NAME'
  | 'VERSIONS'
  | 'MAX_REQUEST'
  | 'MAX_REQUEST_TIMEOUT'
  | 'LOG_COLORED'
  | 'LOG_FILE_NAME'
  | 'LOG_LEVEL'
  | 'LOG_MAX_FILES'
  | 'LOG_MAX_SIZE'
  | 'LOG_PATH';

export type EnvsProps = {
  [K in EnvKeys]: {
    required: boolean;
    type: keyof VariableAccessors;
  };
};

export type Envs = { [K in EnvKeys]: any };

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      uuid: string;
    }
  }
}
