import { getConfigFilePath } from './common';
import type { LoadConfigParams } from './types';

export const loadConfigBun = async <ConfigShape extends Record<string, unknown>>(
  params: LoadConfigParams
): Promise<ConfigShape | null> => {
  const path = await getConfigFilePath(params);
  if (!path) {
    return null;
  }

  const rawConfig = await import(path);
  const configContent = rawConfig.default ?? rawConfig;

  if (typeof configContent !== 'object') {
    return null;
  }

  return configContent as ConfigShape | null;
};
