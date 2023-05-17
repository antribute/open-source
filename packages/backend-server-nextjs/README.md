# Antribute Next.js Server Provider

Adds Next.js API Handler Support to the Antribute Backend

## Installation

```bash
pnpm i @antribute/backend-server-nextjs -D
```

If your application is configured to use GraphQL, also install the following peer dependency

```bash
pnpm i @graphql-yoga/plugin-disable-introspection graphql-yoga
```

## Usage

1. Create a new file called `.antributerc.ts`
1. Add the following
   ```typescript
   import { defineConfig } from '@antribute/backend-core';
   export default defineConfig({ permissions: { platform: '@antribute/backend-perms-auth0-fga' } });
   ```
1. Run the Antribute CLI to auto-generate required files
