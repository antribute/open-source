# Antribute Backend Framework

A completely type safe, auto-generated backend framework

## Installation

```bash
pnpm i @antribute/backend-core
```

## Configuration

The Antribute backend can be configured entirely within one file `.antributerc.ts`. Besides `.ts`,
the CLI will look for the following files

- `.antributerc.js`
- `.antributerc.cjs`
- `.antributerc.mjs`

By default, the CLI will use the following configuration

```typescript
import { defineConfig } from '@antribute/backend-core';

export default defineConfig({
  auth: {
    platform: '@antribute/backend-auth-nextauth',
  },
  graphql: {
    platform: '@antribute/backend-graphql-pothos',
  },
  logLevel: 'info',
  orm: {
    dir: 'prisma',
    platform: '@antribute/backend-orm-prisma',
  },
  permissions: {
    platform: '@antribute/backend-perms-auth0-fga',
  },
  server: {
    dir: resolve('src', 'server'),
    platform: '@antribute/backend-server-nextjs',
  },
});
```

In order to use this default config, you'll need to install the following packages and their peer
dependencies

```bash
pnpm i @antribute/backend-auth-nextauth @antribute/backend-graphql-pothos @antribute/backend-orm-prisma @antribute/backend-perms-auth0-fga @antribute/backend-server-nextjs -D
```

Any package can be used as a `platform`, however the following platforms are built and maintained by
Antribute for your convenience:

| Name                                 | Type          | Description                                               |
| ------------------------------------ | ------------- | --------------------------------------------------------- |
| `@antribute/backend-auth-nextauth`   | `auth`        | Adds NextAuth.js Support to the Antribute Backend         |
| `@antribute/backend-graphql-pothos`  | `graphql`     | Adds Pothos GraphQL Support to the Antribute Backend      |
| `@antribute/backend-orm-prisma`      | `orm`         | Adds Prisma Support to the Antribute Backend              |
| `@antribute/backend-perms-auth0-fga` | `permissions` | Adds Auth0 FGA Support to the Antribute Backend           |
| `@antribute/backend-server-nextjs`   | `server`      | Adds Next.js API Handler Support to the Antribute Backend |

## Usage

1. Optionally Create a new file called `.antributerc.ts` and use the above instructions to configure it
1. Run `antribute-backend generate` to generate the code required for your server
1. That's it! Run your server as usual
