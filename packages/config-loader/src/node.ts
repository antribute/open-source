import { bundleRequire } from 'bundle-require';
import { getConfigFilePath } from './common';
import type { LoadConfigParams } from './types';

export const loadConfigNode = async <ConfigShape extends Record<string, unknown>>(
  params: LoadConfigParams
): Promise<ConfigShape | null> => {
  const path = await getConfigFilePath(params);
  if (!path) {
    return null;
  }

  // Node requires us to use bundle-require and esbuild since it can't import TS, CJS, and MJS at
  // the same time on its own
  const rawConfig = await bundleRequire({ filepath: path });
  const configContent = rawConfig.mod.default ?? rawConfig.mod;

  if (typeof configContent !== 'object') {
    return null;
  }

  return configContent as ConfigShape | null;
};
