import { createCommand } from '@antribute/typecli';

import { getConfig } from 'config';
import { buildRouter, createServer, startServer } from 'server';

const buildCommand = createCommand({
  name: 'start',
  description: 'Starts your TypeAPI Server',
  args: {},
  handler: async () => {
    const config = await getConfig();
    const server = createServer();
    await buildRouter(config, server);
    await startServer(config, server);
  },
});

export default buildCommand;
