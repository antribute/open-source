import { GraphQLError } from 'graphql';
import { describe, expect, it } from 'vitest';
import forbiddenErr from './forbiddenErr';

describe('forbiddenErr', () => {
  it('should return a GraphQL error', () => {
    const err = forbiddenErr();
    expect(() => {
      throw err;
    }).toThrowError(GraphQLError);

    expect(err.message).toEqual('You do not have permission to access this object');
    expect(err.extensions.code).toEqual('FORBIDDEN');
    expect(err.extensions.http?.status).toEqual(403);
  });

  it('should allow the error code to be overridden', () => {
    const err = forbiddenErr('BAD_ROLE');

    expect(err.message).toEqual('You do not have permission to access this object');
    expect(err.extensions.code).toEqual('BAD_ROLE');
    expect(err.extensions.http?.status).toEqual(403);
  });
});
