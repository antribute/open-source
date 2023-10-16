# Antribute Next.js Server Provider

Adds Next.js API Handler Support to the Antribute Backend

## Installation

```bash
bun add @antribute/backend-server-nextjs -D
```

If your application is configured to use GraphQL, also install the following peer dependency

```bash
bun add @graphql-yoga/plugin-disable-introspection graphql-yoga
```

## Usage

1. Create a new file called `.antributerc.ts`
1. Add the following
   ```typescript
   import { defineConfig } from '@antribute/backend-core';
   export default defineConfig({ server: { platform: '@antribute/backend-server-nextjs' } });
   ```
1. Run the Antribute CLI to auto-generate required files
