# Antribute Backend NextAuth Provider

Adds NextAuth.js Support to the Antribute Backend

## Installation

```bash
pnpm i @antribute/backend-auth-nextauth -D next-auth
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
   export default defineConfig({ auth: { platform: '@antribute/backend-auth-nextauth' } });
   ```
1. Run the Antribute CLI to auto-generate required files
