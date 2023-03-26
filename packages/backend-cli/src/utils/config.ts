import { readFile } from 'fs/promises';
import { resolve } from 'path';

import logger from 'utils/logger';

export interface Config {
  capabilities: {
    auth: boolean;
    graphql: boolean;
    orm: boolean;
    rest: boolean;
  };
  graphql: {
    builderPath?: string;
  };
  logLevel: 'debug' | 'info' | 'warn' | 'error';
  orm: 'prisma' | 'none';
  prismaDir: string;
  platform: 'express' | 'nextjs';
  serverDir: string;
}

export const defaultConfig: Config = {
  capabilities: {
    auth: true,
    graphql: true,
    orm: true,
    rest: false,
  },
  graphql: {},
  logLevel: 'info',
  orm: 'prisma',
  prismaDir: 'prisma',
  platform: 'nextjs',
  serverDir: resolve('src', 'server'),
};

export const getConfig = async (configPath: string): Promise<Config> => {
  const parsedConfigPath = resolve(process.cwd(), configPath);
  try {
    const rawConfigContents = await readFile(parsedConfigPath);
    const parsedConfig = JSON.parse(rawConfigContents.toString()) as Partial<Config>;
    const finalConfig = { ...defaultConfig, ...parsedConfig };
    logger.debug(`Config read successfully from ${parsedConfigPath}`, finalConfig);
    return finalConfig;
  } catch (err) {
    logger.warn(
      `An error occurred while reading your config at ${parsedConfigPath}: ${
        (err as Error).message
      }. The default config will be used as a backup`,
      defaultConfig
    );
    return defaultConfig;
  }
};
