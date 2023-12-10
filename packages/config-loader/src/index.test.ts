import { join } from 'path';
import { describe, expect, it } from 'bun:test';

import { Type } from '@sinclair/typebox';
import type { Static } from '@sinclair/typebox';

import { loadAndValidateConfig, mergeConfig } from '.';
import type { DefineConfigFn } from '.';

const ConfigSchema = Type.Object({
  foo: Type.String(),
});

const defaultConfig: Static<typeof ConfigSchema> = {
  foo: 'default',
};

describe('loadAndValidateConfig', () => {
  it('should load the first extension in the array if multiple are found', async () => {
    const config = await loadAndValidateConfig({
      cwd: join(import.meta.dir, '..', 'testConfigs'),
      defaultConfig,
      fileNames: ['testConfig'],
      validationSchema: ConfigSchema,
    });

    expect(config).toEqual({ foo: 'none' });
  });

  it('should load configs with a .cjs extension', async () => {
    const config = await loadAndValidateConfig({
      cwd: join(import.meta.dir, '..', 'testConfigs'),
      defaultConfig,
      fileNames: ['testConfig'],
      overrideConfigPath: join(import.meta.dir, '..', 'testConfigs', 'testConfig.cjs'),
      validationSchema: ConfigSchema,
    });

    expect(config).toEqual({ foo: 'cjs' });
  });

  it('should load configs with a .js extension', async () => {
    const config = await loadAndValidateConfig({
      cwd: join(import.meta.dir, '..', 'testConfigs'),
      defaultConfig,
      fileNames: ['testConfig'],
      overrideConfigPath: join(import.meta.dir, '..', 'testConfigs', 'testConfig.js'),
      validationSchema: ConfigSchema,
    });

    expect(config).toEqual({ foo: 'js' });
  });

  it('should load configs with a .mjs extension', async () => {
    const config = await loadAndValidateConfig({
      cwd: join(import.meta.dir, '..', 'testConfigs'),
      defaultConfig,
      fileNames: ['testConfig'],
      overrideConfigPath: join(import.meta.dir, '..', 'testConfigs', 'testConfig.mjs'),
      validationSchema: ConfigSchema,
    });

    expect(config).toEqual({ foo: 'mjs' });
  });

  it('should load configs with a .ts extension', async () => {
    const config = await loadAndValidateConfig({
      cwd: join(import.meta.dir, '..', 'testConfigs'),
      defaultConfig,
      fileNames: ['testConfig'],
      overrideConfigPath: join(import.meta.dir, '..', 'testConfigs', 'testConfig.ts'),
      validationSchema: ConfigSchema,
    });

    expect(config).toEqual({ foo: 'ts' });
  });

  it('should load default config if no valid config is found', async () => {
    const config = await loadAndValidateConfig({
      cwd: join(import.meta.dir, '..', 'willBreak'),
      defaultConfig,
      fileNames: ['notValid'],
      validationSchema: ConfigSchema,
    });

    expect(config).toEqual({ foo: 'default' });
  });
});

describe('DefineConfigFn', () => {
  it('should be easy to incorporate into defineConfig functions', () => {
    const defineConfig: DefineConfigFn<Static<typeof ConfigSchema>> = (config) =>
      mergeConfig(defaultConfig, config);
    const myConfig = defineConfig({ foo: 'defined' });
    expect(myConfig.foo).toBe('defined');
  });
});
