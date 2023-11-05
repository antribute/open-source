import { join } from 'path';
import { fileURLToPath } from 'url';

import {
  defineConfig as createDefineConfig,
  loadAndValidateConfig,
} from '@antribute/config-loader';
import { Type } from '@sinclair/typebox';
import type { Static } from '@sinclair/typebox';

const dirname = fileURLToPath(new URL('.', import.meta.url));

export enum DatabaseEngine {
  mysql = 'mysql',
  postgresql = 'postgresql',
  sqlite = 'sqlite',
}

export enum PaginationConfiguration {
  cursor = 'cursor',
  disabled = 'disabled',
  limitOffset = 'limitOffset',
}

export const validationSchema = Type.Object({
  database: Type.Object({
    connectionString: Type.String({ default: process.env.DB_URL ?? '' }),
    enabled: Type.Boolean({ default: true }),
    engine: Type.Enum(DatabaseEngine, { default: DatabaseEngine.postgresql }),
    pagination: Type.Enum(PaginationConfiguration, { default: PaginationConfiguration.cursor }),
  }),
  graphql: Type.Object({
    enabled: Type.Boolean({ default: true }),
    endpoint: Type.String({ default: '/graphql' }),
  }),
  healthCheck: Type.Object({
    enabled: Type.Boolean({ default: true }),
    endpoint: Type.String({ default: '/health' }),
  }),
  rest: Type.Object({
    enabled: Type.Boolean({ default: true }),
    generateOpenApiSpec: Type.Boolean({ default: true }),
  }),
  server: Type.Object({
    generatedDir: Type.String({ default: join(dirname, 'generated') }),
    port: Type.Number({ default: 8000 }),
    rootDir: Type.String({ default: join('src', 'server') }),
  }),
});

export type Config = Static<typeof validationSchema>;

export const getConfig = (overrideConfigPath?: string) =>
  loadAndValidateConfig<Config>({
    fileNames: ['.typeapirc.ts', '.typeapirc.js', '.typeapirc.cjs', '.typeapirc.mjs'],
    overrideConfigPath,
    validationSchema,
  });

export const defineConfig = createDefineConfig<Config>;
