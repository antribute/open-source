import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    coverage: {
      all: true,
      enabled: true,
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      provider: 'c8',
      reporter: ['text', 'cobertura'],
      reportsDirectory: './coverage',
    },
    environment: 'happy-dom',
    globals: true,
    outputFile: 'test-results/results.xml',
    reporters: ['default', 'junit'],
  },
});
