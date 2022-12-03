import { GraphQLError } from 'graphql';
import { describe, expect, it } from 'vitest';
import notFoundErr from './notFoundErr';

describe('throwNotFound', () => {
  it('should return a GraphQL error with reasonable defaults, only expecting an id', () => {
    const err = notFoundErr('foo');
    expect(() => {
      throw err;
    }).toThrowError(GraphQLError);

    expect(err.message).toEqual('Object with id "foo" not found');
    expect(err.extensions.code).toEqual('NOT_FOUND');
    expect(err.extensions.http?.status).toEqual(404);
  });

  it('should allow a resource name and code to be passed to create more contextual errors', () => {
    const err = notFoundErr('bar', 'Thing', 'THING_NOT_FOUND');
    expect(err.message).toEqual('Thing with id "bar" not found');
    expect(err.extensions.code).toEqual('THING_NOT_FOUND');
  });
});
