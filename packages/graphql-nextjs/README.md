# Graphql NextJS

A simple NextJS wrapper around GraphQL Yoga

## Installation

```bash
pnpm i graphql @antribute/graphql-nextjs
```

## Usage

```typescript
import { apiHandlerConfig, createHandler } from '@antribute/graphqlNextjs';

export const config = apiHandlerConfig;

const handler = createHandler();
export default createHandler();
```
