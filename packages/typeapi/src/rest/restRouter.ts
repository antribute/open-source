import { output } from '@antribute/typecli';
import type { Hono } from 'hono';
import { get, snakeCase } from 'lodash-es';

import type { Config } from 'config';
import { type Db, type ModelConfig, createCrudOperations } from 'db';

export const createModelRestEndpoints = (
  config: Config,
  server: Hono,
  db: Db,
  schema: TypeAPI.Schema,
  modelName: keyof TypeAPI.Schema,
  modelConfig?: Partial<ModelConfig>
) => {
  // If REST is disabled for this model in the config, we'll do nothing
  if (typeof modelConfig?.rest === 'boolean' && modelConfig?.rest === false) {
    return;
  }

  let baseUrl = snakeCase(modelName as string);
  // If REST is an object, we'll override the default config
  if (typeof modelConfig?.rest === 'object') {
    baseUrl = modelConfig?.rest?.baseUrl || baseUrl;
  }

  // TODO: Lots of things for this function
  // 1. Per-endpoint function overrides
  // 2. Disabling endpoints
  // 3. Swagger generation (might not need to be in this func tho)
  // 4. Explore bulk endpoints

  const table = schema[modelName];
  // The ID field may or may not exist on a given table (we have checks to ensure the primary key
  // is actually valid in createCrudOperations), so we use Lodash to safely get that value
  const primaryKeyCol = get(table, 'id');
  const crudOperations = createCrudOperations(config, db, table, primaryKeyCol);

  const modelRootPath = `/${baseUrl}`;
  const modelPathIdParam = `${baseUrl}_id`;
  const modelChildPath = `/${baseUrl}s/:${modelPathIdParam}`;

  server.post(modelRootPath, async (c) => {
    const body = await c.req.json();
    const data = await crudOperations.createOne(body);
    return c.json({ data });
  });

  server.get(modelRootPath, async (c) => {
    const { cursor, pageSize = '10' } = c.req.query();
    const data = await crudOperations.readMany({
      pagination: { cursor, pageSize: Number.parseInt(pageSize, 10) },
    });
    return c.json(data);
  });

  server.get(modelChildPath, async (c) => {
    const id = c.req.param(modelPathIdParam as never);
    const data = await crudOperations.readOne(id);
    return c.json({ data });
  });

  server.post(modelChildPath, async (c) => {
    const id = c.req.param(modelPathIdParam as never);
    const body = await c.req.json();
    const data = await crudOperations.updateOne(id, body);
    return c.json({ data });
  });

  server.delete(modelChildPath, async (c) => {
    const id = c.req.param(modelPathIdParam as never);
    const data = await crudOperations.deleteOne(id);
    return c.json({ data });
  });
};

export const createRestApi = async (
  config: Config,
  server: Hono,
  db: Db,
  schema: TypeAPI.Schema
) => {
  if (!config.rest.enabled) {
    output.debug('REST API Disabled in Config, Skipping Creation');
    return;
  }
  Object.keys(schema).forEach((modelName) => {
    output.debug(`  Creating REST Endpoints for model "${modelName}"`);
    createModelRestEndpoints(config, server, db, schema, modelName as keyof TypeAPI.Schema);
    output.debug(`  Created REST Endpoints for model "${modelName}"`);
  });
  output.debug('REST API Creation Complete');
};
