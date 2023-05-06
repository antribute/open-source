import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    coverage: {
      all: true,
      enabled: true,
      exclude: ['index.ts', 'index.tsx', '**/*.stories.tsx', '**/*.test.ts', '**/*.test.tsx'],
      provider: 'c8',
      reporter: ['text', 'cobertura'],
      reportsDirectory: './coverage',
      src: 'src',
    },
    environment: 'happy-dom',
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
    globals: true,
    outputFile: 'test-results/results.xml',
    reporters: ['default', 'junit'],
  },
});
