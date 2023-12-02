import { Errors } from '@antribute/typebox-errors';
import type { Static, TAnySchema, TProperties } from '@sinclair/typebox';
import type { ValueError } from '@sinclair/typebox/value';
import type { Context, Env, MiddlewareHandler, TypedResponse, ValidationTargets } from 'hono';
import { validator } from 'hono/validator';

export type Hook<Schema extends TAnySchema, E extends Env, P extends string, O = object> = (
  result:
    | { success: true; data: Static<Schema> }
    | { success: false; error: ValueError[]; data: Static<Schema> },
  c: Context<E, P>
) => Response | Promise<Response> | void | Promise<Response | void> | TypedResponse<O>;

type HasUndefined<T> = undefined extends T ? true : false;

export const tbValidator = <
  Schema extends TAnySchema,
  Target extends keyof ValidationTargets,
  Environment extends Env,
  Path extends string,
  Input extends TProperties,
  Output extends Static<Schema>,
  V extends {
    in: HasUndefined<Input> extends true ? { [K in Target]?: Input } : { [K in Target]: Input };
    out: { [K in Target]: Output };
  } = {
    in: HasUndefined<Input> extends true ? { [K in Target]?: Input } : { [K in Target]: Input };
    out: { [K in Target]: Output };
  }
>(
  target: Target,
  schema: Schema,
  hook?: Hook<Schema, Environment, Path>
): MiddlewareHandler<Environment, Path, V> =>
  validator(target, async (value, c) => {
    const result = Errors.Check(schema, value);

    if (hook) {
      const hookResult = hook(result, c);
      if (hookResult) {
        if (hookResult instanceof Response || hookResult instanceof Promise) {
          return hookResult;
        }
        if ('response' in hookResult) {
          return hookResult.response;
        }
      }
    }

    if (!result.success) {
      return c.json({ message: Errors.Message(result.error) }, 422);
    }

    const data = result.data;
    return data;
  });
