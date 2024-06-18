import type { TSchema } from '@sinclair/typebox';
import { Route } from '../../route';

export class Query<
  N extends string,
  R extends TSchema,
  B extends TSchema | undefined = undefined
> extends Route<'post', '/graphql', R, B, undefined, undefined> {
  public graphql: { name: string; type: 'query' };
  constructor(
    name: N,
    config: { res: R; input?: B },
    resolver: TypeApi.Resolver<'/graphql', R, B, undefined, undefined>
  ) {
    super('post', '/graphql', { responseSchema: config.res, bodySchema: config.input }, resolver);
    this.graphql = { name, type: 'query' };
  }
}
