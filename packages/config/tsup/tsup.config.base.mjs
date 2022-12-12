import { defineConfig } from 'tsup';

export const rawBaseConfig = {
  clean: true,
  dts: true,
  format: ['cjs', 'esm'],
  sourcemap: true,
  splitting: true,
  treeshake: true,
};

export default defineConfig();
