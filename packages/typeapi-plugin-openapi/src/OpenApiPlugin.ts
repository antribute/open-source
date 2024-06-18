import { Plugin } from '@antribute/typeapi';
import type { Hono } from 'hono';
import type { OpenAPIV3_1 } from 'openapi-types';

export interface OpenApiPluginConfig {
  info: OpenAPIV3_1.InfoObject;
}

export class OpenApiPlugin extends Plugin {
  private config: OpenApiPluginConfig;

  constructor(config: OpenApiPluginConfig) {
    super('OpenApi');
    this.config = config;
  }

  public override onAppPostMount(hono: Hono, app: TypeApi.App): Hono {
    const openApiDocument: OpenAPIV3_1.Document = {
      ...this.config.info,
      ...this.buildApp(app),
    };
    return hono.get('/openapi.json', (c) => c.json(openApiDocument));
  }

  private buildApp(app: TypeApi.App): {
    components: OpenAPIV3_1.ComponentsObject;
    paths: OpenAPIV3_1.PathsObject;
  } {
    Object.values(app.config.routes).map(this.buildRoute);
    return { components: {}, paths: {} };
  }

  private buildRoute(route: TypeApi.Route): {
    components: OpenAPIV3_1.ComponentsObject;
    paths: OpenAPIV3_1.PathsObject;
  } {
    return { components: {}, paths: {} };
  }
}
