# Config

Common configuration files used between all Antribute projects

## Installation

```
bun add @antribute/config
```

## Usage

### ESLint

```javascript
module.exports = require('@antribute/config/eslint/eslint.config.js');
```

### NextJS

```javascript
module.exports = require('@antribute/config/nextjs/next.config');
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
  "prettier": "@antribute/config/prettier/.prettierrc.cjs"
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

### Unbuild

```javascript
export { default } from '@antribute/config/unbuild/unbuild.config.base.ts';
```

```javascript
export { default } from '@antribute/config/unbuild/unbuild.config.react.ts';
```
