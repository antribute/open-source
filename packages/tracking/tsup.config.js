import { defineConfig } from 'tsup';

import { rawBaseConfig } from '@antribute/config/tsup/tsup.config.base.js';
import { rawReactConfig } from '@antribute/config/tsup/tsup.config.react.js';

export default defineConfig([
  { ...rawReactConfig, clean: false, entry: ['./src/client.ts'] },
  { ...rawBaseConfig, clean: false, entry: ['./src/server.ts'] },
]);
