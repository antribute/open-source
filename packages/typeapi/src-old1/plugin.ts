import { LogLevels, createConsola } from 'consola';
import type { ConsolaInstance } from 'consola';
import type { Hono } from 'hono';

export abstract class Plugin {
  public logger: ConsolaInstance = createConsola({ level: LogLevels.info });
  public name: string;

  constructor() {
    this.name = 'Misconfigured Plugin';
  }

  public preConfig(_server: Hono) {
    this.logger.info(`[Plugin: ${this.name}]: Executing Pre-Config Tasks`);
  }

  // TODO: I hate this name but idk what to change it to
  public configureFuncs(_funcs: TypeApi.Funcs) {
    this.logger.info(`[Plugin: ${this.name}]: Executing Function Config Tasks`);
  }

  // TODO: I hate this name but idk what to change it to
  public configureRouter(_router: TypeApi.Router) {
    this.logger.info(`[Plugin: ${this.name}]: Executing Router Config Tasks`);
  }

  public postConfig(_server: Hono) {
    this.logger.info(`[Plugin: ${this.name}]: Executing Post-Config Tasks`);
  }
}
