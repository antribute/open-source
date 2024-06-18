import type { TAnySchema } from '@sinclair/typebox';
import type { Hono } from 'hono';
import type { AnyProperties, PathParamsSchema } from './types';

// These typings are globally defined and designed to be overridden by plugins to create completely
// typesafe middleware

declare global {
  // eslint-disable-next-line ts/no-namespace
  export namespace TypeApi {
    // This is designed to be extended by Plugins
    export interface RouteConfig {}

    export interface Route {
      config: any;
      path: string;
      method: string;
      register: (plugins: TypeApi.Plugin[]) => Hono;
      resolver: (input: any) => any | Promise<any>;
      schema: {
        input: {
          body: AnyProperties;
          headers: AnyProperties;
          path: PathParamsSchema<string>;
          query: AnyProperties;
        };
      };
    }

    export interface Plugin {
      onRoutePreRegister: (hono: Hono, route: TypeApi.RouteConfig) => Hono;
      onRoutePostRegister: (hono: Hono, route: TypeApi.RouteConfig) => Hono;
      onAppPreRegister: (
        hono: Hono,
        app: TypeApi.AppConfig<Record<string, TypeApi.App>, Record<string, TypeApi.Route>>
      ) => Hono;
      onAppPostRegister: (
        hono: Hono,
        app: TypeApi.AppConfig<Record<string, TypeApi.App>, Record<string, TypeApi.Route>>
      ) => Hono;
      onServerPreStart: (
        hono: Hono,
        app: TypeApi.AppConfig<Record<string, TypeApi.App>, Record<string, TypeApi.Route>>
      ) => Hono;
      onServerPostStart: (
        hono: Hono,
        app: TypeApi.AppConfig<Record<string, TypeApi.App>, Record<string, TypeApi.Route>>
      ) => Hono;
    }

    export interface AppConfig<
      A extends Record<string, TypeApi.App>,
      R extends Record<string, TypeApi.Route>
    > {
      apps?: A;
      baseUrl?: string;
      plugins?: TypeApi.Plugin[];
      routes?: R;
    }

    export interface App {
      config: {
        // TODO: How many levels deep should this be????
        apps: {
          [app: string]: {
            config: {
              baseUrl?: string;
              plugins?: TypeApi.Plugin[];
              routes: {
                path: string;
                method: string;
                register: (plugins: TypeApi.Plugin[]) => Hono;
                resolver: (input: any) => any | Promise<any>;
                schema: {
                  input: {
                    body: AnyProperties;
                    headers: AnyProperties;
                    path: PathParamsSchema<string>;
                    query: AnyProperties;
                  };
                };
              };
            };
            register: (plugins: TypeApi.Plugin[]) => Hono;
          };
        };
        baseUrl?: string;
        plugins?: TypeApi.Plugin[];
        routes: {
          [route: string]: {
            path: string;
            method: string;
            register: (plugins: TypeApi.Plugin[]) => Hono;
            resolver: (input: any) => any | Promise<any>;
            schema: {
              input: {
                body: AnyProperties;
                headers: AnyProperties;
                path: PathParamsSchema<string>;
                query: AnyProperties;
              };
            };
          };
        };
      };
      register: (plugins: TypeApi.Plugin[]) => Hono;
    }
  }
}
