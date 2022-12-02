import { GraphQLError } from 'graphql';
import { describe, expect, it } from 'vitest';
import unauthorizedErr from './unauthorizedErr';

describe('unauthorizedErr', () => {
  it('should return a GraphQL error', () => {
    const err = unauthorizedErr();
    expect(() => {
      throw err;
    }).toThrowError(GraphQLError);

    expect(err.message).toEqual('Unauthorized');
    expect(err.extensions.code).toEqual('UNAUTHORIZED');
    expect(err.extensions.http?.status).toEqual(401);
  });

  it('should allow the error code to be overridden', () => {
    const err = unauthorizedErr('BAD_TOKEN');

    expect(err.message).toEqual('Unauthorized');
    expect(err.extensions.code).toEqual('BAD_TOKEN');
    expect(err.extensions.http?.status).toEqual(401);
  });
});
