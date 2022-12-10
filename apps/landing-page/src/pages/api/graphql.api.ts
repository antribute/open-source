import { createAuthContext, createAuthScopes } from '@antribute/graphql-auth0';
import type { AuthScopes, UserContext } from '@antribute/graphql-auth0';
import { apiHandlerConfig, createHandler } from '@antribute/graphql-nextjs';
import SchemaBuilder from '@pothos/core';
import ScopeAuthPlugin from '@pothos/plugin-scope-auth';

// This is just a test schema to make sure the server works, this definitely will be removed
const MODELS = ['hello'] as const;

const builder = new SchemaBuilder<{ AuthScopes: AuthScopes<typeof MODELS>; Context: UserContext }>({
  authScopes: createAuthScopes<typeof MODELS>(MODELS),
  plugins: [ScopeAuthPlugin],
});

builder.queryType({
  fields: (t) => ({
    hello: t.string({
      args: {
        name: t.arg.string(),
      },
      authScopes: {
        'hello:readOwned': true,
      },
      resolve: (_parent, { name }) => `Hello, ${name ?? 'World'}`,
    }),
  }),
});

// From here on out is the code you'd actually put in your server
const schema = builder.toSchema();

const config = apiHandlerConfig;
export { config };

const handler = createHandler({
  context: createAuthContext({
    auth0ClientId: process.env.AUTH0_CLIENT_ID ?? '',
    auth0ClientSecret: process.env.AUTH0_CLIENT_SECRET ?? '',
    auth0Domain: process.env.AUTH0_DOMAIN ?? '',
    jwksKeyId: process.env.JWKS_KEY_ID,
  }),
  schema,
});
export default handler;
