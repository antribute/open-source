import { command, run, string, positional, option, optional, oneOf } from 'cmd-ts';

import generate from 'commands/generate';
import logger from 'utils/logger';

const commands = {
  generate,
};

const cmd = command({
  name: 'antribute-backend',
  description: "A CLI that does a lot of the Antribute Backend's heavy lifting and code generation",
  version: '0.1.0',
  args: {
    command: positional({ type: oneOf(Object.keys(commands)), displayName: 'command' }),
    configPath: option({
      description:
        'The path and file name of the Antribute Backend configuration file relative to your cwd',
      long: 'config',
      short: 'c',
      type: optional(string),
    }),
  },
  handler: async ({ command, configPath }) => {
    switch (command) {
      case 'generate':
        await generate(configPath);
        break;
      default:
        throw new Error(`Unknown command ${command}`);
    }
  },
});

run(cmd, process.argv.slice(2)).catch((err: Error) => {
  logger.error(`An error occurred while running the Antribute Backend CLI: ${err.message}`);
  process.exit(1);
});
