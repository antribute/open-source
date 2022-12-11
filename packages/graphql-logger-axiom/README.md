# Graphql Axiom Logger

A package that sends GraphQL logs from @antribute/graphql-nextjs to Axiom

## Installation

```bash
pnpm i graphql @antribute/graphql-logger-axiom
```

## Usage

```typescript
import createLogger from '@antribute/graphql-logger-axiom';

const logger = createLogger({
  axiomOrgId: process.env.AXIOM_ORG_ID ?? '',
  axiomToken: process.env.AXIOM_TOKEN ?? '',
  dataset: process.env.AXIOM_DATASET ?? '',
});

logger.info('This is a log!');
```
