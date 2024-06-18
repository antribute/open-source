import type { Static, TAnySchema, TSchema } from '@sinclair/typebox';
import type { Env, Handler, Hono, TypedResponse } from 'hono';

import type { MaybePromise } from './utils';

declare global {
  // eslint-disable-next-line ts/no-namespace
  export namespace TypeApi {
    export interface Func<
      I extends TSchema | undefined = TAnySchema,
      O extends TSchema = TAnySchema,
      IS = I extends TSchema ? Static<I> : unknown,
      OS = Static<O>
    > {
      inputSchema?: I;
      outputSchema: O;
      resolver: (input: IS) => MaybePromise<OS | TypedResponse<OS>>;
    }

    export interface AppSchema {
      [FuncName: string]: {
        inputSchema?: TAnySchema;
        outputSchema: TAnySchema;
        resolver: (input: any) => MaybePromise<any>;
      };
    }

    export interface Route<P extends string = string> {
      path: P;
      method: string;
      handler: Handler<Env, P>;
    }

    export interface App<S extends AppSchema> {
      funcs: S;
      // TODO: We may want to invoke a schema-based approach similar to funcs here in the future
      // for fully typed routes, but that's not a requirement
      routes: Route[];
    }

    // TODO: Is there a way to do this without duplicating types from AppSchema
    export interface ProjectSchema {
      [AppName: string]: {
        funcs: {
          [Name: string]: {
            inputSchema?: TAnySchema;
            outputSchema: TAnySchema;
            resolver: (input: any) => MaybePromise<any>;
          };
        };
        // TODO: See todo in App['routes']
        routes: Route[];
      };
    }

    export interface Project<S extends ProjectSchema> {
      sdk: {
        [A in keyof S]: {
          [F in keyof S[A]['funcs']]: S[A]['funcs'][F]['resolver'];
        };
      };
      start: () => void;
    }

    export interface Plugin {
      modifyFunc?: (func: TypeApi.Func, apps: TypeApi.ProjectSchema) => TypeApi.Func;
      modifyRoute?: (route: TypeApi.Route, apps: TypeApi.ProjectSchema) => TypeApi.Route;
      onServerPreConfig?: (server: Hono, apps: TypeApi.ProjectSchema) => void;
      onServerPostConfig?: (server: Hono, apps: TypeApi.ProjectSchema) => void;
      pluginName: string;
    }
  }
}
