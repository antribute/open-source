import { bundleRequire } from 'bundle-require';
import Joycon from 'joycon';
import { merge } from 'lodash-es';
import { parse, resolve } from 'path';

export interface Config {
  auth: {
    enabled: boolean;
    platform: 'nextauth';
    tenancy: 'multi' | 'single';
  };
  graphql: {
    enabled: boolean;
    builderPath?: string;
  };
  logLevel: 'debug' | 'info' | 'warn' | 'error';
  orm: {
    enabled: boolean;
    dir: string;
    platform: 'prisma';
  };
  server: {
    dir: string;
    platform: 'express' | 'next';
  };
}

export const defaultConfig: Config = {
  auth: {
    enabled: true,
    platform: 'nextauth',
    tenancy: 'multi',
  },
  graphql: {
    enabled: true,
  },
  logLevel: 'info',
  orm: {
    enabled: true,
    dir: 'prisma',
    platform: 'prisma',
  },
  server: {
    dir: resolve('src', 'server'),
    platform: 'next',
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
  return merge(defaultConfig, configContent);
};
