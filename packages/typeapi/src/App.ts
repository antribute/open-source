import { consola } from 'consola';
import { Hono } from 'hono';
import { showRoutes } from 'hono/dev';

export class App<A extends Record<string, TypeApi.App>, R extends Record<string, TypeApi.Route>> {
  public config: TypeApi.AppConfig<A, R>;

  constructor(config: TypeApi.AppConfig<A, R>) {
    this.config = config;
  }

  /**
   * Wraps your app in a Hono instance and mounts all route Hono resolvers
   */
  public register(plugins: TypeApi.Plugin[]) {
    let hono = new Hono({ strict: false });

    plugins.forEach((plugin) => {
      hono = plugin.onAppPreRegister(hono, this.config);
    });

    Object.values(this.config.apps ?? {}).forEach((app) => {
      hono = hono.route(
        app.config.baseUrl || '/',
        app.register([...plugins, ...(app.config.plugins || [])])
      );
    });

    Object.values(this.config.routes ?? {}).forEach((route) => {
      hono = hono.route('/', route.register([...plugins, ...(this.config.plugins || [])]));
    });

    plugins.forEach((plugin) => {
      // TODO: Fix when I'm more awake
      hono = plugin.onAppPostRegister(hono, this.config);
    });

    return hono;
  }

  /**
   * Starts your app's builtin Hono instance
   */
  public start() {
    const port = 8000;
    if (typeof Bun === 'undefined') {
      return;
    }

    const hono = this.register(this.config.plugins || []);

    // showRoutes(hono);

    Bun.serve({ ...hono, port });

    consola.success(`TypeAPI Server Started on Port ${port}`);
  }
}
