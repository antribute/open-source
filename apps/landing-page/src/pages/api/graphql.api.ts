import { createNextAuthContext, createAuthScopes } from '@antribute/graphql-auth';
import type { AuthScopes, UserContext } from '@antribute/graphql-auth';
import createLogger from '@antribute/graphql-logger-axiom';
import { apiHandlerConfig, createHandler } from '@antribute/graphql-nextjs';
import { track } from '@antribute/tracking/server';
import SchemaBuilder from '@pothos/core';
import ScopeAuthPlugin from '@pothos/plugin-scope-auth';

import authProviders from 'authProviders';

// This is just a test schema to make sure the server works, this definitely will be removed
const MODELS = ['hello'] as const;

const builder = new SchemaBuilder<{ AuthScopes: AuthScopes<typeof MODELS>; Context: UserContext }>({
  authScopes: createAuthScopes(MODELS),
  plugins: [ScopeAuthPlugin],
});

builder.queryType({
  fields: (t) => ({
    hello: t.string({
      args: {
        name: t.arg.string(),
      },
      resolve: (_parent, { name }) => {
        track({ event: 'hello-query', token: process.env.MIXPANEL_TOKEN }, { name });
        return `Hello, ${name ?? 'World'}`;
      },
    }),
  }),
});

// From here on out is the code you'd actually put in your server
const schema = builder.toSchema();

const config = apiHandlerConfig;
export { config };

const handler = createHandler({
  context: createNextAuthContext({
    authOptions: { providers: authProviders },
    getUserPerms: () => [],
  }),
  logging: createLogger({
    axiomOrgId: process.env.AXIOM_ORG_ID ?? '',
    axiomToken: process.env.AXIOM_TOKEN ?? '',
    dataset: process.env.AXIOM_DATASET ?? '',
  }),
  schema,
});
export default handler;
