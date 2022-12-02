import { createYoga } from 'graphql-yoga';
import type { YogaServerOptions } from 'graphql-yoga';
import type { NextApiRequest, NextApiResponse } from 'next';

function createServer<UserContext extends Record<string, unknown>>(
  params: YogaServerOptions<{ req: NextApiRequest; res: NextApiResponse }, UserContext>
) {
  return createYoga<{ req: NextApiRequest; res: NextApiResponse }, UserContext>(params);
}

export default createServer;
