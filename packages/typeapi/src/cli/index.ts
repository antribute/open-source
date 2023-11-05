import { createProgram } from '@antribute/typecli';

import build from './build.command';
import migrate from './migrate.command';
import makemigrations from './makemigrations.command';
import start from './start.command';

createProgram({
  name: 'typeapi',
  description: 'TODO: Get description from package json',
  version: 'TODO: get version from package.json',
  cmds: {
    build,
    migrate,
    makemigrations,
    start,
  },
});
