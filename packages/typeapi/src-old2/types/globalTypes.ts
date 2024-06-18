import type { TAnySchema, TSchema } from '@sinclair/typebox';
import type { Hono } from 'hono';
import type { MaybePromise } from './utils';

// Is there a way to keep these global types up to parity with our classes? These work amazingly
// for output, especially with plugins, but this could lead to a lot of manual work
declare global {
  // eslint-disable-next-line ts/no-namespace
  export namespace TypeApi {
    export interface RouteConfig {
      req?: {
        body?: TSchema;
        headers?: TSchema;
        query?: TSchema;
      };
      res?: TSchema;
    }

    export interface Route {
      config: {
        req: {
          body: TAnySchema | undefined;
          headers: TAnySchema | undefined;
          query: TAnySchema | undefined;
        };
        res: TAnySchema | undefined;
      };
      method: string;
      path: string;
      register: (hono: Hono) => Hono;
      resolver: (input: any) => MaybePromise<any>;
    }

    export interface AppConfig {
      devMode?: boolean;
      routes: {
        [routeName: string]: {
          config: {
            req: {
              body: TAnySchema | undefined;
              headers: TAnySchema | undefined;
              query: TAnySchema | undefined;
            };
            res: TAnySchema | undefined;
          };
          method: string;
          path: string;
          register: (hono: Hono) => Hono;
          resolver: (input: any) => MaybePromise<any>;
        };
      };
    }

    export interface App {}
  }
}
