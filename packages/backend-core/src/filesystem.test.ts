import { readFile } from 'fs/promises';
import { resolve } from 'path';
import rimraf from 'rimraf';
import { afterAll, describe, expect, it } from 'vitest';

import { defaultConfig } from './config';
import { getGeneratedDir, getServerDir, generateFile } from './filesystem';

describe('filesystem', () => {
  const config = {
    ...defaultConfig,
    server: { dir: './test-output', platform: defaultConfig.server.platform },
  };
  afterAll(async () => {
    await rimraf(resolve(config.server.dir));
  });

  describe('getServerDir', () => {
    it('should return the server directory from the config', () => {
      const dir = getServerDir(defaultConfig);
      expect(dir).toBe(resolve(process.cwd(), defaultConfig.server.dir));
    });
  });

  describe('getGeneratedDir', () => {
    it('should return the server directory from the config, appending generated to the path', () => {
      const dir = getGeneratedDir(defaultConfig);
      expect(dir).toBe(resolve(process.cwd(), defaultConfig.server.dir, 'generated'));
    });
  });

  describe('generateFile', () => {
    it('should write a file to the given path', async () => {
      await generateFile({ fileContent: 'Hello, world!', fileName: 'testFile' }, config);
      const fileOutput = await readFile(resolve(getGeneratedDir(config), 'testFile'));
      expect(fileOutput.toString()).toBe('Hello, world!');
    });
  });
});
