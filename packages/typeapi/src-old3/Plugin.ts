import type { Hono } from 'hono';
import { Logger } from './Logger';
import type { RouterShape } from './types';

export interface PluginOnServerStart {
  config: TypeApi.ServerConfig;
}
export interface PluginOnPreRouteBuild {
  hono: Hono;
  router: RouterShape<any>;
}
export interface PluginOnRouteBuild {
  hono: Hono;
}
export interface PluginOnPostRouteBuild {
  hono: Hono;
  router: RouterShape<any>;
}

export class Plugin {
  protected logger = new Logger();
  protected name = 'Improperly Configured Plugin';

  constructor(name: string) {
    this.name = name;
    this.logger.info(`[Plugin ${this.name}]: Plugin Registered`);
  }

  /**
   * Step 1 of the TypeAPI lifecycle. This function is called as soon as the server is created.
   * This happens before the router classes are converted to Hono apps and has access to the
   * TypeAPI server configuration
   */
  public async onPreServerStart(params: PluginOnServerStart) {
    return params;
  }

  /**
   * Step 2 of the TypeAPI lifecycle. This function is called right after the router's Hono app is
   * created but before any routes are added. It has access to the newly created Hono app and is
   * best used to and apply Hono middleware or create routes that don't require
   * router context such as a health check endpoint
   */
  public async onPreRouteBuild(params: PluginOnPreRouteBuild) {
    return params;
  }

  public async onRouteBuild(params: PluginOnRouteBuild) {
    return params;
  }

  /**
   * Step X of the TypeAPI lifecycle. This function is called right after all routes have been
   * added to the Hono app and the router.
   */
  public async onPostRouteBuild(params: PluginOnPostRouteBuild) {
    return params;
  }
}
