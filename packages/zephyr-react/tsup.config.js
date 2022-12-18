import { rawReactConfig } from '@antribute/config/tsup/tsup.config.react.js';
import { defineConfig } from 'tsup';

export default defineConfig(() => [
  {
    ...rawReactConfig,
    entry: ['./src/components/*/index.ts'],
    outDir: 'dist/components',
  },
  {
    ...rawReactConfig,
    bundle: false,
    entry: ['./src/index.ts'],
    outDir: 'dist',
  },
]);
