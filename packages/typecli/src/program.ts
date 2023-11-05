import { run, subcommands } from 'cmd-ts';

import { parseUnknownError } from './errorHandling';
import { error as logError } from './output';

export type CreateProgramOptions = Parameters<typeof subcommands>[0];

/**
 * Creates and runs a new CLI program that requires the user to enter a single command form a list
 * of provided commands or shows a help screen when the `--help` flag is provided
 *
 * @example
 * ```typescript
 * createProgram({
 *   name: 'my-cli',
 *   cmds: {
 *     'some-command': someCommand,
 *     'another-command': anotherCommand
 *   },
 * });
 * ```
 */
export const createProgram = async (options: CreateProgramOptions): Promise<void> => {
  // Bun has builtin dotenv support whereas Node.js doesn't. If TypeCLI detects that it's running
  // on Node it'll conditionally import dotenv. This is a nice DX feature for things such as
  // allowing users to easily set LOG_LEVEL or any other required env vars for the CLI that's
  // consuming TypeAPI

  if (typeof Bun === 'undefined') {
    await import('dotenv/config');
  }
  const cli = subcommands(options);

  try {
    await run(cli, process.argv.slice(2));
    process.exit(0);
  } catch (err) {
    logError(parseUnknownError(err));
    process.exit(1);
  }
};
