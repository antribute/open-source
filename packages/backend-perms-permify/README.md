# Antribute Permify Provider

Adds Permify Support to the Antribute Backend

## Installation

```bash
bun add @antribute/backend-perms-permify -D && bun add @permify/permify-node
```

## Usage

1. Create a new file called `.antributerc.ts`
1. Add the following
   ```typescript
   import { defineConfig } from '@antribute/backend-core';
   export default defineConfig({ permissions: { platform: '@antribute/backend-perms-permify' } });
   ```
1. Run the Antribute CLI to auto-generate required files
