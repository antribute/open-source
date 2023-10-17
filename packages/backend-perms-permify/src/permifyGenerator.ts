import { join } from 'path';
import { generateFile, getGeneratedDir, logger, populateTemplate } from '@antribute/backend-core';
import type { Config, GeneratorFunc } from '@antribute/backend-core';

import { permifyIndexTemplate } from './permifyTemplates';
import type { PermifyIndexTemplate } from './permifyTemplates';

const generateFgaIndexTemplate = async (fgaDir: string, config: Config) => {
  logger.debug('Populating index for Permissions Adapter: Permify', config);
  const modelContent = populateTemplate<PermifyIndexTemplate>(permifyIndexTemplate, {});
  await generateFile({ fileContent: modelContent, fileName: 'index.ts', filePath: fgaDir }, config);
};

const permifyGenerator: GeneratorFunc = async (config) => {
  logger.info('Starting permissions adapter generation for platform: Permify', config);

  const generatedDir = getGeneratedDir(config);
  const permifyDir = join(generatedDir, 'permify');
  logger.debug(`Permify directory set to ${permifyDir}`, config);

  await generateFgaIndexTemplate(permifyDir, config);
  logger.info('Successfully generated permissions adapter for platform: Permify', config);
};

export default permifyGenerator;
