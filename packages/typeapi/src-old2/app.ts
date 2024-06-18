import { LogLevels, createConsola } from 'consola';
import type { ConsolaInstance } from 'consola';
import { Hono } from 'hono';
import { showRoutes } from 'hono/dev';

export type SDK<S extends TypeApi.AppConfig> = {
  [F in keyof S['routes']]: S['routes'][F]['resolver'];
};

export class App<S extends TypeApi.AppConfig> {
  public devMode: boolean;
  public hono: Hono;
  public logger: ConsolaInstance = createConsola({ level: LogLevels.info });
  public sdk: SDK<S>;

  constructor({ devMode = false, routes }: S) {
    this.devMode = devMode;
    this.hono = new Hono();
    this.sdk = Object.entries(routes || {}).reduce((acc, [funcName, route]) => {
      this.hono = route.register(this.hono);
      return {
        ...acc,
        [funcName]: route.resolver,
      };
    }, {} as SDK<S>);
  }

  public start() {
    if (this.devMode) {
      showRoutes(this.hono);
    }
    if (typeof Bun === 'undefined') {
      this.logger.error('At this time Bun is the only supported runtime');
      process.exit(1);
    }
    const port = 8080;
    Bun.serve({ ...this.hono, port });

    this.logger.success(`🚀 TypeAPI Server Started on Port ${port}`);
  }
}
