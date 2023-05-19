import { logger, populateTemplate, generateFile, getGeneratedDir } from '@antribute/backend-core';
import type { Config, GeneratorFunc } from '@antribute/backend-core';
import { join } from 'path';

import { koaHandlerTemplate } from './koaTemplates';
import type { KoaHandlerTemplate } from './koaTemplates';

const clerkContext = `context: async ({ request }) => {
    const cookies: Record<string, string> = {};
    request.headers.get('cookie')?.split(';')?.forEach((cookie) => {
      const [key, value] = cookie.split('=');
      if (key && value) {
        cookies[key.trim()] = value.trim();
      }
    });

    const cookieToken = cookies['__session'];
    const headerToken = request.headers.get('authorization')?.replace('Bearer ', '');

    if (!cookieToken && !headerToken) {
      return { loggedIn: false };
    }

    const userId = (await clerk.verifyToken(cookieToken || headerToken || '')).sub;
    return { loggedIn: true, userId };
  },`;

const nextAuthContext = `context: ({ request }) => {
    const session = await getServerSession(authOptions);
    if (!session) {
      return { loggedIn: false };
    }
    return { loggedIn: true, userId: (session as unknown as { user: { id: string } }).user.id };
  }`;

const nextAuthHandler = `
  if (ctx.params.path?.[0] === 'auth' && ctx.params.path.length > 1) {
    const nextAuthHandler = NextAuth(authOptions);
    return nextAuthHandler(request, { ...ctx, params: { ...ctx.params, nextauth: [...ctx.params.path.slice(1)] }});
  }
`;

const createHandler = async (config: Config) => {
  logger.debug('Generating Koa API Handler', config);

  const useGraphql = config.graphql.platform !== 'none';
  const koaOutputDir = join(getGeneratedDir(config), 'koa');

  let authContext = 'context: undefined,';
  let authHandler = '';
  let authImports: { name: string; from: string }[] = [];

  if (config.auth.platform === '@antribute/backend-auth-clerk') {
    authContext = clerkContext;
    authImports = [{ name: 'clerk', from: '@clerk/clerk-sdk-node' }];
  }

  if (config.auth.platform === '@antribute/backend-auth-nextauth') {
    authContext = nextAuthContext;
    authImports = [
      { name: 'NextAuth', from: 'next-auth' },
      { name: '{ getServerSession }', from: 'next-auth/next' },
      { name: '{ authOptions }', from: '../../auth/auth.utils' },
    ];

    authHandler = nextAuthHandler;
  }

  const content = populateTemplate<KoaHandlerTemplate>(koaHandlerTemplate, {
    authContext,
    authHandler,
    authImports,
    useGraphql,
  });

  await generateFile(
    { fileContent: content, fileName: 'index.ts', filePath: koaOutputDir },
    config
  );
};

const koaGenerator: GeneratorFunc = async (config) => {
  logger.info('Starting server generation for platform: Koa', config);

  await createHandler(config);
  logger.info('Successfully generated server for platform: Koa', config);
};

export default koaGenerator;
