import { swaggerUI } from '@hono/swagger-ui';
import type { OpenAPIV3_1 } from 'openapi-types';

import { createPlugin } from '../../plugin';
import { createRoute } from '../../route';

import './globalTypes';

export interface RestPluginConfig {
  isOpenApiEndpointEnabled?: boolean;
  isSwaggerUiEndpointEnabled?: boolean;
  openApiEndpointPath?: string;
  swaggerUiEndpointPath?: string;
  title: string;
  version: string;
}

const getStatus = (method: string) => {
  const lowerCaseMethod = method.toLowerCase();
  if (lowerCaseMethod === 'post') {
    return 201;
  }
  if (lowerCaseMethod === 'delete') {
    return 204;
  }
  return 200;
};

// TODO: Should we separate this plugin into its own package?
export const RestPlugin = createPlugin<RestPluginConfig>(
  ({
    isOpenApiEndpointEnabled = true,
    isSwaggerUiEndpointEnabled = true,
    openApiEndpointPath = '/openapi.json',
    swaggerUiEndpointPath = '/docs',
    title,
    version,
  }) => ({
    pluginName: 'RestPlugin',
    onServerPostConfig: (server, apps) => {
      if (!isOpenApiEndpointEnabled) {
        return;
      }
      const openApiSchema: OpenAPIV3_1.Document = {
        openapi: '3.1.0',
        info: {
          title,
          version,
        },
        components: {
          schemas: {},
        },
        paths: {},
      };

      Object.values(apps).forEach(({ routes }) =>
        routes.forEach((route) => {
          // Ignore any routes that aren't built with the rest plugin
          if (!route.restPlugin) {
            return;
          }
          const schemaTitle = route.restPlugin.outputSchema.title;
          const isSchemaRef = !!schemaTitle;
          if (isSchemaRef && !openApiSchema.components!.schemas![schemaTitle]) {
            openApiSchema.components!.schemas![schemaTitle] = route.restPlugin
              .outputSchema as OpenAPIV3_1.SchemaObject;
          }

          if (!openApiSchema.paths![route.path]) {
            openApiSchema.paths![route.path] = {};
          }
          if (openApiSchema.paths![route.path]![route.method as OpenAPIV3_1.HttpMethods]) {
            throw new Error(
              `Method ${route.method} has already been defined for path ${route.path}`
            );
          }
          openApiSchema.paths![route.path]![route.method as OpenAPIV3_1.HttpMethods] = {
            responses: {
              // TODO: Add correct status here
              '200': {
                description: 'A successful response',
                content: {
                  'application/json': {
                    schema: isSchemaRef
                      ? {
                          $ref: `#/components/schemas/${schemaTitle}`,
                        }
                      : route.restPlugin.outputSchema,
                  },
                },
              },
            },
          };
        })
      );

      server.get(openApiEndpointPath, (c) => {
        const res = c.json(openApiSchema);
        return res;
      });

      if (isSwaggerUiEndpointEnabled) {
        server.get(swaggerUiEndpointPath, swaggerUI({ url: openApiEndpointPath }));
      }
    },
  })
);

export const createRestRoute = <
  Path extends string,
  Method extends string,
  Func extends TypeApi.Func
>(
  path: Path,
  method: Method,
  func: Func
): TypeApi.Route<Path> => {
  const route = createRoute(path, method, async (c) => {
    const shouldUseQueryParams = ['get', 'delete', 'trace', 'options'].includes(
      method.toLowerCase()
    );
    const input = await (shouldUseQueryParams
      ? new Promise((resolve) => resolve(c.req.queries()))
      : c.req.json());
    const res = await func.resolver(input);
    c.status(getStatus(method));
    return c.json(res);
  });
  return {
    ...route,
    restPlugin: {
      inputSchema: func.inputSchema,
      outputSchema: func.outputSchema,
    },
  };
};
