import axios from 'axios';
import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest';
import createLogger, { createLoggerFunc, LoggerTypes } from './createLogger';

const MOCK_AXIOM = { axiomOrgId: 'foo', axiomToken: 'bar', dataset: 'baz' };

describe('createLogger', () => {
  vi.mock('@axiomhq/axiom-node', () => ({
    default: vi.fn(),
  }));

  it('should create an Axiom client and 4 loggers', () => {
    const logger = createLogger(MOCK_AXIOM);
    expect(logger).toHaveProperty('debug');
    expect(logger).toHaveProperty('info');
    expect(logger).toHaveProperty('warn');
    expect(logger).toHaveProperty('error');
  });
});

describe('createLoggerFunc', () => {
  const consoleDebugSpy = vi.spyOn(console, 'debug');
  const consoleInfoSpy = vi.spyOn(console, 'info');
  const consoleWarnSpy = vi.spyOn(console, 'warn');
  const consoleErrorSpy = vi.spyOn(console, 'error');
  const consoleLogSpy = vi.spyOn(console, 'log');

  const postSpy = vi.spyOn(axios, 'post').mockImplementation(async () => {});

  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('should run console.debug when level is debug', () => {
    const LoggerFunc = createLoggerFunc(MOCK_AXIOM, LoggerTypes.debug);
    LoggerFunc({ message: 'bar' });
    expect(consoleDebugSpy).toHaveBeenCalledTimes(1);
    expect(postSpy).toHaveBeenCalledTimes(1);
  });

  it('should run console.info when level is info', () => {
    const LoggerFunc = createLoggerFunc(MOCK_AXIOM, LoggerTypes.info);
    LoggerFunc({ message: 'bar' });
    expect(consoleInfoSpy).toHaveBeenCalledTimes(1);
    expect(postSpy).toHaveBeenCalledTimes(1);
  });

  it('should run console.warn when level is warn', () => {
    const LoggerFunc = createLoggerFunc(MOCK_AXIOM, LoggerTypes.warn);
    LoggerFunc({ message: 'bar' });
    expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    expect(postSpy).toHaveBeenCalledTimes(1);
  });

  it('should run console.error when level is error', () => {
    const LoggerFunc = createLoggerFunc(MOCK_AXIOM, LoggerTypes.error);
    LoggerFunc({ message: 'bar' });
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    expect(postSpy).toHaveBeenCalledTimes(1);
  });

  it('should run console.log when level is invalid', () => {
    // @ts-expect-error: This will error since this is testing a non-ts case
    const LoggerFunc = createLoggerFunc(MOCK_AXIOM, null);
    LoggerFunc({ message: 'bar' });
    expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    expect(postSpy).toHaveBeenCalledTimes(1);
  });

  it('should send an object with a message key to axiom if a string is provided as the function arg', () => {
    const LoggerFunc = createLoggerFunc(MOCK_AXIOM, LoggerTypes.debug);
    LoggerFunc('this is a big test');
    expect(postSpy).toHaveBeenCalledTimes(1);
  });

  it('should gracefully handle failures in Axiom', () => {
    postSpy.mockImplementation(() => {
      throw new Error('This is an error');
    });
    const LoggerFunc = createLoggerFunc(MOCK_AXIOM, LoggerTypes.debug);
    LoggerFunc({ message: 'bar' });
    // We're making sure console.debug still runs here to ensure this isn't a false positive
    expect(consoleDebugSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
  });
});
