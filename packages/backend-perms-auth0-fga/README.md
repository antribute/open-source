# Antribute Auth0 FGA Provider

Adds Auth0 FGA Support to the Antribute Backend

## Installation

```bash
pnpm i @antribute/backend-perms-auth0-fga -D && pnpm i @auth0/fga
```

## Usage

1. Create a new file called `.antributerc.ts`
1. Add the following
   ```typescript
   import { defineConfig } from '@antribute/backend-core';
   export default defineConfig({ permissions: { platform: '@antribute/backend-perms-auth0-fga' } });
   ```
1. Run the Antribute CLI to auto-generate required files
