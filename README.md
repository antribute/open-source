# Open Source

💙 Open Source Software from Antribute

## Prerequisites

In order to start using this monorepo, you're gonna need to install a few things:

- [Node Version Manager](https://github.com/nvm-sh/nvm)
- [Node.js 20](https://nodejs.org/en/) (Installed by running `nvm use` in the root of the repo)
- [PNPM 8.x](https://pnpm.io/)

Additionally, the following things are nice to have, and have built-in support in this repo:

- [Visual Studio Code](https://code.visualstudio.com/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

## Setup

1. Clone the repository and CD into it
1. Run `nvm use` from the repo root. This ensures you're using the correct node version
1. Run `pnpm i` to install all dependencies. This might take awhile on your first run

## List of Apps

| Name                   | Location                     | Port | Start Command           |
| ---------------------- | ---------------------------- | ---- | ----------------------- |
| Antribute Landing Page | `apps/landing-page`          | 3000 | `pnpm run dev:lp`       |
| ADK Todo List Example  | `apps/example-adk-todo-list` | 3000 | `pnpm run dev:adk-todo` |

## List of Packages

| Name                      | Location                           |
| ------------------------- | ---------------------------------- |
| `backend-auth-nextauth`   | `packages/backend-auth-nextauth`   |
| `backend-core`            | `packages/backend-core`            |
| `backend-graphql-pothos`  | `packages/backend-graphql-pothos`  |
| `backend-orm-prisma`      | `packages/backend-orm-prisma`      |
| `backend-perms-auth0-fga` | `packages/backend-perms-auth0-fga` |
| `backend-server-nextjs`   | `packages/backend-server-nextjs`   |
| `config`                  | `packages/config`                  |
| `tracking`                | `packages/tracking`                |
| `ui`                      | `packages/ui`                      |

<!-- ## List of Servers

| Name             | Location      | Port | Start Command                |
| ---------------- | ------------- | ---- | ---------------------------- |
| Todo: Add Server | `servers/foo` | 8000 | `pnpm run start servers/foo` | -->

## Additional Commands

Each app, package, and server will very likely have its own set of commands, however the monorepo
root does have a few additional global commands that affect everything:

- `pnpm run build` - Creates production builds of all everything in the monorepo
- `pnpm run build:apps` - Creates production builds of all apps
- `pnpm run build:packages` - Creates production builds of all packages
- `pnpm run build:servers` - Creates production builds of all servers
- `pnpm run clean` - Deletes all node modules and builds, re-installs dependencies
- `pnpm run dev:ui` - Runs storybook for the Antribute UI
- `pnpm run lint` - Runs ESLint on all apps, packages, and servers
- `pnpm run lint:fix` - Runs ESLint on all apps, packages, and servers, adds `--fix` to auto-fix any issues
- `pnpm run postinstall` - Runs after `pnpm i`, auto installs precommit hooks
- `pnpm run style:format` - Runs Prettier format on all files (except those `.prettierignore`)
- `pnpm run style:lint` - Runs Prettier check on all files (except those `.prettierignore`)
- `pnpm run test` - Runs unit tests on all apps packages, and servers
