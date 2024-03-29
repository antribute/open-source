# Antribute Backend Pothos Provider

Adds Pothos GraphQL Support to the Antribute Backend

## Installation

```bash
bun add @antribute/backend-graphql-pothos -D && bun add @pothos/core graphql graphql-scalars
```

If your application is configured to use auth or permissions, also install the following peer dependency

```bash
bun add @pothos/plugin-scope-auth
```

If your application's ORM is `prisma`, also install the following peer dependencies

```bash
bun add @pothos/plugin-prisma @pothos/plugin-prisma-utils
```

## Usage

1. Create a new file called `.antributerc.ts`
1. Add the following
   ```typescript
   import { defineConfig } from '@antribute/backend-core';
   export default defineConfig({ graphql: { platform: '@antribute/backend-graphql-pothos' } });
   ```
1. Run the Antribute CLI to auto-generate required files
