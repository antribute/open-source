import { parse, resolve } from 'path';
import { bundleRequire } from 'bundle-require';
import Joycon from 'joycon';
import { merge } from 'lodash-es';

export interface Config {
  auth: {
    customConfig: Record<string, unknown>;
    platform: '@antribute/backend-auth-clerk' | '@antribute/backend-auth-nextauth' | 'none';
  };
  dir: string;
  graphql: {
    customConfig: Record<string, unknown>;
    platform: '@antribute/backend-graphql-pothos' | 'none';
  };
  logLevel: 'debug' | 'info' | 'warn' | 'error';
  orm: {
    customConfig: Record<string, unknown>;
    platform: '@antribute/backend-orm-prisma' | 'none';
  };
  permissions: {
    customConfig: Record<string, unknown>;
    platform:
      | '@antribute/backend-perms-auth0-fga'
      | '@antribute/backend-perms-openfga'
      | '@antribute/backend-perms-permify'
      | 'none';
  };
  server: {
    customConfig: Record<string, unknown>;
    platform: '@antribute/backend-server-koa' | '@antribute/backend-server-nextjs' | 'none';
  };
}

export const defaultConfig: Config = {
  auth: {
    customConfig: {},
    platform: '@antribute/backend-auth-clerk',
  },
  dir: resolve('src', 'server'),
  graphql: {
    customConfig: {},
    platform: '@antribute/backend-graphql-pothos',
  },
  logLevel: 'info',
  orm: {
    customConfig: {},
    platform: '@antribute/backend-orm-prisma',
  },
  permissions: {
    customConfig: {},
    platform: '@antribute/backend-perms-permify',
  },
  server: {
    customConfig: {},
    platform: '@antribute/backend-server-koa',
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
