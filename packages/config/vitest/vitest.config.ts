import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    coverage: {
      provider: 'c8',
      reporter: ['text', 'cobertura'],
      reportsDirectory: './coverage',
    },
    globals: true,
    environment: 'happy-dom',
  },
});
