import { bundleRequire } from 'bundle-require';
import Joycon from 'joycon';
import { merge } from 'lodash-es';
import { parse, resolve } from 'path';

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
  permissions: {
    platform: '@antribute/backend-perms-auth0-fga' | 'none';
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
  permissions: {
    platform: '@antribute/backend-perms-auth0-fga',
  },
  server: {
    dir: resolve('src', 'server'),
    platform: '@antribute/backend-server-nextjs',
  },
};

export const defineConfig = (config: Partial<Config>) => config;

export const getConfig = async (configPath?: string): Promise<Config> => {
  const cwd = process.cwd();
  const joycon = new Joycon();
  const configFile = await joycon.resolve({
    files: configPath
      ? [configPath]
      : ['.antributerc.ts', '.antributerc.js', '.antributerc.cjs', '.antributerc.mjs'],
    cwd,
    stopDir: parse(cwd).root,
  });

  if (!configFile) {
    return defaultConfig;
  }

  const rawConfig = await bundleRequire({ filepath: configFile });
  const mod = rawConfig.mod as { default?: Partial<Config> };
  const configContent = mod.default ?? (rawConfig.mod as Partial<Config>);
  return merge({ ...defaultConfig }, configContent);
};
