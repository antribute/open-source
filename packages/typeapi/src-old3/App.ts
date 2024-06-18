import { showRoutes } from 'hono/dev';

import type { Plugin } from './Plugin';
import { Logger } from './Logger';
import type { AppShape } from './types';

/**
 * A TypeAPI app that can either be used standalone or mounted inside another app
 */
export class App<A extends AppShape> {
  public plugins: Plugin[];
  public logger: Logger = new Logger();
  public router: A['router'];
  constructor(shape: A) {
    this.plugins = shape.plugins || [];
    this.router = shape.router;
  }

  async startServer(config: TypeApi.ServerConfig = {}) {
    this.plugins.forEach(async (plugin) => {
      await plugin.onPreServerStart({ config });
    });

    const hono = await this.router.buildHono(this.plugins);

    if (config.devMode) {
      showRoutes(hono);
    }

    const port = config.port ?? 8080;
    if (typeof Bun === 'undefined') {
      this.logger.error('At this time Bun is the only supported runtime');
      process.exit(1);
    } else {
      Bun.serve({ ...hono, port });
    }
    this.logger.start(`TypeAPI Server Started on Port ${port}`);
  }
}
