import { Type } from '@sinclair/typebox';
import { describe, expect, it } from 'bun:test';

import { Errors } from '.';

const Schema = Type.Object({
  foo: Type.String(),
});

describe('Errors.Check', () => {
  it('should return the input data with an undefined error property if valid', () => {
    const { data } = Errors.Check(Schema, { foo: 'bar' });
    expect(data.foo).toBe('bar');
    expect(data).not.toHaveProperty('error');
  });

  it('should return the input data if invalid and array of errors', () => {
    const { error } = Errors.Check(Schema, { foo: null });
    expect(error).toBeArray();
  });
});

describe('Errors.Message', () => {
  it('should combine every valid error for every property into a single string', () => {
    const { error } = Errors.Check(Schema, {});
    const errorMessage = Errors.Message(error || []);
    expect(errorMessage).toBe(
      'The following fields are invalid: foo (Required property, Expected string)'
    );
  });

  it('should throw when no errors are passed in', () => {
    expect(() => Errors.Message([])).toThrow();
  });
});
