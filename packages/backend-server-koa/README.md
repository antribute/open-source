# Antribute Koa Server Provider

Adds Koa Support to the Antribute Backend

## Installation

```bash
pnpm i @antribute/backend-server-koa -D && pnpm i koa
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
   export default defineConfig({ server: { platform: '@antribute/backend-server-koa' } });
   ```
1. Run the Antribute CLI to auto-generate required files
