import { defineConfig } from 'tsup';

export const rawBaseConfig = {
  clean: true,
  dts: true,
  entry: ['./src/index.ts'],
  format: ['cjs', 'esm'],
  sourcemap: true,
  splitting: true,
  treeshake: true,
};

export default defineConfig(rawBaseConfig);
