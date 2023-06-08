# Antribute Backend Clerk Provider

Adds Clerk Support to the Antribute Backend

## Installation

```bash
pnpm i @antribute/backend-clerk -D && pnpm i @clerk/clerk-sdk-node
```

If your application's ORM is `prisma`, also install the following peer dependency

```bash
pnpm i @next-auth/prisma-adapter
```

## Usage

1. Create a new file called `.antributerc.ts`
1. Add the following
   ```typescript
   import { defineConfig } from '@antribute/backend-core';
   export default defineConfig({ auth: { platform: '@antribute/backend-clerk' } });
   ```
1. Run the Antribute CLI to auto-generate required files
