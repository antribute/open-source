# Config Loader

Loads TypeScript, JavaScript, and JSON configs in a Bun and Node friendly manner

## Installation

```bash
bun add @antribute/config-loader
```

## Usage

1. Create a new file called `.antributerc.ts`
1. Add the following
   ```typescript
   import { defineConfig } from '@antribute/backend-core';
   export default defineConfig({ auth: { platform: '@antribute/backend-clerk' } });
   ```
1. Run the Antribute CLI to auto-generate required files
