import { Logger, createLogger } from 'winston';
import {
  LogLevel,
  File,
  Console,
  FileTransportOptions,
  ExitOnError,
} from './types';
import { loggerFormatter } from './utils';
import bytes from 'bytes';

export let logger: Logger;

type LoggerOptions = {
  path: string;
  fileName: string;
  maxsize: string;
  colored: boolean;
  maxFiles: number;
  level: LogLevel;
  silent?: boolean;
  exitOnError?: ExitOnError;
};

export const setupLogger = ({
  path,
  fileName,
  maxsize,
  maxFiles,
  colored,
  level,
  silent = false,
  exitOnError = false,
}: LoggerOptions): Logger => {
  const fileOpts: typeof FileTransportOptions = {
    maxsize: bytes(maxsize),
    format: loggerFormatter(false),
    maxFiles,
  };

  fileName = fileName.toLowerCase();

  const date = new Date();
  const today = `${date.getDate()}0${date.getMonth() + 1}${date.getFullYear()}`;

  const consoleTransporter = new Console({ format: loggerFormatter(colored) });

  logger = createLogger({
    silent,
    level,
    handleExceptions: true,
    exitOnError,
    exceptionHandlers: [
      new File({
        filename: `${path}/${today}-${fileName}-exceptions.log`,
        ...fileOpts,
      }),
      consoleTransporter,
    ],
    transports: [
      new File({
        filename: `${path}/${today}-${fileName}.log`,
        ...fileOpts,
      }),
      consoleTransporter,
    ],
  });

  return logger;
};
