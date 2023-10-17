import { join } from 'path';
import { generateFile, getGeneratedDir, logger, populateTemplate } from '@antribute/backend-core';
import type { Config, GeneratorFunc } from '@antribute/backend-core';

import { fgaIndexTemplate } from './openFgaTemplates';
import type { FgaIndexTemplate } from './openFgaTemplates';

const generateFgaIndexTemplate = async (fgaDir: string, config: Config) => {
  logger.debug('Populating index for Permissions Adapter: OpenFGA', config);
  const modelContent = populateTemplate<FgaIndexTemplate>(fgaIndexTemplate, {});
  await generateFile({ fileContent: modelContent, fileName: 'index.ts', filePath: fgaDir }, config);
};

const outh0FgaGenerator: GeneratorFunc = async (config) => {
  logger.info('Starting permissions adapter generation for platform: OpenFGA', config);

  const generatedDir = getGeneratedDir(config);
  const fgaDir = join(generatedDir, 'openFga');
  logger.debug(`OpenFGA directory set to ${fgaDir}`, config);

  await generateFgaIndexTemplate(fgaDir, config);
  logger.info('Successfully generated permissions adapter for platform: OpenFGA', config);
};

export default outh0FgaGenerator;
