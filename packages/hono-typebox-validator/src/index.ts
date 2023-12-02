import type { Static, TAnySchema, TProperties } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';
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

export const formatErrorMessage = (errors: ValueError[]) => {
  const errorMessagesByField: Record<string, string[]> = {};
  errors.forEach(({ message, path }) => {
    const property = path.slice(1);
    if (!errorMessagesByField[property]) {
      errorMessagesByField[property] = [message];
      return;
    }
    errorMessagesByField[property] = [...(errorMessagesByField[property] || []), message];
  });
  const message = Object.entries(errorMessagesByField)
    .map(([property, errors]) => `${property} (${errors.join(', ')})`)
    .join(', ');
  return `The following fields are invalid: ${message}`;
};

// This mimics Zod's SafeParseAsync function and conditionally returns errors if Value.Check fails
export const checkWithErrors = <Schema extends TAnySchema>(schema: Schema, value: unknown) => {
  const success = Value.Check(schema, value);
  const data = Value.Cast(schema, value);
  if (success) {
    return { success, data };
  }
  return { success, data, error: [...Value.Errors(schema, value)] };
};

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
    const result = checkWithErrors(schema, value);

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
      return c.json({ message: formatErrorMessage(result.error) }, 422);
    }

    const data = result.data;
    return data;
  });
