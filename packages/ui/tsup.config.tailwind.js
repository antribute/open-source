import baseConfig from '@antribute/config/tsup/tsup.config.base.js';

export default {
  ...baseConfig,
  clean: false,
  dts: false,
  entry: ['./src/config/tailwindConfig.ts'],
  external: ['react'],
  outDir: 'dist',
};
