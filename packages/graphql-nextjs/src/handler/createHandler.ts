import { createYoga } from 'graphql-yoga';
import type { YogaServerOptions } from 'graphql-yoga';
import type { NextApiRequest, NextApiResponse } from 'next';

export interface ServerContext {
  req: NextApiRequest;
  res: NextApiResponse;
}

// As a rule of thumb, we don't allow "any" to be used at Antribute, however we're going to make an
// exception for user context as we want this to be modular and work with any auth provider
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type BaseUserContext = Record<string, any>;

function createHandler<UserContext extends BaseUserContext>(
  params: YogaServerOptions<ServerContext, UserContext>
) {
  return createYoga<ServerContext, UserContext>({
    graphqlEndpoint: '/api/graphql',
    ...params,
  });
}

export default createHandler;
