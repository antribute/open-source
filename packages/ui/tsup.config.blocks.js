import baseConfig from '@antribute/config/tsup/tsup.config.base.js';
import glob from 'fast-glob';
import { defineConfig } from 'tsup';

const tsupConfig = defineConfig(async (options) => {
  const componentFiles = await glob('./src/blocks/*/index.ts');
  const configs = componentFiles.map((fileName) => ({
    ...baseConfig,
    dts: false,
    entry: [fileName],
    outDir: fileName.split('/index.ts')[0].replace('./src', 'dist'),
    watch: options.watch ?? false,
  }));
  return configs;
});

export default tsupConfig;
