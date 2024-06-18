import { LogLevels, createConsola } from 'consola';
import type { ConsolaInstance } from 'consola';

export abstract class Plugin {
  public name: string;
  protected logger: ConsolaInstance = createConsola({ level: LogLevels.info });

  constructor() {
    this.name = 'Improperly Configured Plugin';
  }

  onRouteRegister() {}
}
