# Open Source

💙 Open Source Software from Antribute

## Prerequisites

In order to start using this monorepo, you're gonna need to install a few things:

- [Bun ^1.0.6](https://bun.sh/)

Additionally, the following things are nice to have, and have built-in support in this repo:

- [Visual Studio Code](https://code.visualstudio.com/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

## Setup

1. Clone the repository and CD into it
1. Run `nvm use` from the repo root. This ensures you're using the correct node version
1. Run `bun add` to install all dependencies. This might take awhile on your first run

## List of Apps

| Name                   | Location                     | Port | Start Command          |
| ---------------------- | ---------------------------- | ---- | ---------------------- |
| Antribute Landing Page | `apps/landing-page`          | 3000 | `bun run dev:lp`       |
| ADK Todo List Example  | `apps/example-adk-todo-list` | 3000 | `bun run dev:adk-todo` |

## List of Packages

| Name                      | Location                           |
| ------------------------- | ---------------------------------- |
| `backend-auth-clerk`      | `packages/backend-auth-clerk`      |
| `backend-auth-nextauth`   | `packages/backend-auth-nextauth`   |
| `backend-core`            | `packages/backend-core`            |
| `backend-graphql-pothos`  | `packages/backend-graphql-pothos`  |
| `backend-orm-prisma`      | `packages/backend-orm-prisma`      |
| `backend-perms-auth0-fga` | `packages/backend-perms-auth0-fga` |
| `backend-perms-openfga`   | `packages/backend-perms-openfga`   |
| `backend-perms-permify`   | `packages/backend-perms-permify`   |
| `backend-server-koa`      | `packages/backend-server-koa`      |
| `backend-server-nextjs`   | `packages/backend-server-nextjs`   |
| `config`                  | `packages/config`                  |
| `tracking`                | `packages/tracking`                |
| `ui`                      | `packages/ui`                      |

<!-- ## List of Servers

| Name             | Location      | Port | Start Command                |
| ---------------- | ------------- | ---- | ---------------------------- |
| Todo: Add Server | `servers/foo` | 8000 | `bun run start servers/foo` | -->

## Additional Commands

Each app, package, and server will very likely have its own set of commands, however the monorepo
root does have a few additional global commands that affect everything:

- `bun run build` - Creates production builds of all everything in the monorepo
- `bun run build:apps` - Creates production builds of all apps
- `bun run build:packages` - Creates production builds of all packages
- `bun run build:servers` - Creates production builds of all servers
- `bun run clean` - Deletes all node modules and builds, re-installs dependencies
- `bun run dev:ui` - Runs storybook for the Antribute UI
- `bun run lint` - Runs ESLint on all apps, packages, and servers
- `bun run lint:fix` - Runs ESLint on all apps, packages, and servers, adds `--fix` to auto-fix any issues
- `bun run postinstall` - Runs after `bun add`, auto installs precommit hooks
- `bun run style:format` - Runs Prettier format on all files (except those `.prettierignore`)
- `bun run style:lint` - Runs Prettier check on all files (except those `.prettierignore`)
- `bun run test` - Runs unit tests on all apps packages, and servers
