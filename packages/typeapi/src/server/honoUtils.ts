import { output } from '@antribute/typecli';
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';

import type { Config } from 'config';

export const createServer = () => {
  const app = new Hono();

  app.onError((err, c) => {
    if (err instanceof HTTPException) {
      c.status(err.status);
      return c.json({ message: err.message });
    }
    c.status(500);
    output.error(`An improperly thrown error was caught: ${err.message}`);
    return c.json({ message: 'An unknown error has occurred' });
  });
  return app;
};

export const startBunServer = (config: Config, server: Hono) => {
  // Hono's documentation says to simply export default your server parameters and then to use the
  // bun run command on that file. This technically works, but we prefer to wrap that in our own
  // CLI for out of the box support for Node and Bun. The docs on that export default syntax for
  // Bun.serve is limited, so I wanted to make sure to call that out here. For more info check out
  // https://bun.sh/docs/api/http#object-syntax
  Bun.serve({ ...server, port: config.server.port });
};

export const startNodeServer = async (config: Config, server: Hono) => {
  serve({ ...server, port: config.server.port });
};

export const startServer = async (config: Config, server: Hono) => {
  if (typeof Bun === 'undefined') {
    // eslint-disable-next-line unicorn/prefer-type-error
    throw new Error('Unsupported non-bun runtime');
  } else {
    startBunServer(config, server);
  }
  // TODO: Should we consider Deno support?
  output.success(`TypeAPI Server Started at Port ${config.server.port}`);

  // Also due to this being called from a CLI instead of Bun directly, we need to then await a
  // never-resolving promise to ensure the server is only stopped when the process is exited. We'll
  // have to figure out an alternative non-bun solution for a dev command here
  await new Promise(() => {});
};
