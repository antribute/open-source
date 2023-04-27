import { readFile } from 'fs/promises';
import { resolve } from 'path';

import logger from 'utils/logger';

export interface Config {
  auth: {
    platform: '@antribute/backend-auth-nextauth' | 'none';
  };
  graphql: {
    dir: string;
    platform: '@antribute/backend-graphql-pothos' | 'none';
  };
  logLevel: 'debug' | 'info' | 'warn' | 'error';
  orm: {
    dir: string;
    platform: '@antribute/backend-orm-prisma' | 'none';
  };
  server: {
    dir: string;
    platform: '@antribute/backend-server-express' | '@antribute/backend-server-nextjs' | 'none';
  };
}

export const defaultConfig: Config = {
  auth: {
    platform: '@antribute/backend-auth-nextauth',
  },
  graphql: {
    dir: resolve('generated', 'pothos'),
    platform: '@antribute/backend-graphql-pothos',
  },
  logLevel: 'info',
  orm: {
    dir: 'prisma',
    platform: '@antribute/backend-orm-prisma',
  },
  server: {
    dir: resolve('src', 'server'),
    platform: '@antribute/backend-server-nextjs',
  },
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
