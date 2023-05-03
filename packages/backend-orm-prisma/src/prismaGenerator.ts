import {
  logger,
  populateTemplate,
  generateFile,
  getServerDir,
  getGeneratedDir,
} from '@antribute/backend-core';
import type { Config, GeneratorFunc } from '@antribute/backend-core';
import { execa } from 'execa';
import { appendFile } from 'fs/promises';
import { join, resolve } from 'path';
import rimraf from 'rimraf';
import { fileURLToPath } from 'url';

import {
  additionalSchemaContentTemplate,
  pothosGeneratorTemplate,
  prismaAccessorTemplate,
} from './prismaTemplates';
import type {
  AdditionalSchemaContentTemplate,
  PothosGeneratorTemplate,
  PrismaAccessorTemplate,
} from './prismaTemplates';

const dirname = fileURLToPath(new URL('.', import.meta.url));

const appendSchemaConfig = async (generatedDir: string, config: Config) => {
  logger.debug('Appending schema configuration to generated Prisma schema', config);

  const schemaOutputPath = resolve(process.cwd(), config.orm.dir, 'generatedSchema.prisma');

  let pothosGenerator = '';
  if (config.graphql.platform === '@antribute/backend-graphql-pothos') {
    logger.debug('Adding additional Prisma configuration for GraphQL platform: Pothos', config);

    const pothosOutputFile = join(generatedDir, 'pothos', 'types.ts');
    pothosGenerator = populateTemplate<PothosGeneratorTemplate>(pothosGeneratorTemplate, {
      prismaOutputDir: join('..', 'prisma'),
      pothosOutputFile,
    });
  }

  logger.debug('Populating schema configuration', config);
  const content = populateTemplate<AdditionalSchemaContentTemplate>(
    additionalSchemaContentTemplate,
    // TODO: Post-mvp let's make this configurable
    {
      dbType: 'postgres',
      dbUrl: 'env("DATABASE_URL")',
      pothosGenerator,
      prismaOutputDir: join(generatedDir, 'prisma'),
    }
  );

  logger.debug(`Writing to Prisma schema at ${schemaOutputPath}`, config);
  await appendFile(schemaOutputPath, content);
};

const createAccessor = async (generatedDir: string, config: Config) => {
  logger.debug('Generating Prisma accessor', config);

  const utilsContent = populateTemplate<PrismaAccessorTemplate>(prismaAccessorTemplate, {
    logLevel: config.logLevel === 'debug' ? 'query' : config.logLevel,
  });
  await generateFile(
    { fileContent: utilsContent, fileName: 'index.ts', filePath: join(generatedDir, 'db') },
    config
  );
};

const runPrismaGenerate = async (config: Config) => {
  logger.debug('Running prisma generate', config);

  const schemaOutputPath = resolve(process.cwd(), config.orm.dir, 'generatedSchema.prisma');

  const prismaBin = resolve(process.cwd(), 'node_modules', '.bin', 'prisma');
  logger.debug(`Prisma script path set to ${prismaBin}`, config);
  await execa(prismaBin, ['generate', '--schema', schemaOutputPath]);
};

const stitchSchemas = async (serverDir: string, config: Config) => {
  logger.debug('Using prisma-import to stitch schemas', config);

  // Due to the way we handle Prisma generation, we ignore any files named schema.prisma. This
  // should be noted in the docs and probably fixed in the future
  const schemaGlob = join(serverDir, '**', '!(schema).prisma');
  logger.debug(`Prisma schema search glob set to ${schemaGlob}`, config);

  const schemaOutputPath = resolve(process.cwd(), config.orm.dir, 'generatedSchema.prisma');
  logger.debug(`Generated Prisma schema path set to ${schemaOutputPath}`, config);

  logger.debug('Deleting current generated Prisma schema if exists', config);
  await rimraf(schemaOutputPath);

  const prismaImportBin = resolve(dirname, '..', 'node_modules', '.bin', 'prisma-import');
  logger.debug(`Prisma Import script path set to ${prismaImportBin}`, config);

  logger.debug('Stitching schemas', config);
  await execa(prismaImportBin, ['--schemas', schemaGlob, '--output', schemaOutputPath, '--force']);
};

const prismaGenerator: GeneratorFunc = async (config) => {
  logger.info('Starting ORM generation for platform: Prisma', config);

  const serverDir = getServerDir(config);
  const generatedDir = getGeneratedDir(config);

  await stitchSchemas(serverDir, config);
  await appendSchemaConfig(generatedDir, config);
  await createAccessor(generatedDir, config);
  await runPrismaGenerate(config);
  logger.info('Successfully generated ORM for platform: Prisma', config);
};

export default prismaGenerator;
