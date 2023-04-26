import { resolve } from 'path';
import type { Config } from './config';
import logger from './logger';

export type GeneratorFunc = (stepName: string, config: Config) => Promise<void>;

export const importAndRunGenerator = async (
  stepName: string,
  generator: string,
  config: Config
) => {
  // We're not using bundle-require here as there is no plan for the antribute backend to ever
  // support non-ts generators
  const rawImport = (await import(resolve(process.cwd(), generator))) as { default: unknown };
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

  await (rawImport.default as GeneratorFunc)(stepName, config);
};
