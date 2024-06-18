import { LogLevels, createConsola } from 'consola';
import type { ConsolaInstance } from 'consola';
import { Hono } from 'hono';
import type { Plugin } from './plugin';

// export interface AppParams<F extends TypeApi.Funcs> {
//   funcs?: F;
//   routes?: TypeApi.Route<F>[];
// }

// // eslint-disable-next-line ts/ban-types
// export function app<F extends TypeApi.Funcs = {}>({ funcs }: AppParams<F>): TypeApi.App<F> {
//   const hono = new Hono();
//   const sdk = Object.entries(funcs || {}).reduce((acc, [funcName, { resolver }]) => {
//     return {
//       ...acc,
//       [funcName]: resolver,
//     };
//   }, {} as TypeApi.App<F>['sdk']);

//   return {
//     hono,
//     sdk,
//     start: () => {},
//   };
// }

export interface AppConfig<F extends TypeApi.Funcs> {
  // TODO: Should there be some sort of register function for funcs?
  funcs?: F;
  plugins?: Plugin[];
}

export interface ServerConfig {
  port?: number;
}

// eslint-disable-next-line ts/ban-types
export class App<F extends TypeApi.Funcs = {}> {
  protected logger: ConsolaInstance = createConsola({ level: LogLevels.info });
  protected server: Hono;
  public readonly sdk: {
    [N in keyof F]: F[N]['resolver'];
  };

  constructor({ funcs = {} as F, plugins = [] }: AppConfig<F>) {
    this.server = new Hono();

    // Pre-Config
    plugins.forEach((plugin) => {
      plugin.logger = this.logger;
      plugin.preConfig(this.server);
    });

    // Function Config
    plugins.forEach((plugin) => {
      plugin.configureFuncs(funcs);
    });

    this.sdk = Object.entries(funcs || {}).reduce((acc, [funcName, { resolver }]) => {
      return {
        ...acc,
        [funcName]: resolver,
      };
    }, {} as TypeApi.App<F>['sdk']);

    // Post-Config
    plugins.forEach((plugin) => plugin.postConfig(this.server));
  }

  protected createRouter() {}

  public startServer(config?: ServerConfig) {
    if (typeof Bun === 'undefined') {
      // TODO: Add support for Node, consider support for Deno
      this.logger.error('At this time Bun is the only supported runtime, sorry about that!');
      process.exit(1);
    }
    const port = config?.port ?? 8080;

    // To conserve resources, routers are only configured if we actually start the server
    this.createRouter();
    Bun.serve({ ...this.server, port });
    this.logger.success(`🚀 TypeAPI Server Started on Port ${port}`);
  }
}
