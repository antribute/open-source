import { logger } from '@antribute/backend-core';
import type { GeneratorFunc } from '@antribute/backend-core';

const clerkGenerator: GeneratorFunc = async (config) => {
  logger.info('Starting authorization generation for platform: Clerk', config);

  // This is a stub script: right now Clerk doesn't require any additional generation on its own
  logger.info('Successfully generated authorization for platform: Clerk', config);
};

export default clerkGenerator;
