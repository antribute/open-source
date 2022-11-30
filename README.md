# Open Source

💙 Open Source Software from Antribute

## Prerequisites

In order to start using this monorepo, you're gonna need to install a few things:

- [Node Version Manager](https://github.com/nvm-sh/nvm)
- [Node.js 18](https://nodejs.org/en/) (Installed by running `nvm use` in the root of the repo)
- [PNPM 7.x](https://pnpm.io/)

Additionally, the following things are nice to have, and have built-in support in this repo:

- [Visual Studio Code](https://code.visualstudio.com/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

## Setup

1. Clone the repository and CD into it
1. Run `nvm use` from the repo root. This ensures you're using the correct node version
1. Run `pnpm i` to install all dependencies. This might take awhile on your first run

## List of Apps

| Name          | Location   | Port | Start Command             |
| ------------- | ---------- | ---- | ------------------------- |
| Todo: Add App | `apps/foo` | 3000 | `pnpm run start apps/foo` |

## List of Packages

| Name          | Location               | Purpose                                                                             |
| ------------- | ---------------------- | ----------------------------------------------------------------------------------- |
| `config`      | `packages/config`      | Stores common configuration files to be shared between apps, packages, and services |
| `zephyr-core` | `packages/zephyr-core` | Core TailwindCSS Configurations and ClassNames for Zephyr Components                |

## List of Servers

| Name             | Location      | Port | Start Command                |
| ---------------- | ------------- | ---- | ---------------------------- |
| Todo: Add Server | `servers/foo` | 8000 | `pnpm run start servers/foo` |

## Additional Commands

Each app, package, and server will very likely have its own set of commands, however the monorepo
root does have a few additional global commands that affect everything:

- `pnpm run build` - creates production builds of all everything in the monorepo
- `pnpm run build:apps` - creates production builds of all apps
- `pnpm run build:packages` - creates production builds of all packages
- `pnpm run build:servers` - creates production builds of all servers
- `pnpm run lint` - runs ESLint on all apps and packages
- `pnpm run lint:fix` - runs ESLint on all apps and packages, adds `--fix`
- `pnpm run release` - runs a script used to create releases
- `pnpm run reset` - deletes all node modules and builds, re-installs dependencies
- `pnpm run style:format` - runs Prettier format on all files
- `pnpm run style:lint` - runs Prettier check on all files
- `pnpm run test` - runs unit tests on all apps and packages
