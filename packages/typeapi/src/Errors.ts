import { Type } from '@sinclair/typebox';
import type { Static, TAnySchema } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';
import { HTTPException } from 'hono/http-exception';

export const TypeApiError = Type.Object({
  error: Type.Object({
    message: Type.String(),
    details: Type.Optional(Type.String()),
  }),
  status: Type.Literal('error'),
  statusCode: Type.Number(),
});

export const StatusMessageMap: Record<number, string> = {
  404: 'Not Found',
  500: 'Internal Server Error',
};

export class ResolverError extends HTTPException {
  constructor(statusCode: number, error: string | Static<typeof TypeApiError>['error']) {
    let errorObj = error as Static<typeof TypeApiError>['error'];

    if (typeof error === 'string') {
      errorObj = {
        message: StatusMessageMap[statusCode] || error,
        details: StatusMessageMap[statusCode] ? error : undefined,
      };
    }

    super(statusCode, {
      message: errorObj.message,
      res: new Response(JSON.stringify({ error: errorObj, status: 'error', statusCode }), {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        status: statusCode,
        statusText: errorObj.message,
      }),
    });
  }
}

/** An internal error that converts a TypeBox error object to a stringified response */
export class InputValidationError extends ResolverError {
  constructor(schema: TAnySchema, value: unknown, schemaName = 'Request Parameters') {
    const errors = [...Value.Errors(schema, value)];

    const errorDetails = errors?.map(
      (error) =>
        `${error.path[0] === '/' ? error.path.slice(1) : error.path}: ${
          error.message
        } (Received value ${JSON.stringify(error.value)} of type ${typeof error.value})`
    );
    super(422, {
      message: 'Unprocessable Content',
      details: `The following validation errors were found in your ${schemaName}: ${errorDetails}`,
    });
  }
}
