import { afterEach, describe, expect, it, vi } from 'vitest';
import { defaultConfig } from 'config';
import logger from './logger';

describe('logger', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('error', () => {
    it('should call console.error regardless of the log level', () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      logger.error('This is an error');
      expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('warn', () => {
    it('should not call console.warn if the log level is "error"', () => {
      const config = { ...defaultConfig, logLevel: 'error' as const };
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      logger.warn('This is a warning', config);
      expect(consoleWarnSpy).toHaveBeenCalledTimes(0);
    });

    it('should call console.warn if the log level is "warn"', () => {
      const config = { ...defaultConfig, logLevel: 'warn' as const };
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      logger.warn('This is a warning', config);
      expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    });

    it('should call console.warn if the log level is "info"', () => {
      const config = { ...defaultConfig, logLevel: 'info' as const };
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      logger.warn('This is a warning', config);
      expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    });

    it('should call console.warn if the log level is "debug"', () => {
      const config = { ...defaultConfig, logLevel: 'debug' as const };
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      logger.warn('This is a warning', config);
      expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('info', () => {
    it('should not call console.info if the log level is "error"', () => {
      const config = { ...defaultConfig, logLevel: 'error' as const };
      const consoleInfoSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
      logger.info('This is some info', config);
      expect(consoleInfoSpy).toHaveBeenCalledTimes(0);
    });

    it('should not call console.info if the log level is "warn"', () => {
      const config = { ...defaultConfig, logLevel: 'warn' as const };
      const consoleInfoSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
      logger.info('This is some info', config);
      expect(consoleInfoSpy).toHaveBeenCalledTimes(0);
    });

    it('should call console.info if the log level is "info"', () => {
      const config = { ...defaultConfig, logLevel: 'info' as const };
      const consoleInfoSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
      logger.info('This is some info', config);
      expect(consoleInfoSpy).toHaveBeenCalledTimes(1);
    });

    it('should call console.info if the log level is "debug"', () => {
      const config = { ...defaultConfig, logLevel: 'debug' as const };
      const consoleInfoSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
      logger.info('This is some info', config);
      expect(consoleInfoSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('debug', () => {
    it('should not call console.debug if the log level is "error"', () => {
      const config = { ...defaultConfig, logLevel: 'error' as const };
      const consoleDebugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});
      logger.debug('This is some debug info', config);
      expect(consoleDebugSpy).toHaveBeenCalledTimes(0);
    });

    it('should not call console.debug if the log level is "warn"', () => {
      const config = { ...defaultConfig, logLevel: 'warn' as const };
      const consoleDebugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});
      logger.debug('This is some debug info', config);
      expect(consoleDebugSpy).toHaveBeenCalledTimes(0);
    });

    it('should not call console.debug if the log level is "info"', () => {
      const config = { ...defaultConfig, logLevel: 'info' as const };
      const consoleDebugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});
      logger.debug('This is some debug info', config);
      expect(consoleDebugSpy).toHaveBeenCalledTimes(0);
    });

    it('should call console.info if the log level is "debug"', () => {
      const config = { ...defaultConfig, logLevel: 'debug' as const };
      const consoleDebugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});
      logger.debug('This is some debug info', config);
      expect(consoleDebugSpy).toHaveBeenCalledTimes(1);
    });
  });
});
