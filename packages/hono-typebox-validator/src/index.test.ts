import { Type } from '@sinclair/typebox';
import { describe, expect, it } from 'bun:test';
import { Hono } from 'hono';

import { tbValidator } from 'index';

const Schema = Type.Object({
  name: Type.String(),
  age: Type.Number(),
  role: Type.Optional(Type.String()),
});

describe('tbValidator', () => {
  const app = new Hono();

  app.post('/test-endpoint', tbValidator('json', Schema), (c) => {
    const data = c.req.valid('json');
    return c.json(
      {
        parsedBody: data,
      },
      200
    );
  });

  app.post(
    '/test-hook-endpoint',
    tbValidator('json', Schema, (result, c) => {
      if (!result.success) {
        return c.json({ customMessage: 'This is a custom message' }, 418);
      }
      return undefined;
    }),
    (c) => {
      const data = c.req.valid('json');
      return c.json(
        {
          parsedBody: data,
        },
        200
      );
    }
  );

  it('should return a 422 error with message when JSON body is invalid', async () => {
    const res = await app.request('/test-endpoint', {
      headers: new Headers({ 'Content-Type': 'application/json' }),
      method: 'post',
      body: JSON.stringify({
        name: 2,
      }),
    });

    const json = await res.json();
    expect(json).toHaveProperty('message');
    expect(res.status).toBe(422);
  });

  it('should execute the remainder of the request when the JSON body is valid', async () => {
    const res = await app.request('/test-endpoint', {
      headers: new Headers({ 'Content-Type': 'application/json' }),
      method: 'post',
      body: JSON.stringify({
        name: 'Test Name',
        age: 25,
      }),
    });

    const json = await res.json();
    expect(json).toEqual({
      parsedBody: {
        name: 'Test Name',
        age: 25,
      },
    });
    expect(res.status).toBe(200);
  });

  it('should allow custom error responses when used as a hook', async () => {
    const res = await app.request('/test-hook-endpoint', {
      headers: new Headers({ 'Content-Type': 'application/json' }),
      method: 'post',
      body: JSON.stringify({
        name: 2,
      }),
    });

    const json = await res.json();
    expect(json).toHaveProperty('customMessage');
    expect(res.status).toBe(418);
  });
});
