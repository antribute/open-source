import { join } from 'path';
import { generateFile, getGeneratedDir, logger, populateTemplate } from '@antribute/backend-core';
import type { Config, GeneratorFunc } from '@antribute/backend-core';

import { fgaIndexTemplate } from './auth0FgaTemplates';
import type { FgaIndexTemplate } from './auth0FgaTemplates';

const generateFgaIndexTemplate = async (fgaDir: string, config: Config) => {
  logger.debug('Populating index for Permissions Adapter: Auth0 FGA', config);
  const modelContent = populateTemplate<FgaIndexTemplate>(fgaIndexTemplate, {});
  await generateFile({ fileContent: modelContent, fileName: 'index.ts', filePath: fgaDir }, config);
};

const outh0FgaGenerator: GeneratorFunc = async (config) => {
  logger.info('Starting permissions adapter generation for platform: Auth0 FGA', config);

  const generatedDir = getGeneratedDir(config);
  const fgaDir = join(generatedDir, 'auth0Fga');
  logger.debug(`Auth0 FGA directory set to ${fgaDir}`, config);

  await generateFgaIndexTemplate(fgaDir, config);
  logger.info('Successfully generated permissions adapter for platform: Auth0 FGA', config);
};

export default outh0FgaGenerator;
