import { execa } from 'execa';
import type { ExecaError } from 'execa';

import { debug as logDebug, error as logError } from './output';

export const executeCommand = async (
  command: string,
  args?: string[],
  { logOutput } = { logOutput: true }
) => {
  try {
    const { stdout, stderr } = await execa(command, args);

    if (logOutput) {
      stdout.split(/\r?\n/).forEach((line) => {
        if (!line.length) {
          return;
        }
        logDebug(line);
      });
      stderr.split(/\r?\n/).forEach((line) => {
        if (!line.length) {
          return;
        }
        logError(line);
      });
    }
  } catch (err) {
    // Execa will ALWAYS throw an ExecaError so we can safely cast this
    const parsedError = err as ExecaError;
    throw new Error(
      `Command "${command}" Failed with Error: ${parsedError.originalMessage ?? 'Unknown Error'}`
    );
  }
};
