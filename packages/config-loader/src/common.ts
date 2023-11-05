import { parse } from 'path';

import Joycon from 'joycon';
import { merge } from 'lodash-es';

import type { LoadConfigParams } from './types';

export const getConfigFilePath = async (fileNames: string[], opts?: LoadConfigParams) => {
  const cwd = opts?.cwd ?? process.cwd();
  const overridePath = opts?.overrideConfigPath;
  const joycon = new Joycon();
  const configFile = await joycon.resolve({
    files: overridePath ? [overridePath] : fileNames,
    cwd,
    stopDir: parse(cwd).root,
  });

  return configFile;
};

export const mergeConfig = <ConfigShape extends Record<string, unknown>>(
  configA: Partial<ConfigShape>,
  configB: Partial<ConfigShape>
): Partial<ConfigShape> => merge(configA, configB);
