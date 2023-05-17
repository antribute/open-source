import { defineConfig } from '@antribute/backend-core';

export default defineConfig({
  auth: { customConfig: {}, platform: '@antribute/backend-auth-nextauth' },
  logLevel: 'info',
  permissions: { customConfig: {}, platform: '@antribute/backend-perms-auth0-fga' },
  server: { customConfig: {}, platform: '@antribute/backend-server-nextjs' },
});
