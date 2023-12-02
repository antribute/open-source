import { Errors } from '@antribute/typebox-errors';
import type { Static, TAnySchema } from '@sinclair/typebox';

import { mergeConfig } from './common';
import { loadConfigBun } from './bun';
import { loadConfigNode } from './node';
import type { LoadConfigParams } from './types';

export type { DefineConfigFn } from './types';

export const loadConfig = async <ConfigShape extends Record<string, unknown>>(
  params: LoadConfigParams,
  defaultConfig: ConfigShape
): Promise<ConfigShape> => {
  const loadedConfig = await (typeof Bun === 'undefined'
    ? loadConfigNode<ConfigShape>(params)
    : loadConfigBun<ConfigShape>(params));
  if (!loadedConfig) {
    return defaultConfig;
  }
  return mergeConfig<ConfigShape>(defaultConfig, loadedConfig);
};

export const validateConfig = <Schema extends TAnySchema>(
  configSchema: Schema,
  config: unknown
) => {
  const { data, error, success } = Errors.Check(configSchema, config);

  if (!success) {
    throw new Error(Errors.Message(error));
  }

  return data;
};

export interface LoadAndValidateConfigOptions<Schema extends TAnySchema> extends LoadConfigParams {
  defaultConfig: Static<Schema>;
  validationSchema: Schema;
}

export const loadAndValidateConfig = async <Schema extends TAnySchema>({
  defaultConfig,
  validationSchema,
  ...params
}: LoadAndValidateConfigOptions<Schema>): Promise<Static<Schema>> => {
  const config = await loadConfig(params, defaultConfig);
  return validateConfig<Schema>(validationSchema, config);
};

export { mergeConfig };
