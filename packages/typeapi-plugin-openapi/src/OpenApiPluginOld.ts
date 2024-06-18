// import { Plugin } from '@antribute/typeapi';
// import type { PluginOnPostRouteBuild } from '@antribute/typeapi';
// import { swaggerUI } from '@hono/swagger-ui';
// import type { OpenAPIV3_1 } from 'openapi-types';

// interface OpenApiPluginConfig {
//   info: OpenAPIV3_1.InfoObject;
//   openApiJsonEndpoint?: string;
//   swaggerUiEndpoint?: string;
// }

// export class OpenApiPlugin extends Plugin {
//   public config: OpenApiPluginConfig;
//   public document: OpenAPIV3_1.Document;

//   constructor(config: OpenApiPluginConfig) {
//     super('OpenApi');

//     this.config = config;
//     this.document = {
//       openapi: '3.0.2',
//       info: this.config.info,
//       components: {},
//     };
//   }

//   override async onPostRouteBuild(params: PluginOnPostRouteBuild) {
//     const hono = params.hono
//       // TODO: Should we make this something we allow devs to disable?
//       .get(this.config.openApiJsonEndpoint || '/openapi.json', (c) => c.json(this.document))
//       // TODO: Is there a way to get this to render via SSR? The loading indicator sucks lol. Maybe
//       // we eventually build a version of this with antribute ui or something
//       .get(
//         this.config.swaggerUiEndpoint || '/docs',
//         swaggerUI({ url: this.config.openApiJsonEndpoint || '/openapi.json' })
//       );

//     return { ...params, hono };
//   }
// }
