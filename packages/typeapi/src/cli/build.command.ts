import { createCommand } from '@antribute/typecli';

import { getConfig } from 'config';
import { generateSchemaTypings } from 'db';

const buildCommand = createCommand({
  name: 'build',
  description: 'Generates model typings for faster cold starts',
  args: {},
  handler: async () => {
    const config = await getConfig();
    await generateSchemaTypings(config);
  },
});

export default buildCommand;
