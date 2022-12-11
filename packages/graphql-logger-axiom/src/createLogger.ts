import Axiom from '@axiomhq/axiom-node';
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
  (axiom: Axiom, dataSet: string, level: LoggerTypes): LoggerFunc =>
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
      await axiom.datasets.ingestEvents(dataSet, {
        ...(finalizedArgs as Record<string, unknown>),
        level,
      });
    } catch (err) {
      // Obviously we want this log to run, we need to know if there's something up with Axiom
      // eslint-disable-next-line no-console
      console.error(
        'There was an error sending logs to Axiom, this is really bad and should never happen',
        err
      );
    }
  };

const createLogger = ({
  axiomOrgId,
  axiomToken,
  dataset,
}: CreateLoggerParams): Record<LoggerTypes, LoggerFunc> => {
  const axiom = new Axiom({
    orgId: axiomOrgId,
    token: axiomToken,
  });

  return {
    debug: createLoggerFunc(axiom, dataset, LoggerTypes.debug),
    info: createLoggerFunc(axiom, dataset, LoggerTypes.info),
    warn: createLoggerFunc(axiom, dataset, LoggerTypes.warn),
    error: createLoggerFunc(axiom, dataset, LoggerTypes.error),
  };
};

export default createLogger;
