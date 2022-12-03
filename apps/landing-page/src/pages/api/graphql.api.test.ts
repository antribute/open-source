import { describe, expect, it } from 'vitest';
import handler from './graphql.api';

describe('api/graphql', () => {
  it('should have a graphql endpoint that matches the route', () => {
    expect(handler.graphqlEndpoint).toEqual('/api/graphql');
  });
});
