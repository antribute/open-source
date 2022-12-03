import { createYoga } from 'graphql-yoga';
import type { YogaServerOptions } from 'graphql-yoga';
import type { NextApiRequest, NextApiResponse } from 'next';

export type CreateHandlerParams<UserContext> = YogaServerOptions<
  { req: NextApiRequest; res: NextApiResponse },
  UserContext
>;

function createHandler<UserContext extends Record<string, unknown>>(
  params: CreateHandlerParams<UserContext>
) {
  return createYoga<{ req: NextApiRequest; res: NextApiResponse }, UserContext>({
    graphqlEndpoint: '/api/graphql',
    ...params,
  });
}

export default createHandler;
