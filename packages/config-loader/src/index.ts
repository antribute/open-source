import type { TObject } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';
import type { PartialDeep } from 'type-fest';

import { mergeConfig } from './common';
import { loadConfigBun } from './bun';
import { loadConfigNode } from './node';
import type { LoadConfigParams } from './types';

export const defineConfig = <ConfigShape extends Record<string, unknown>>(
  config: PartialDeep<ConfigShape>
) => config;

export const loadConfig = async <ConfigShape extends Record<string, unknown>>(
  fileNames: string[],
  defaultConfig: ConfigShape,
  opts?: LoadConfigParams
): Promise<ConfigShape> => {
  let loadedConfig: ConfigShape | null;
  if (typeof Bun === 'undefined') {
    loadedConfig = await loadConfigNode(fileNames, opts);
  } else {
    loadedConfig = await loadConfigBun(fileNames, opts);
  }
  if (!loadedConfig) {
    return defaultConfig;
  }
  return mergeConfig(defaultConfig, loadedConfig) as ConfigShape;
};

export const validateConfig = <ConfigShape extends Record<string, unknown>>(
  configSchema: TObject,
  config: unknown,
  { castConfig } = { castConfig: true }
) => {
  let finalConfig = config;

  if (castConfig) {
    finalConfig = Value.Cast(configSchema, config);
  }
  const isConfigValid = Value.Check(configSchema, finalConfig);

  if (!isConfigValid) {
    throw new Error('Invalid Configuration');
  }

  return finalConfig as ConfigShape;
};

export interface LoadAndValidateConfigOptions extends LoadConfigParams {
  fileNames: string[];
  validationSchema: TObject;
}

export const loadAndValidateConfig = async <ConfigShape extends Record<string, unknown>>({
  cwd,
  fileNames,
  overrideConfigPath,
  validationSchema,
}: LoadAndValidateConfigOptions): Promise<ConfigShape> => {
  const config = await loadConfig<ConfigShape>(
    fileNames,
    Value.Create(validationSchema) as ConfigShape,
    {
      cwd,
      overrideConfigPath,
    }
  );
  return validateConfig<ConfigShape>(validationSchema, config);
};
