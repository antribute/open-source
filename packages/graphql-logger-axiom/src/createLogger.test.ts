import Axiom from '@axiomhq/axiom-node';
import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest';
import createLogger, { createLoggerFunc, LoggerTypes } from './createLogger';

describe('createLogger', () => {
  vi.mock('@axiomhq/axiom-node', () => ({
    default: vi.fn(),
  }));

  it('should create an Axiom client and 4 loggers', () => {
    const logger = createLogger({ axiomOrgId: 'foo', axiomToken: 'bar', dataset: 'baz' });
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

  const mockIngestEvents = vi.fn().mockImplementation(() => Promise.resolve());
  const mockAxiom = {
    datasets: {
      ingestEvents: mockIngestEvents,
    },
  } as unknown as Axiom;

  const MOCK_DATASET = 'foo';

  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('should run console.debug when level is debug', () => {
    const LoggerFunc = createLoggerFunc(mockAxiom, MOCK_DATASET, LoggerTypes.debug);
    LoggerFunc({ message: 'bar' });
    expect(consoleDebugSpy).toHaveBeenCalledTimes(1);
    expect(mockIngestEvents).toHaveBeenCalledTimes(1);
  });

  it('should run console.info when level is info', () => {
    const LoggerFunc = createLoggerFunc(mockAxiom, MOCK_DATASET, LoggerTypes.info);
    LoggerFunc({ message: 'bar' });
    expect(consoleInfoSpy).toHaveBeenCalledTimes(1);
    expect(mockIngestEvents).toHaveBeenCalledTimes(1);
  });

  it('should run console.warn when level is warn', () => {
    const LoggerFunc = createLoggerFunc(mockAxiom, MOCK_DATASET, LoggerTypes.warn);
    LoggerFunc({ message: 'bar' });
    expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    expect(mockIngestEvents).toHaveBeenCalledTimes(1);
  });

  it('should run console.error when level is error', () => {
    const LoggerFunc = createLoggerFunc(mockAxiom, MOCK_DATASET, LoggerTypes.error);
    LoggerFunc({ message: 'bar' });
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    expect(mockIngestEvents).toHaveBeenCalledTimes(1);
  });

  it('should run console.log when level is invalid', () => {
    // @ts-expect-error: This will error since this is testing a non-ts case
    const LoggerFunc = createLoggerFunc(mockAxiom, MOCK_DATASET, null);
    LoggerFunc({ message: 'bar' });
    expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    expect(mockIngestEvents).toHaveBeenCalledTimes(1);
  });

  it('should send an object with a message key to axiom if a string is provided as the function arg', () => {
    const LoggerFunc = createLoggerFunc(mockAxiom, MOCK_DATASET, LoggerTypes.debug);
    LoggerFunc('this is a big test');
    expect(mockIngestEvents).toHaveBeenCalledWith(MOCK_DATASET, {
      level: LoggerTypes.debug,
      message: 'this is a big test',
    });
  });

  it('should gracefully handle failures in Axiom', () => {
    mockIngestEvents.mockImplementation(() => {
      throw new Error('This is an error');
    });
    const LoggerFunc = createLoggerFunc(mockAxiom, MOCK_DATASET, LoggerTypes.debug);
    LoggerFunc({ message: 'bar' });
    // We're making sure console.debug still runs here to ensure this isn't a false positive
    expect(consoleDebugSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
  });
});
