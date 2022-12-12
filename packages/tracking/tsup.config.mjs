import { defineConfig } from 'tsup';

import { rawBaseConfig } from '@antribute/config/tsup/tsup.config.base.mjs';
import { rawReactConfig } from '@antribute/config/tsup/tsup.config.react.mjs';

export default defineConfig([
  { ...rawReactConfig, entry: ['./src/client.ts'] },
  { ...rawBaseConfig, entry: ['./src/server.ts'] },
]);
