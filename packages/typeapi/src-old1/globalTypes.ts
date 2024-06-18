import type { Static, TAnySchema, TSchema } from '@sinclair/typebox';
import type { Env, Handler, Hono } from 'hono';

import type { MaybePromise } from './utils';

declare global {
  // eslint-disable-next-line ts/no-namespace
  export namespace TypeApi {
    export interface Func<I extends TSchema | undefined, O extends TSchema> {
      inputSchema: I | undefined;
      outputSchema: O;
      resolver: (input: I extends TSchema ? Static<I> : unknown) => MaybePromise<Static<O>>;
    }

    export interface Funcs {
      [FuncName: string]: {
        inputSchema: TAnySchema | undefined;
        outputSchema: TAnySchema;
        resolver: (input: any) => MaybePromise<any>;
      };
    }

    export interface Route<
      F extends Funcs,
      N extends keyof Funcs = keyof Funcs,
      P extends string = string,
      M extends string = string
    > {
      func?: F[N];
      path: P;
      method: M;
    }

    // eslint-disable-next-line ts/ban-types
    export interface Router<F extends Funcs = {}> {
      [PathName: string]: {
        [methodName: string]: {
          funcName?: keyof F;
          resolver: Hono;
        };
      };
    }

    // eslint-disable-next-line ts/ban-types
    export interface App<F extends Funcs = {}> {
      hono: Hono; // TODO: Can we combine Hono types from a router generic?
      sdk: {
        [N in keyof F]: F[N]['resolver'];
      };
      start: () => void;
    }
  }
}
