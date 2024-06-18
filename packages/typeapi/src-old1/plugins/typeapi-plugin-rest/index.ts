import type { Hono } from 'hono';

import { Plugin } from '../../plugin';

export class RestPlugin extends Plugin {
  constructor() {
    super();
    this.name = 'REST';
  }

  public override postConfig(server: Hono) {
    super.postConfig(server);
    this.logger.info('Test log');
  }
}
