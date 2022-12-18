import axios from 'axios';
import clc from 'cli-color';

export type LoggerFunc = (log: Record<string, unknown> | string) => void;
export enum LoggerTypes {
  debug = 'debug',
  info = 'info',
  warn = 'warn',
  error = 'error',
}

export interface CreateLoggerParams {
  axiomOrgId: string;
  axiomToken: string;
  dataset: string;
}

export const createLoggerFunc =
  (params: CreateLoggerParams, level: LoggerTypes): LoggerFunc =>
  async (args) => {
    let logPrefix: string;
    let logFunc: (...fnargs: unknown[]) => void;
    switch (level) {
      // Disabling no-console for all of these because we very clearly want our logger to log
      case LoggerTypes.debug:
        // eslint-disable-next-line no-console
        logFunc = console.debug;
        logPrefix = '[Debug]: ';
        break;
      case LoggerTypes.info:
        // eslint-disable-next-line no-console
        logFunc = console.info;
        logPrefix = clc.cyan('[Info]: ');
        break;
      case LoggerTypes.warn:
        // eslint-disable-next-line no-console
        logFunc = console.warn;
        logPrefix = clc.yellow('[Warn]:');
        break;
      case LoggerTypes.error:
        // eslint-disable-next-line no-console
        logFunc = console.error;
        logPrefix = clc.red('[Error]: ');
        break;
      default:
        // eslint-disable-next-line no-console
        logFunc = console.log;
        logPrefix = '[Log]: ';
    }

    if (typeof args !== 'string' && args.message) {
      logFunc(logPrefix, args.message, args);
    } else {
      logFunc(logPrefix, args);
    }

    let finalizedArgs = args;
    if (typeof args !== 'object' && !Array.isArray(args)) {
      finalizedArgs = { message: args };
    }

    try {
      await axios.post(
        `https://cloud.axiom.co/api/v1/datasets/${params.dataset}/ingest`,
        [
          {
            ...(finalizedArgs as Record<string, unknown>),
            level,
          },
        ],
        {
          headers: {
            Authorization: `Bearer ${params.axiomToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (err) {
      // Obviously we want this log to run, we need to know if there's something up with Axiom
      // eslint-disable-next-line no-console
      console.error(
        'There was an error sending logs to Axiom, this is really bad and should never happen',
        err
      );
    }
  };

const createLogger = (params: CreateLoggerParams): Record<LoggerTypes, LoggerFunc> => ({
  debug: createLoggerFunc(params, LoggerTypes.debug),
  info: createLoggerFunc(params, LoggerTypes.info),
  warn: createLoggerFunc(params, LoggerTypes.warn),
  error: createLoggerFunc(params, LoggerTypes.error),
});

export default createLogger;
