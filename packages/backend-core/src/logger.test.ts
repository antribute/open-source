import { afterAll, beforeEach, describe, expect, it, spyOn } from 'bun:test';
import { defaultConfig } from 'config';
import logger from './logger';

describe('logger', () => {
  const consoleDebugSpy = spyOn(console, 'debug').mockImplementation(() => {});
  const consoleErrorSpy = spyOn(console, 'error').mockImplementation(() => {});
  const consoleInfoSpy = spyOn(console, 'info').mockImplementation(() => {});
  const consoleWarnSpy = spyOn(console, 'warn').mockImplementation(() => {});

  beforeEach(() => {
    consoleDebugSpy.mockClear();
    consoleErrorSpy.mockClear();
    consoleInfoSpy.mockClear();
    consoleWarnSpy.mockClear();
  });

  afterAll(() => {
    consoleDebugSpy.mockRestore();
    consoleErrorSpy.mockRestore();
    consoleInfoSpy.mockRestore();
    consoleWarnSpy.mockRestore();
  });

  describe('error', () => {
    it('should call console.error regardless of the log level', () => {
      logger.error('This is an error');
      expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('warn', () => {
    it('should not call console.warn if the log level is "error"', () => {
      const config = { ...defaultConfig, logLevel: 'error' as const };
      logger.warn('This is a warning', config);
      expect(consoleWarnSpy).toHaveBeenCalledTimes(0);
    });

    it('should call console.warn if the log level is "warn"', () => {
      const config = { ...defaultConfig, logLevel: 'warn' as const };
      logger.warn('This is a warning', config);
      expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    });

    it('should call console.warn if the log level is "info"', () => {
      const config = { ...defaultConfig, logLevel: 'info' as const };
      logger.warn('This is a warning', config);
      expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    });

    it('should call console.warn if the log level is "debug"', () => {
      const config = { ...defaultConfig, logLevel: 'debug' as const };
      logger.warn('This is a warning', config);
      expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('info', () => {
    it('should not call console.info if the log level is "error"', () => {
      const config = { ...defaultConfig, logLevel: 'error' as const };
      const consoleInfoSpy = spyOn(console, 'info').mockImplementation(() => {});
      logger.info('This is some info', config);
      expect(consoleInfoSpy).toHaveBeenCalledTimes(0);
    });

    it('should not call console.info if the log level is "warn"', () => {
      const config = { ...defaultConfig, logLevel: 'warn' as const };
      logger.info('This is some info', config);
      expect(consoleInfoSpy).toHaveBeenCalledTimes(0);
    });

    it('should call console.info if the log level is "info"', () => {
      const config = { ...defaultConfig, logLevel: 'info' as const };
      logger.info('This is some info', config);
      expect(consoleInfoSpy).toHaveBeenCalledTimes(1);
    });

    it('should call console.info if the log level is "debug"', () => {
      const config = { ...defaultConfig, logLevel: 'debug' as const };
      logger.info('This is some info', config);
      expect(consoleInfoSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('debug', () => {
    it('should not call console.debug if the log level is "error"', () => {
      const config = { ...defaultConfig, logLevel: 'error' as const };
      logger.debug('This is some debug info', config);
      expect(consoleDebugSpy).toHaveBeenCalledTimes(0);
    });

    it('should not call console.debug if the log level is "warn"', () => {
      const config = { ...defaultConfig, logLevel: 'warn' as const };
      logger.debug('This is some debug info', config);
      expect(consoleDebugSpy).toHaveBeenCalledTimes(0);
    });

    it('should not call console.debug if the log level is "info"', () => {
      const config = { ...defaultConfig, logLevel: 'info' as const };
      logger.debug('This is some debug info', config);
      expect(consoleDebugSpy).toHaveBeenCalledTimes(0);
    });

    it('should call console.info if the log level is "debug"', () => {
      const config = { ...defaultConfig, logLevel: 'debug' as const };
      logger.debug('This is some debug info', config);
      expect(consoleDebugSpy).toHaveBeenCalledTimes(1);
    });
  });
});
