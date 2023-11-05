import { command } from 'cmd-ts';

import { parseUnknownError } from './errorHandling';
import { error as logError } from './output';

export type CreateCommandOptions = Parameters<typeof command>[0];

export const createCommand = ({ handler, ...options }: CreateCommandOptions) =>
  command({
    ...options,
    handler: async (args) => {
      try {
        await handler(args);
        process.exit(0);
      } catch (err) {
        logError(parseUnknownError(err));
        process.exit(1);
      }
    },
  });
