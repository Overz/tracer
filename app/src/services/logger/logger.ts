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
import { dateFormat } from 'utils/date';

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
  eol?: string;
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
  eol = '\n',
}: LoggerOptions): Logger => {
  const fileOpts: typeof FileTransportOptions = {
    maxsize: bytes(maxsize),
    format: loggerFormatter(false),
    maxFiles,
    eol,
  };

  const [today] = dateFormat(new Date(), { pattern: 'ddMMyyyy' });

  fileName = fileName.toLowerCase();

  const consoleTransporter = new Console({
    format: loggerFormatter(colored),
    eol,
  });

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
