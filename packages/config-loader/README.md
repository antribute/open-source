# Config Loader

Loads TypeScript, JavaScript, and JSON configs in a Bun and Node friendly manner

## Installation

```bash
bun add @antribute/config-loader
```

## Usage

```typescript
import { loadAndValidateConfig, mergeConfig } from '@antribute/config-loader';
import type { DefineConfigFn } from '@antribute/config-loader';
import { Type } from '@sinclair/typebox';
import type { Static } from '@sinclair/typebox';

const ConfigSchema = Type.Object({
  foo: Type.String(),
});

const defaultConfig = {
   foo: 'bar',
};

const value = await loadAndValidateConfig({
  cwd: process.cwd(), // Optionally override the cwd
  fileNames: ['.antributerc, myCoolConfig'], // Any files to search for, supports formats ts, js, mjs, and cjs
  overrideConfigPath: './my-custom-config.ts' // Overrides any of the above config paths and only searches for the provided path
  validationSchema: ConfigSchema // TypeBox validation schema
});

export const myCustomDefineConfig: DefineConfigFn<Static<typeof ConfigSchema>> = (config) => mergeConfig(defaultConfig, config);
```
