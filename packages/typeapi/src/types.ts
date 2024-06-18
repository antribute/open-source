import type { Static, TObject, TSchema } from '@sinclair/typebox';
import type { ParamKeyToRecord, ParamKeys } from 'hono/types';
import type { UnionToIntersection } from 'hono/utils/types';

// All of these typings are utilities surrounding creating fully-typed optional validation schemas
// for routes. These aren't intended to be extended by plugins and are intentionally omitted from
// our global type definitions

export type MaybePromise<T> = Promise<T> | T;

export type AnyProperties = Record<any, TSchema>;

export type OptionalObjectParamsStatic<S extends AnyProperties | undefined> =
  S extends AnyProperties ? Static<TObject<S>> : unknown;
export type OptionalSchemaStatic<S extends TSchema | undefined> = S extends TSchema
  ? Static<S>
  : unknown;

export type PathParams<P extends string> = UnionToIntersection<ParamKeyToRecord<ParamKeys<P>>>;
export type PathParamsSchema<P extends string> = Record<keyof PathParams<P>, TSchema>;

export interface RouteSchema<P extends string> {
  input?: {
    body?: AnyProperties;
    headers?: AnyProperties;
    path?: PathParamsSchema<P>;
    query?: AnyProperties;
  };
  output?: { body?: TSchema };
}

export type RouteResolverInput<
  P extends string,
  S extends RouteSchema<P>
> = S['input'] extends object
  ? {
      body: OptionalObjectParamsStatic<S['input']['body']>;
      headers: OptionalObjectParamsStatic<S['input']['headers']>;
      path: S['input']['path'] extends PathParamsSchema<P>
        ? Static<TObject<S['input']['path']>>
        : PathParams<P>;
      query: OptionalObjectParamsStatic<S['input']['query']>;
    }
  : { body?: unknown; headers?: unknown; path: PathParams<P>; query?: unknown };

export type RouteResolverBody<
  P extends string,
  S extends RouteSchema<P>
> = S['output'] extends object ? OptionalSchemaStatic<S['output']['body']> : unknown;

export interface RouteResolverOutput<P extends string, S extends RouteSchema<P>> {
  body: RouteResolverBody<P, S>;
  headers?: Record<string, string | string[]>;
  status?: number;
}

export type RouteResolver<P extends string, S extends RouteSchema<P>> = (
  input: RouteResolverInput<P, S>
) => MaybePromise<RouteResolverOutput<P, S>>;
