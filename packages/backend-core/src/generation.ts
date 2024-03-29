import { resolve } from 'path';
import { bundleRequire } from 'bundle-require';

import type { Config } from './config';
import logger from './logger';

export type GeneratorFunc = (config: Config) => Promise<void>;

export const buildGeneratorPath = (generator: string) => {
  // We have to do some weird things with paths here to get our imports working. This is a really
  // bad practice and we need to find a better way to load these modules ASAP because this will
  // block any engineers that use a different build system than ours to write extensions
  const ieEsm = import.meta.url.startsWith('file:');

  return resolve(
    process.cwd(),
    'node_modules',
    generator,
    'dist',
    ieEsm ? 'index.js' : 'index.cjs'
  );
};

export const importModule = async <OutputType>(path: string) => {
  const rawImport = (await bundleRequire({ filepath: path })).mod as OutputType;
  return rawImport;
};

export const importAndRunGenerator = async (
  stepName: string,
  generator: string,
  config: Config
) => {
  if (generator === 'none') {
    logger.info(`Platform set to "none" for step ${stepName}, skipping generation`, config);
    return;
  }

  let rawImport: {
    default?: GeneratorFunc | undefined;
  };

  if (typeof Bun !== 'undefined') {
    rawImport = (await import(generator)) as { default?: GeneratorFunc };
  } else {
    rawImport = await importModule<{ default?: GeneratorFunc }>(buildGeneratorPath(generator));
  }
  if (!rawImport.default) {
    logger.error(
      `Step ${stepName} is attempting to import ${generator}, however no default export was provided.`
    );
    throw new Error('BAD_GENERATOR_EXPORT_NAME');
  }

  if (typeof rawImport.default !== 'function') {
    logger.error(
      `Step ${stepName} is attempting to import ${generator}, however the default export is not a function`
    );
    throw new Error('BAD_GENERATOR_EXPORT_TYPE');
  }

  await (rawImport.default as GeneratorFunc)(config);
};
