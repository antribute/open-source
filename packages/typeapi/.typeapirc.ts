import { defineConfig } from './src';

const config = defineConfig({
  database: {
    connectionString: 'postgresql://postgres:password@localhost:5432/typeapi',
  },
  server: { rootDir: 'example' },
});
export default config;
