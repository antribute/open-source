import { consola } from 'consola';
import type { Hono } from 'hono';

export class Plugin {
  public name: string;

  constructor(name: string) {
    this.name = name;
    consola.info(`[Plugin ${name}]: ${name} Plugin Registered`);
  }

  public onRoutePreMount(hono: Hono, _route: TypeApi.Route): Hono {
    return hono;
  }

  public onRoutePostMount(hono: Hono, _route: TypeApi.Route): Hono {
    return hono;
  }

  public onAppPreMount(hono: Hono, _app: TypeApi.App): Hono {
    return hono;
  }

  public onAppPostMount(hono: Hono, _app: TypeApi.App): Hono {
    return hono;
  }

  public onServerPreStart(hono: Hono, _app: TypeApi.App): Hono {
    return hono;
  }

  public onServerPostStart(hono: Hono, _app: TypeApi.App): Hono {
    return hono;
  }
}
