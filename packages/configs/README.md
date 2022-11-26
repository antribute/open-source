# Config

Common configuration files used between all Antribute projects

## Installation

```
pnpm i @antribute/config
```

## Usage

### ESLint

```json
{
  "extends": ["@antribute/configs/eslint/eslint-config-antribute.base.js"]
}
```

```json
{
  "extends": ["@antribute/configs/eslint/eslint-config-antribute.nextjs.js"]
}
```

```json
{
  "extends": ["@antribute/configs/eslint/eslint-config-antribute.react.js"]
}
```

### Postcss

```javascript
module.exports = require('@antribute/config/postcss/postcss-tailwind.config');
```

### Prettier

```javascript
module.exports = require('@antribute/config/prettier/.prettierrc');
```

```json
{
  "prettier": "@antribute/configs/prettier/.prettierrc.js"
}
```

### TypeScript

```json
{
  "extends": "@antribute/config/tsconfig/tsconfig.base.json"
}
```

```json
{
  "extends": "@antribute/config/tsconfig/tsconfig.nextjs.json"
}
```

```json
{
  "extends": "@antribute/config/tsconfig/tsconfig.react.json"
}
```

### Tsup

```typescript
export { default } from '@antribute/config/tsup/tsup.config.base';
```

```typescript
export { default } from '@antribute/config/tsup/tsup.config.react';
```

### Vitest

```typescript
export { default } from '@antribute/config/vitest/vitest.config';
```
