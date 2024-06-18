declare global {
  // eslint-disable-next-line ts/no-namespace
  export namespace TypeApi {
    export interface FuncConfig {
      docs?: {
        /** A quick, one sentence overview of the Func */
        summary?: string;
        /** A longer, more detailed description of the Func */
        description?: string;
      };
      skipInputValidation?: boolean;
      skipOutputValidation?: boolean;
    }

    export interface SdkConfig {}

    export interface RouterConfig {}
    export interface RouteConfig {}

    export interface AppConfig {}

    export interface ServerConfig {
      devMode?: boolean;
      disableOpenApiGeneration?: boolean;
      disableSwaggerUi?: boolean;
      port?: number;
    }
  }
}
