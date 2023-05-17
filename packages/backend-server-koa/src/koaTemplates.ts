export interface KoaHandlerTemplate {
  authContext: string;
  authHandler: string;
  authImports: { name: string; from: string }[];
  useGraphql: boolean;
}
export const koaHandlerTemplate = `//
// Autogenerated by \`@antribute/backend\`
// Any modifications will be overwritten on subsequent runs.
//

import Koa from 'koa';
{{#if useGraphql}}
import { useDisableIntrospection } from '@graphql-yoga/plugin-disable-introspection'
import { createYoga } from 'graphql-yoga'
import schema from '../graphqlSchema';
{{/if}}
{{#each authImports}}import {{name}} from '{{from}}';\n{{/each}}

const app = new Koa();

{{#if useGraphql}}
const yoga = createYoga({
  context: async () => {
    {{authContext}}
  },
  graphiql: process.env.NODE_ENV !== 'production',
  plugins: process.env.NODE_ENV === 'production' ? [useDisableIntrospection()] : [],
  graphqlEndpoint: '/api/graphql',
  schema,
});
{{/if}}

app.use(async (ctx) => {
  {{#if useGraphql}}
  if (ctx.url.includes('/api/graphql')) {
    const res = await yoga.handleNodeRequest(ctx.req, ctx);
    ctx.status = res.status;
    res.headers.forEach((value, key) => {
      ctx.append(key, value);
    });
    ctx.body = res.body;
    return;
  }
  ctx.status = 404;
  ctx.body = { message: 'Not Found' };
  {{/if}}
});

export default app;
`;
