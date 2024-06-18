import { Value } from '@sinclair/typebox/value';
import type { Static, TSchema } from '@sinclair/typebox';

export type MaybeStatic<S extends TSchema | unknown> = S extends TSchema ? Static<S> : unknown;
export type MaybePromise<T> = Promise<T> | T;
// Copied directly and shamelessly from Hono
export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

export const validateOptionalSchema = <O extends TSchema | undefined>(
  schema: O,
  input: unknown
): O extends TSchema ? Static<O> : unknown => {
  if (!schema) {
    return input as O extends TSchema ? Static<O> : unknown;
  }
  if (!Value.Check(schema, input)) {
    const errors = [...Value.Errors(schema, input)];
    // TODO: Actually handle errors in a sane way
    // eslint-disable-next-line no-console
    console.log(errors, Value.Check(schema, input));
    throw new Error('Unprocessable Content');
  }
  return Value.Clean(schema, Value.Clone(input)) as O extends TSchema ? Static<O> : unknown;
};
