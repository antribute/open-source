import { Hono } from 'hono';
import { showRoutes } from 'hono/dev';

interface CreateProjectParams<S extends TypeApi.ProjectSchema> {
  apps: S;
  config?: { isHealthCheckEnabled?: boolean; port?: number };
  plugins?: TypeApi.Plugin[];
}

export const createTypeApi = <S extends TypeApi.ProjectSchema>({
  apps,
  config,
  plugins = [],
}: CreateProjectParams<S>): TypeApi.Project<S> => {
  const server = new Hono();

  plugins.forEach((plugin) => {
    if (plugin.onServerPreConfig) {
      console.debug(`Registering Pre-Config Plugin ${plugin.pluginName}`);
      plugin.onServerPreConfig?.(server, apps);
    }
  });

  if (typeof config?.isHealthCheckEnabled !== 'boolean' || config.isHealthCheckEnabled) {
    server.get('/health', (c) => {
      const res = c.json({ healthy: true });
      return res;
    });
  }

  Object.values(apps).forEach((curentApp) => {
    curentApp.routes.forEach((route) => {
      // TODO: Allow plugins to introduce custom functionality here
      server.on([route.method], route.path, route.handler);
    });
  });

  // TODO: I hate this. There HAS to be a more efficient way to do this
  const sdk = Object.entries(apps).reduce((appsAcc, [appName, app]) => {
    return {
      ...appsAcc,
      [appName]: Object.entries(app.funcs).reduce(
        (funcsAcc, [funcName, func]) => ({
          ...funcsAcc,
          [funcName]: func.resolver,
        }),
        {}
      ),
    };
  }, {} as TypeApi.Project<S>['sdk']);

  plugins.forEach((plugin) => {
    if (plugin.onServerPostConfig) {
      console.debug(`Registering Post-Config Plugin ${plugin.pluginName}`);
      plugin.onServerPostConfig?.(server, apps);
    }
  });

  const start = () => {
    showRoutes(server);
    if (typeof Bun === 'undefined') {
      // TODO: Add support for Node.js. Consider support for Deno
      // eslint-disable-next-line unicorn/prefer-type-error
      throw new Error('At this time Bun is the only supported runtime');
    }
    const port = config?.port ?? 8080;
    Bun.serve({ ...server, port });
    // eslint-disable-next-line no-console
    console.info(`🚀 TypeAPI Server Started on Port ${port}`);
  };
  return { sdk, start };
};
