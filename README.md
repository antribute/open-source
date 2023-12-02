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
1. Ensure bun is running on the latest version by running `bun upgrade`
1. Run `bun add` to install all dependencies. This might take awhile on your first run

## List of Apps

| Name                   | Location            | Port | Start Command    |
| ---------------------- | ------------------- | ---- | ---------------- |
| Antribute Landing Page | `apps/landing-page` | 3000 | `bun run dev:lp` |

## List of Packages

| Name                     | Description                                     |
| ------------------------ | ----------------------------------------------- |
| `config`                 | Shared config files                             |
| `feature-type-cli`       | Coming soon 👀                                  |
| `hono-typebox-validator` | Hono Validation Middleware using TypeBox        |
| `react-route-generator`  | File-based React routing tooling                |
| `tracking`               | A safer, easier to use Mixpanel SDK             |
| `ui`                     | Antribute's Component Library and Design System |

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
