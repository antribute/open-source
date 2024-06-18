import { LogLevels, createConsola } from 'consola';
import type { ConsolaInstance } from 'consola';

export class Logger {
  public debug: ConsolaInstance['debug'];
  public error: ConsolaInstance['error'];
  public info: ConsolaInstance['info'];
  public success: ConsolaInstance['success'];
  public start: ConsolaInstance['start'];
  public warn: ConsolaInstance['warn'];
  constructor() {
    const consola = createConsola({ level: LogLevels.info });

    this.debug = consola.debug;
    this.error = consola.error;
    this.info = consola.info;
    this.success = consola.success;
    this.start = consola.start;
    this.warn = consola.warn;
  }
}
