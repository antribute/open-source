# Antribute Backend Prisma Provider

Adds Prisma Support to the Antribute Backend

## Installation

```bash
bun add @antribute/backend-orm-prisma -D && bun add @prisma/client prisma
```

## Usage

1. Create a new file called `.antributerc.ts`
1. Add the following
   ```typescript
   import { defineConfig } from '@antribute/backend-core';
   export default defineConfig({ orm: { platform: '@antribute/backend-orm-prisma' } });
   ```
1. Run the Antribute CLI to auto-generate required files
