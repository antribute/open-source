import { join } from 'path';
import { generateFile, getGeneratedDir, logger, populateTemplate } from '@antribute/backend-core';
import type { Config, GeneratorFunc } from '@antribute/backend-core';

import { nextHandlerTemplate } from './nextjsTemplates';
import type { NextHandlerTemplate } from './nextjsTemplates';

const nextAuthContext = `const session = await getServerSession(authOptions);
    if (!session) {
      return { loggedIn: false };
    }
    return { loggedIn: true, userId: (session as unknown as { user: { id: string } }).user.id };`;
const nextAuthHandler = `
  if (ctx.params.path?.[0] === 'auth' && ctx.params.path.length > 1) {
    const nextAuthHandler = NextAuth(authOptions);
    return nextAuthHandler(request, { ...ctx, params: { ...ctx.params, nextauth: [...ctx.params.path.slice(1)] }});
  }
`;

const createHandler = async (config: Config) => {
  logger.debug('Generating Next.js API Handler', config);

  const useGraphql = config.graphql.platform !== 'none';
  const nextOutputDir = join(getGeneratedDir(config), 'nextjs');

  let authContext = '';
  let authHandler = '';
  let authImports: { name: string; from: string }[] = [];
  if (config.auth.platform === '@antribute/backend-auth-nextauth') {
    authContext = nextAuthContext;
    authImports = [
      { name: 'NextAuth', from: 'next-auth' },
      { name: '{ getServerSession }', from: 'next-auth/next' },
      { name: '{ authOptions }', from: '../../auth/auth.utils' },
    ];

    authHandler = nextAuthHandler;
  }

  const content = populateTemplate<NextHandlerTemplate>(nextHandlerTemplate, {
    authContext,
    authHandler,
    authImports,
    useGraphql,
  });

  await generateFile(
    { fileContent: content, fileName: 'index.ts', filePath: nextOutputDir },
    config
  );
};

const nextjsGenerator: GeneratorFunc = async (config) => {
  logger.info('Starting server generation for platform: Next.js', config);

  await createHandler(config);
  logger.info('Successfully generated server for platform: Next.js', config);
};

export default nextjsGenerator;
