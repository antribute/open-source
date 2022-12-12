import { defineConfig } from 'tsup';

import { rawBaseConfig } from './tsup.config.base.mjs';

export const rawReactConfig = {
  ...rawBaseConfig,
  external: ['react'],
};

export default defineConfig(rawReactConfig);
