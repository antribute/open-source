import {
  logger,
  populateTemplate,
  generateFile,
  getServerDir,
  getGeneratedDir,
} from '@antribute/backend-core';
import type { Config, GeneratorFunc } from '@antribute/backend-core';
import glob from 'fast-glob';
import { join } from 'path';

import {
  pothosBuilderTemplate,
  pothosIndexTemplate,
  pothosSchemaTemplate,
} from './pothosTemplates';
import type {
  PothosBuilderTemplate,
  PothosIndexTemplate,
  PothosSchemaTemplate,
} from './pothosTemplates';

const prismaAdditionalImports = `import { prisma } from '../db';
import type PrismaTypes from './types';\n`;

const createBuilder = async (pothosOutputDir: string, config: Config) => {
  logger.debug('Generating Pothos builder', config);

  let additionalImports = '';
  let ormBody = '';
  let ormTypings = '';
  let ormPlugins: PothosBuilderTemplate['ormPlugins'] = [];

  if (config.orm.platform === '@antribute/backend-orm-prisma') {
    logger.debug('Populating Pothos Config for ORM: Prisma', config);
    additionalImports += prismaAdditionalImports;
    ormBody += 'prisma: { client: prisma },\n';
    ormPlugins = [
      ...ormPlugins,
      { name: 'PrismaPlugin', from: '@pothos/plugin-prisma' },
      { name: 'PrismaUtilPlugin', from: '@pothos/plugin-prisma-utils' },
    ];
    ormTypings += 'PrismaTypes: PrismaTypes;\n';
  }

  logger.debug('Populating Pothos builder', config);
  const content = populateTemplate<PothosBuilderTemplate>(pothosBuilderTemplate, {
    additionalImports,
    ormBody,
    ormPlugins,
    ormTypings,
  });

  await generateFile(
    { fileContent: content, fileName: 'builder.ts', filePath: pothosOutputDir },
    config
  );
};

const createIndex = async (pothosOutputDir: string, config: Config) => {
  logger.debug('Generating Pothos index', config);

  logger.debug('Populating Pothos index', config);
  const content = populateTemplate<PothosIndexTemplate>(pothosIndexTemplate, {
    usePrisma: config.orm.platform === '@antribute/backend-orm-prisma',
  });

  await generateFile(
    { fileContent: content, fileName: 'index.ts', filePath: pothosOutputDir },
    config
  );
};

const stitchSchema = async (pothosOutputDir: string, config: Config) => {
  logger.debug('Stitching GraphQL Schema', config);

  const serverDir = getServerDir(config);
  const pothosGlob = join(serverDir, '**', '*.{mutations,objects,queries}.ts');
  logger.debug(`Pothos schema search glob set to ${pothosGlob}`, config);

  const parsedServerDir = config.server.dir.includes('./')
    ? config.server.dir.split('./')[1]!
    : config.server.dir;
  const modules = (await glob(pothosGlob))
    .map((part) => {
      logger.debug(`Pothos schema part found at ${part}`, config);
      const relativePath = part.split(parsedServerDir)[1] ?? '';
      return relativePath.split('.ts')[0] ?? '';
    })
    .filter((path) => !!path.length);

  logger.debug('Populating Pothos schema', config);
  const content = populateTemplate<PothosSchemaTemplate>(pothosSchemaTemplate, { modules });
  await generateFile(
    { fileContent: content, fileName: 'graphqlSchema.ts', filePath: pothosOutputDir },
    config
  );
};

const prismaGenerator: GeneratorFunc = async (config) => {
  logger.info('Starting GraphQL Schema generation for platform: Pothos', config);

  const generatedDir = getGeneratedDir(config);
  const pothosOutputDir = join(generatedDir, 'pothos');

  await createBuilder(pothosOutputDir, config);
  await stitchSchema(generatedDir, config);
  await createIndex(pothosOutputDir, config);
  logger.info('Successfully generated GraphQL Schema for platform: Pothos', config);
};

export default prismaGenerator;
