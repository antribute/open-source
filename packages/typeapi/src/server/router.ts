import type { Hono } from 'hono';

import type { Config } from 'config';
import { createCombinedSchema, createDbConnection } from 'db';
import { createRestApi } from 'rest';
import { createHealthCheckEndpoint } from './healthCheck';

export const buildRouter = async (config: Config, server: Hono) => {
  createHealthCheckEndpoint(config, server);
  const combinedSchema = await createCombinedSchema(config);
  const db = createDbConnection(config, combinedSchema);
  await createRestApi(config, server, db, combinedSchema);
};
