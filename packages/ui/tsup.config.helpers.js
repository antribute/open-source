import baseConfig from '@antribute/config/tsup/tsup.config.base.js';

export default {
  ...baseConfig,
  clean: false,
  dts: false,
  entry: ['./src/helpers.ts'],
  external: ['react'],
  outDir: 'dist',
};
