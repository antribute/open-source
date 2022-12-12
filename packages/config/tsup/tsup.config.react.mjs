import { defineConfig } from 'tsup';

import { rawBaseConfig } from './tsup.config.base.mjs';

export const rawReactConfig = {
  ...rawBaseConfig,
  entry: ['./src/index.tsx'],
  external: ['react'],
};

export default defineConfig(rawReactConfig);
