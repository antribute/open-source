import baseConfig from '@antribute/config/tsup/tsup.config.base.js';

export default [
  {
    ...baseConfig,
    clean: false,
    dts: false,
    entry: ['./src/cli.ts'],
    outDir: 'dist',
  },
  {
    ...baseConfig,
    clean: false,
    entry: ['./src/index.ts'],
    outDir: 'dist',
  },
];
