import { defineConfig } from 'tsup';

import { rawBaseConfig } from './tsup.config.base.js';

export const rawReactConfig = {
  ...rawBaseConfig,
  external: ['react'],
};

export default defineConfig(rawReactConfig);
