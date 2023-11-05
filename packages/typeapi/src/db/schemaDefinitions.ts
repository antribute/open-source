import { join, sep } from 'path';
import glob from 'fast-glob';

import type { Config } from 'config';
import { output } from '@antribute/typecli';

const RELATIVE_PREFIX = `.${sep}`;

export const getAllSchemaDefinitionPaths = async (config: Config): Promise<string[]> => {
  output.debug('Importing All .model.ts Files');
  const modelsGlob = await glob(join(process.cwd(), config.server.rootDir, '**', '*.models.ts'));
  return modelsGlob;
};

export const parseSchemaDefinitionPath = (config: Config, schemaDefinitionPath: string) => {
  const relativePath = schemaDefinitionPath.split(config.server.rootDir)[1]!;
  let variableName = relativePath.split('.models.ts')[0]!;
  if (variableName[0] === sep) {
    variableName = variableName.substring(1);
  }
  const importPath = `${RELATIVE_PREFIX}${join(config.server.rootDir, `${variableName}.models`)}`;
  return {
    importPath,
    relativePath,
    variableName,
  };
};

export const createCombinedSchema = async (config: Config): Promise<TypeAPI.Schema> => {
  const allModelFiles = await getAllSchemaDefinitionPaths(config);
  const allModels = await Promise.all(
    allModelFiles.map((modelFile) => import(modelFile) as Promise<Record<string, unknown>>)
  );
  output.debug('Merging Models into Main Schema');
  const mergedSchemas = allModels.reduce<TypeAPI.Schema>(
    (combinedSchema, currentModel) => ({ ...combinedSchema, ...currentModel }),
    {} as TypeAPI.Schema // An empty object obviously isn't a schema so we cast this here
  );
  output.debug('Main Schema Created');
  return mergedSchemas;
};
