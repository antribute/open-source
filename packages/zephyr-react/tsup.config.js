import baseConfig from '@antribute/config/tsup/tsup.config.base.js';

export default {
  ...baseConfig,
  bundle: false,
  clean: false,
  entry: ['./src/index.ts'],
  external: ['react'],
};
