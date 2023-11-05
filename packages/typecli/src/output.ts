import * as colors from './colors';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export const parseLogLevel = () => {
  let logLevel = process.env.LOG_LEVEL ?? '';
  const allowedLogLevels: LogLevel[] = ['debug', 'info', 'warn', 'error'];

  if (!allowedLogLevels.includes(logLevel as LogLevel)) {
    logLevel = 'info';
  }

  return logLevel as LogLevel;
};

export const debug = (message: string) => {
  // Only show debug messages when LOG_LEVEL === debug
  if (parseLogLevel() === 'debug') {
    console.warn(`${colors.debug('[DEBUG]')} ${message}`);
  }
};

export const error = (message: string) => {
  // Always show error messages regardless of LOG_LEVEL
  console.error(`${colors.error('[ERROR]')} ${message}`);
};

export const info = (message: string) => {
  // Only show info messages when LOG_LEVEL === debug || info
  if (!['warn', 'error'].includes(parseLogLevel())) {
    // eslint-disable-next-line no-console
    console.info(`${colors.info('[INFO]')} ${message}`);
  }
};

export const success = (message: string) => {
  // Only show success messages when LOG_LEVEL === debug || info
  if (!['warn', 'error'].includes(parseLogLevel())) {
    // eslint-disable-next-line no-console
    console.info(`${colors.success('[SUCCESS]')} ${message}`);
  }
};

export const warn = (message: string) => {
  // Only show warn messages when LOG_LEVEL === debug || info || warn
  if (parseLogLevel() !== 'error') {
    console.warn(`${colors.warn('[WARN]')} ${message}`);
  }
};
