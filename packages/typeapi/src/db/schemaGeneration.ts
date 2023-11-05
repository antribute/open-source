import { join } from 'path';

import { output } from '@antribute/typecli';

import type { Config } from 'config';
import {
  createFile,
  createGlobalDeclaration,
  createTsProject,
  getAllExportDeclarationsFromFile,
  insertDisclaimer,
} from 'utils/codeGeneration';

import { getAllSchemaDefinitionPaths, parseSchemaDefinitionPath } from './schemaDefinitions';

// This algorithm is shit and needs to be improved
export const generateSchemaTypings = async (config: Config) => {
  output.info('Generating Schema Typings');
  const project = createTsProject();
  const generatedGlobalTypingsFile = createFile(
    project,
    config,
    join(process.cwd(), 'TypeAPI.d.ts'),
    true
  );

  const schemaDefinitionPaths = await getAllSchemaDefinitionPaths(config);
  const allSchemaImportDeclarations = generatedGlobalTypingsFile.addImportDeclarations(
    schemaDefinitionPaths.map((schemaDefinitionPath) => {
      const { importPath, variableName } = parseSchemaDefinitionPath(config, schemaDefinitionPath);
      return {
        moduleSpecifier: importPath,
        namespaceImport: variableName,
        isTypeOnly: true,
      };
    })
  );

  output.debug('Extracting Model Definitions');
  const allModels = allSchemaImportDeclarations.flatMap((schemaDefinitionFile) => {
    const importName = schemaDefinitionFile.getNamespaceImportOrThrow().getText();
    return getAllExportDeclarationsFromFile(
      schemaDefinitionFile.getModuleSpecifierSourceFile()
    ).map((variableDeclaration) => ({
      importName,
      modelName: variableDeclaration.getName(),
    }));
  });

  output.debug('Creating Global Type Declaration');
  const globalDeclaration = createGlobalDeclaration(generatedGlobalTypingsFile);

  const typeAPINamespace = globalDeclaration.addModule({ isExported: true, name: 'TypeAPI' });
  const schemaInterface = typeAPINamespace.addInterface({
    name: 'Schema',
    isExported: true,
  });
  schemaInterface.addProperties(
    allModels.map(({ importName, modelName }) => ({
      name: modelName,
      type: `typeof ${importName}.${modelName}`,
    }))
  );

  output.debug('Cleaning Up');
  insertDisclaimer(generatedGlobalTypingsFile);
  await project.save();
  output.success('Schema Typings Generated');
};
