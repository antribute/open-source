# Graphql NextJS

A simple NextJS wrapper around GraphQL Yoga

## Installation

```bash
pnpm i graphql @antribute/graphql-nextjs
```

## Usage

```typescript
import { apiHandlerConfig, createHandler } from '@antribute/graphql-nextjs';

export const config = apiHandlerConfig;

const handler = createHandler({
  /* TODO: Put your graphql-yoga params here */
});
export default handler;
```
