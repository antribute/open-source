import { access } from 'fs/promises';
import { join } from 'path';
import { generateFile, getServerDir, logger, populateTemplate } from '@antribute/backend-core';
import type { Config, GeneratorFunc } from '@antribute/backend-core';

import {
  ormNoneUtilsTemplate,
  ormPrismaModelTemplate,
  ormPrismaUtilsTemplate,
} from './nextAuthTemplates';
import type {
  OrmNoneUtilsTemplate,
  OrmPrismaModelTemplate,
  OrmPrismaUtilsTemplate,
} from './nextAuthTemplates';

const generateOrmNoneTemplates = async (authModuleDir: string, config: Config) => {
  if (config.orm.platform !== 'none') {
    return;
  }

  logger.debug('Populating auth model population skipped, ORM platform is set to "none"', config);

  logger.debug('Populating auth utils for ORM: none', config);
  const utilsContent = populateTemplate<OrmNoneUtilsTemplate>(ormNoneUtilsTemplate, {});
  await generateFile(
    { fileContent: utilsContent, fileName: 'auth.utils.ts', filePath: authModuleDir },
    config
  );
};

const generateOrmPrismaTemplates = async (authModuleDir: string, config: Config) => {
  if (config.orm.platform !== '@antribute/backend-orm-prisma') {
    return;
  }

  logger.debug('Populating auth model for ORM: Prisma', config);
  const modelContent = populateTemplate<OrmPrismaModelTemplate>(ormPrismaModelTemplate, {});
  await generateFile(
    { fileContent: modelContent, fileName: 'auth.prisma', filePath: authModuleDir },
    config
  );

  logger.debug('Populating auth utils for ORM: Prisma', config);
  const utilsContent = populateTemplate<OrmPrismaUtilsTemplate>(ormPrismaUtilsTemplate, {});
  await generateFile(
    { fileContent: utilsContent, fileName: 'auth.utils.ts', filePath: authModuleDir },
    config
  );
};

const nextAuthGenerator: GeneratorFunc = async (config) => {
  logger.info('Starting authorization generation for platform: NextAuth.js', config);

  const serverDir = getServerDir(config);
  const authModuleDir = join(serverDir, 'auth');
  logger.debug(`Auth module directory set to ${authModuleDir}`, config);

  logger.debug('Checking if auth module exists', config);
  try {
    await access(authModuleDir);
    logger.debug('Auth module has already been generated, skipping', config);
    return;
  } catch (err) {
    // Do nothing, if the auth dir doesn't exist we can continue generation
  }

  await generateOrmNoneTemplates(authModuleDir, config);
  await generateOrmPrismaTemplates(authModuleDir, config);
  logger.info('Successfully generated authorization for platform: NextAuth.js', config);
};

export default nextAuthGenerator;
