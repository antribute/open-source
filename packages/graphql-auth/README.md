# Graphql Auth

A graphql-yoga context creator for NextJS Auth and Scoped Permissions

## Installation

```bash
pnpm i graphql @antribute/graphql-auth
```

## Usage

### Adding Auth Context to GraphQL Yoga

```typescript
// authProviders.ts
const authProviders = [
  // Put your nextauth.js providers here
];

export default authProviders;

// pages/api/auth/[...nextauth].ts
import NextAuth from 'next-auth';

import authProviders from 'authProviders';

export default NextAuth({
  providers: authProviders,
});

// pages/api/graphql.api.ts
import { createNextAuthContext, createAuthScopes } from '@antribute/graphql-auth';
import { createYoga } from 'graphql-yoga';

import authProviders from 'authProviders';

const handler = createYoga({
  context: createNextAuthContext({
    authOptions: { providers: authProviders },
    getUserPerms: () => [
      // Put functionality here that retrieves your user roles
    ],
  }),
});
export default handler;
```
