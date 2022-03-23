import { transports } from 'winston';

export const {
  Console,
  File,
  Http,
  Stream,
  FileTransportOptions,
  ConsoleTransportOptions,
  HttpTransportOptions,
  StreamTransportOptions,
} = transports;

export type ExitOnError = ((signal: string) => boolean) | boolean;

export type LogLevel =
  | 'error'
  | 'warn'
  | 'info'
  | 'debug'
  | 'silly'
  | 'verbose'
  | 'http';

export enum LogPriority {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  HTTP = 3,
  VERBOSE = 4,
  DEBUG = 5,
  SILLY = 6,
}

export type Transports =
  | transports.ConsoleTransportInstance
  | transports.FileTransportInstance
  | transports.StreamTransportInstance
  | transports.HttpTransportInstance;
