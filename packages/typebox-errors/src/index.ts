import type { Static, TAnySchema } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';
import type { ValueError } from '@sinclair/typebox/value';

export const Errors = {
  Check: <Schema extends TAnySchema>(schema: Schema, value: unknown) => {
    const success = Value.Check(schema, value);
    const data = Value.Cast(schema, value);
    if (success) {
      return { success, data };
    }
    return { success, data: value as Static<Schema>, error: [...Value.Errors(schema, value)] };
  },
  Message: (errors: ValueError[]) => {
    if (!errors.length) {
      throw new Error('No errors found, are you sure you passed in a failing check?');
    }
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
  },
};
