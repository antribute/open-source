/* eslint-disable no-console */
import pc from 'picocolors';

import type { Config } from './config';

const debug = (msg: string, config: Config) => {
  if (config.logLevel !== 'debug') {
    return;
  }
  console.debug(`${pc.gray('[Debug]:')} ${msg}`);
};

const error = (msg: string) => {
  // Error logs are always ran, regardless of log level
  console.error(`${pc.red('[Error]:')} ${msg}`);
};

const info = (msg: string, config: Config) => {
  if (['error', 'warn'].includes(config.logLevel)) {
    return;
  }
  console.info(`${pc.cyan('[Info]:')} ${msg}`);
};

const warn = (msg: string, config: Config) => {
  if (config.logLevel === 'error') {
    return;
  }
  console.warn(`${pc.yellow('[Warn]:')} ${msg}`);
};

const logger = {
  debug,
  error,
  info,
  warn,
};

export default logger;

// Debug - Call all logs
// Info - Call all logs except for debug
// Warn - Call all logs except for debug and info
// Error - Only call error logs
