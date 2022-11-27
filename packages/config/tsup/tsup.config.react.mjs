import { defineConfig } from 'tsup';

import baseConfig from './tsup.config.base.mjs';

export default defineConfig({
  ...baseConfig,
  entry: ['./src/index.tsx'],
  external: ['react'],
});
