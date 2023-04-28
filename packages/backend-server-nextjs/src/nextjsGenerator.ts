import { logger, populateTemplate, generateFile, getGeneratedDir } from '@antribute/backend-core';
import type { Config, GeneratorFunc } from '@antribute/backend-core';
import { join } from 'path';

import { nextHandlerTemplate } from './nextjsTemplates';
import type { NextHandlerTemplate } from './nextjsTemplates';

const createHandler = async (config: Config) => {
  logger.debug('Generating Next.js API Handler', config);

  const useGraphql = config.graphql.platform !== 'none';
  const nextOutputDir = join(getGeneratedDir(config), 'nextjs');

  const content = populateTemplate<NextHandlerTemplate>(nextHandlerTemplate, {
    useGraphql,
  });

  await generateFile(
    { fileContent: content, fileName: 'index.ts', filePath: nextOutputDir },
    config
  );
};

const nextjsGenerator: GeneratorFunc = async (config) => {
  logger.info('Starting server generation for platform: Next.js', config);

  await createHandler(config);
  logger.info('Successfully generated server for platform: Next.js', config);
};

export default nextjsGenerator;
