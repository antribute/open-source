import { createSchema } from 'graphql-yoga';
import { describe, expect, it } from 'vitest';
import createHandler from './createHandler';

describe('createHandler', () => {
  it('should create a GraphQL server', async () => {
    const MOCK_RESPONSE = 'world';
    interface QueryResponse {
      data: {
        hello: string;
      };
    }
    const schema = createSchema<never>({
      typeDefs: `
        type Query {
          hello: String
        }
      `,
      resolvers: {
        Query: {
          hello: () => MOCK_RESPONSE,
        },
      },
    });

    const localServer = createHandler({ schema });
    const res = await localServer.fetch('http://localhost:4000/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: '{ hello }' }),
    });
    const json = (await res.json()) as QueryResponse;
    expect(json.data.hello).toBe(MOCK_RESPONSE);
  });
});
