import type { Static, TSchema } from '@sinclair/typebox';
import type { MaybePromise, PathParams } from './utils';

export type BodyInput<C extends TypeApi.RouteConfig> = NonNullable<C['req']>['body'] extends TSchema
  ? { body: Static<NonNullable<C['req']>['body']> }
  : { body?: unknown };

export type HeadersInput<C extends TypeApi.RouteConfig> = NonNullable<
  C['req']
>['headers'] extends TSchema
  ? { headers: Static<NonNullable<C['req']>['headers']> }
  : { headers?: unknown };

export type PathParamsInput<P extends string> = keyof PathParams<P> extends never
  ? { pathParams?: unknown }
  : { pathParams: PathParams<P> };

export type QueryInput<C extends TypeApi.RouteConfig> = NonNullable<
  C['req']
>['query'] extends TSchema
  ? { query: Static<NonNullable<C['req']>['query']> }
  : { query?: unknown };

export type ResolverInput<P extends string, C extends TypeApi.RouteConfig> = BodyInput<C> &
  HeadersInput<C> &
  QueryInput<C> &
  PathParamsInput<P>;

export type Resolver<P extends string, C extends TypeApi.RouteConfig> = (
  input: ResolverInput<P, C>
) => MaybePromise<C['res'] extends TSchema ? Static<C['res']> : unknown>;
