import type { Static, TAnySchema, TSchema } from '@sinclair/typebox';
import type { Hono } from 'hono';
import type { Plugin } from './Plugin';
import type { TypedResponse } from './TypedResponse';

//
// Funcs
//

export type FuncResolver<I extends TSchema, O extends TSchema> = Static<I> extends never
  ? () => Promise<Static<O>>
  : (input: Static<I>) => Promise<Static<O> | TypedResponse<Static<O>>>;

//
// Sdk
//

export type SdkFuncs<S extends SdkShape> = {
  [F in keyof S]: S[F]['resolver'];
};

export interface SdkShape {
  // Right now this type is essentially manually copied from the shape of the Func class. It would
  // be super cool if we could do this automatically to avoid human error. This pattern is inspired
  // by Hono and its fully-typed router
  [funcName: string]: {
    config: TypeApi.FuncConfig;
    inputSchema: TAnySchema;
    outputSchema: TAnySchema;
    resolver: (input: any) => Promise<any>;
  };
}

//
// Router
//

export type RouterRoutes<S extends SdkShape, R extends RouterShape<S>> = {
  [P in keyof R]: {
    [M in keyof R[P]]: { func: S[R[P][M]['funcName']]; config: TypeApi.RouteConfig };
  };
};

export interface RouterShape<S extends SdkShape> {
  [path: string]: {
    [method: string]: {
      funcName: keyof S;
      config?: TypeApi.RouteConfig;
    };
  };
}

//
// App
//

export interface AppShape {
  plugins?: Plugin[];
  router: {
    buildHono: (plugins: Plugin[]) => Promise<Hono>;
    routes: {
      [path: string]: {
        [method: string]: {
          func: {
            config: TypeApi.FuncConfig;
            inputSchema: TAnySchema;
            outputSchema: TAnySchema;
            resolver: (input: any) => Promise<any>;
          };
          config: TypeApi.RouteConfig;
        };
      };
    };
  };
}
