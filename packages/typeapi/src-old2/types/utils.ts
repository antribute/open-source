import type { ParamKeyToRecord, ParamKeys } from 'hono/types';

export type MaybePromise<T> = Promise<T> | T;

export type PathParams<P extends string> = UnionToIntersection<ParamKeyToRecord<ParamKeys<P>>>;

// UnionToIntersection was copied directly and shamelessly from Hono
export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;
