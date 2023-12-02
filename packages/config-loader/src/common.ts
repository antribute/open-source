import { parse } from 'path';

import Joycon from 'joycon';
import { merge } from 'lodash-es';

import type { LoadConfigParams } from './types';

export const getConfigFilePath = async ({
  cwd = process.cwd(),
  fileNames,
  overrideConfigPath,
}: LoadConfigParams) => {
  const joycon = new Joycon();
  const configFile = await joycon.resolve({
    files: overrideConfigPath
      ? [overrideConfigPath]
      : fileNames.flatMap((fileName) => [
          `${fileName}`,
          `${fileName}.ts`,
          `${fileName}.js`,
          `${fileName}.cjs`,
          `${fileName}.mjs`,
        ]),
    cwd,
    stopDir: parse(cwd).root,
  });

  return configFile;
};

export const mergeConfig = <ConfigShape extends Record<string, unknown>>(
  configA: Partial<ConfigShape>,
  configB: Partial<ConfigShape>
) => merge({ ...configA }, { ...configB }) as unknown as ConfigShape;
