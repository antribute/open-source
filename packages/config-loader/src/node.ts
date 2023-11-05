import { bundleRequire } from 'bundle-require';
import { getConfigFilePath } from './common';
import type { LoadConfigParams } from './types';

export const loadConfigNode = async <ConfigShape extends Record<string, unknown>>(
  fileNames: string[],
  opts?: LoadConfigParams
): Promise<ConfigShape | null> => {
  const path = await getConfigFilePath(fileNames, opts);
  if (!path) {
    return null;
  }

  const rawConfig = await bundleRequire({ filepath: path });
  const configContent = rawConfig.mod.default ?? rawConfig.mod;

  if (typeof configContent !== 'object') {
    return null;
  }

  return configContent as ConfigShape;
};
