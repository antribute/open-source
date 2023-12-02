import type { Static, TAnySchema, TProperties } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';
import type { ValueError } from '@sinclair/typebox/value';
import type { Context, Env, MiddlewareHandler, TypedResponse, ValidationTargets } from 'hono';
import { HTTPException } from 'hono/http-exception';
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
  // So like, I'm gonna be honest, I have NO IDEA what this typing does and I'm too lazy to look
  // any further into it, but this was included in Hono's Zod validation middleware which this is
  // based off of, so I'm gonna keep it in here
  Input extends TProperties,
  V extends {
    in: HasUndefined<Input> extends true ? { [K in Target]?: Input } : { [K in Target]: Input };
    out: Static<Schema>;
  } = {
    in: HasUndefined<Input> extends true ? { [K in Target]?: Input } : { [K in Target]: Input };
    out: Static<Schema>;
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
      throw new HTTPException(422, { message: formatErrorMessage(result.error) });
    }

    const data = result.data;
    return data;
  });
