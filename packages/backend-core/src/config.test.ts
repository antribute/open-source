import { describe, expect, it } from 'bun:test';
import { defineConfig, defaultConfig, getConfig } from './config';

describe.skip('config', () => {
  describe('getConfig', () => {
    it('should import a typescript-based config and override the default config', async () => {
      const config = await getConfig('./test-config-files/.antributerc.ts');
      expect(config.server.platform).toBe('@antribute/backend-server-express');
    });

    it('should import a commonjs-based config and override the default config', async () => {
      const config = await getConfig('./test-config-files/.antributerc.cjs');
      expect(config.server.platform).toBe('@antribute/backend-server-express');
    });

    it('should return a default config if loading the config fails', async () => {
      const config = await getConfig('oops');
      expect(config.server.platform).toBe('@antribute/backend-server-nextjs');
    });
  });

  describe('generateConfig', () => {
    it('should return exactly what the user gives it (since this function is for semantics only)', () => {
      const myConfig = defineConfig(defaultConfig);
      expect(myConfig).toEqual(defaultConfig);
    });
  });
});
