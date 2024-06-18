import type { TAnySchema } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';
import type { ValueError } from '@sinclair/typebox/value';

/**
 * Throws an error based off of a given TypeBox Schema and an unknown, incorrect value
 */
export class ValidationError extends Error {
  public rawValidationErrors: ValueError[];
  public validationErrors: Record<string, string>;

  constructor(schema: TAnySchema, data: unknown, message = 'Validation Failed') {
    const errors = [...Value.Errors(schema, data)];
    super(message);

    this.rawValidationErrors = errors;

    // Puts all validation errors into a nice, pretty object easy to parse and log
    this.validationErrors = errors.reduce(
      (acc, { message, path }) => ({ [path]: message, ...acc }),
      {} as Record<string, string>
    );

    // TODO: Add loglevel or some shit in here idk
    console.error(schema);
  }
}
