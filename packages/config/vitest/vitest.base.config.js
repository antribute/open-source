import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    coverage: {
      all: true,
      enabled: true,
      exclude: ['index.ts', '**/*.stories.tsx', '**/*.test.ts'],
      provider: 'c8',
      reporter: ['text', 'cobertura'],
      reportsDirectory: './coverage',
      src: 'src',
    },
    include: ['src/**/*.test.ts'],
    globals: true,
    outputFile: 'test-results/results.xml',
    reporters: ['default', 'junit'],
  },
});
