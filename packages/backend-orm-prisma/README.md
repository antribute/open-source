# Antribute Backend Prisma Provider

Adds Prisma Support to the Antribute Backend

## Installation

```bash
pnpm i @antribute/backend-orm-prisma -D && pnpm i @prisma/client prisma
```

## Usage

1. Create a new file called `.antributerc.ts`
1. Add the following
   ```typescript
   import { defineConfig } from '@antribute/backend-core';
   export default defineConfig({ orm: { platform: '@antribute/backend-orm-prisma' } });
   ```
1. Run the Antribute CLI to auto-generate required files
