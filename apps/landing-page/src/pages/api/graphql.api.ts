import { apiHandlerConfig, createHandler } from '@antribute/graphql-nextjs';
import SchemaBuilder from '@pothos/core';

// This is just a test schema to make sure the server works, this definitely will be removed
const builder = new SchemaBuilder({});

builder.queryType({
  fields: (t) => ({
    hello: t.string({
      args: {
        name: t.arg.string(),
      },
      resolve: (_parent, { name }) => `Hello, ${name ?? 'World'}`,
    }),
  }),
});

const schema = builder.toSchema();

const config = { ...apiHandlerConfig };
export { config };

const handler = createHandler({
  schema,
});
export default handler;
