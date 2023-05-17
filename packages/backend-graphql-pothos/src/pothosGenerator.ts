import {
  logger,
  populateTemplate,
  generateFile,
  getServerDir,
  getGeneratedDir,
} from '@antribute/backend-core';
import type { Config, GeneratorFunc } from '@antribute/backend-core';
import { execa } from 'execa';
import glob from 'fast-glob';
import { join, resolve } from 'path';
import { fileURLToPath } from 'url';

import {
  pothosBuilderTemplate,
  pothosGenerateSchemaTemplate,
  pothosIndexTemplate,
  pothosSchemaTemplate,
} from './pothosTemplates';
import type {
  PothosBuilderTemplate,
  PothosGenerateSchemaTemplate,
  PothosIndexTemplate,
  PothosSchemaTemplate,
} from './pothosTemplates';

const dirname = fileURLToPath(new URL('.', import.meta.url));

const prismaAdditionalImports = `\nimport { prisma } from '../db';
import type PrismaTypes from './types';`;

const createBuilder = async (pothosOutputDir: string, config: Config) => {
  logger.debug('Generating Pothos builder', config);

  let additionalImports = '';
  let body = '';
  let plugins: PothosBuilderTemplate['plugins'] = [];
  let typings: PothosBuilderTemplate['typings'] = [];

  // First off, let's check and see if the server is using any form of auth
  if (config.auth.platform !== 'none') {
    logger.debug('Adding Scope Auth to Pothos Config', config);
    plugins = [...plugins, { name: 'ScopeAuthPlugin', from: '@pothos/plugin-scope-auth' }];
    typings = [...typings, { name: 'Context', value: '{ loggedIn: boolean, userId: string }' }];

    // From there, we'll add any applicable FGA code
    if (config.permissions.platform === 'none') {
      logger.debug('Populating Pothos Config for Permissions: None', config);
      body += 'authScopes: (context) => ({ loggedIn: context.loggedIn }),';
      typings = [...typings, { name: 'AuthScopes', value: '{ loggedIn: boolean }' }];
    }

    if (config.permissions.platform === '@antribute/backend-perms-auth0-fga') {
      logger.debug('Populating Pothos Config for Permissions: Auth0 FGA', config);

      additionalImports += "import { checkPermissions, PermissionsParams } from '../auth0Fga';";
      body +=
        'authScopes: (context) => ({ loggedIn: context.loggedIn, hasPermissions: (perm) => checkPermissions({ ...perm, userId: context.userId }) }),';
      typings = [
        ...typings,
        {
          name: 'AuthScopes',
          value: "{ hasPermissions: Omit<PermissionsParams, 'userId'>, loggedIn: boolean }",
        },
      ];
    }

    if (config.permissions.platform === '@antribute/backend-perms-permify') {
      logger.debug('Populating Pothos Config for Permissions: Permify', config);

      additionalImports += "import { checkPermissions, PermissionsParams } from '../permify';";
      body +=
        'authScopes: (context) => ({ loggedIn: context.loggedIn, hasPermissions: (perm) => checkPermissions({ ...perm, userId: context.userId }) }),';
      typings = [
        ...typings,
        {
          name: 'AuthScopes',
          value: "{ hasPermissions: Omit<PermissionsParams, 'userId'>, loggedIn: boolean }",
        },
      ];
    }
  }

  if (config.orm.platform === '@antribute/backend-orm-prisma') {
    logger.debug('Populating Pothos Config for ORM: Prisma', config);
    additionalImports += prismaAdditionalImports;
    body += '\nprisma: { client: prisma },';
    plugins = [
      ...plugins,
      { name: 'PrismaPlugin', from: '@pothos/plugin-prisma' },
      { name: 'PrismaUtilPlugin', from: '@pothos/plugin-prisma-utils' },
    ];
    typings = [...typings, { name: 'PrismaTypes', value: 'PrismaTypes' }];
  }

  logger.debug('Populating Pothos builder', config);
  const content = populateTemplate<PothosBuilderTemplate>(pothosBuilderTemplate, {
    additionalImports,
    body,
    plugins,
    typings,
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

const generateSchema = async (generatedDir: string, config: Config) => {
  logger.debug('Generating Complete GraphQL Schema', config);

  logger.debug('Populating Generator Template', config);
  const schemaPath = join(generatedDir, 'schema.graphql');
  const content = populateTemplate<PothosGenerateSchemaTemplate>(pothosGenerateSchemaTemplate, {
    schemaPath,
  });
  await generateFile(
    { fileContent: content, fileName: 'generateSchema.ts', filePath: join(generatedDir, 'pothos') },
    config
  );

  logger.debug('Running Generation Script', config);
  const tsxBin = resolve(dirname, '..', 'node_modules', '.bin', 'tsx');
  await execa(tsxBin, [resolve(generatedDir, 'pothos', 'generateSchema.ts')]);
};

const stitchSchema = async (generatedDir: string, config: Config) => {
  logger.debug('Stitching GraphQL Schema', config);

  const serverDir = getServerDir(config);
  const pothosGlob = join(serverDir, '**', '*.{mutations,objects,queries}.ts');
  logger.debug(`Pothos schema search glob set to ${pothosGlob}`, config);

  const parsedServerDir = config.dir.includes('./') ? config.dir.split('./')[1]! : config.dir;
  const modules = (await glob(pothosGlob))
    .map((part) => {
      logger.debug(`Pothos schema part found at ${part}`, config);
      const relativePath = part.split(parsedServerDir)[1] ?? '';
      return relativePath.split('.ts')[0] ?? '';
    })
    .filter((path) => !!path.length);

  logger.debug('Populating Pothos schema', config);
  const content = populateTemplate<PothosSchemaTemplate>(pothosSchemaTemplate, {
    modules,
  });
  await generateFile(
    { fileContent: content, fileName: 'graphqlSchema.ts', filePath: generatedDir },
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
  await generateSchema(generatedDir, config);
  logger.info('Successfully generated GraphQL Schema for platform: Pothos', config);
};

export default prismaGenerator;
