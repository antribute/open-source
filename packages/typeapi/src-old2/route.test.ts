import { describe, expect, it } from 'bun:test';
import { Type } from '@sinclair/typebox';
import { Hono } from 'hono';

import { Route } from './route';

describe('Route', () => {
  const testSchema = Type.Object({ foo: Type.String() });

  describe('hono', () => {
    it("should pass Hono's request body, request headers, path params, and query string to this.resolve", async () => {
      const route = new Route('post', '/:foo', {}, ({ body, headers, path, query }) => ({
        body,
        headers,
        path,
        query,
      }));
      const app = new Hono().route('/', route.hono);

      const res = await app.request('/bar', { method: 'post' });
      const json = await res.json();
      expect(json).toEqual({
        body: {},
        headers: {},
        path: { foo: 'bar' },
        query: {},
      });
    });
  });

  describe('resolver', () => {
    it('should require path if path params are detected in URL', async () => {
      const route = new Route('get', '/:foo', {}, ({ path }) => ({ path }));

      const output = await route.resolver({ path: { foo: 'bar' } });
      expect(output).toEqual({ path: { foo: 'bar' } });
    });

    it('should require body if bodySchema is provided', async () => {
      const route = new Route(
        'get',
        '/',
        {
          bodySchema: testSchema,
        },
        ({ body }) => ({ body })
      );

      const output = await route.resolver({ body: { foo: 'bar' } });
      expect(output).toEqual({ body: { foo: 'bar' } });
    });

    it('should require query if querySchema is provided', async () => {
      const route = new Route(
        'get',
        '/',
        {
          querySchema: testSchema,
        },
        ({ query }) => ({ query })
      );

      const output = await route.resolver({ query: { foo: 'bar' } });
      expect(output).toEqual({ query: { foo: 'bar' } });
    });

    it('should remove any properties not included in the response schema if provided', async () => {
      const route = new Route(
        'get',
        '/',
        {
          responseSchema: testSchema,
        },
        () => ({ foo: 'baz', bar: 'qux' })
      );

      const output = await route.resolver({ query: { foo: 'bar' } });
      expect(output).toEqual({ foo: 'baz' });
      expect(output).not.toHaveProperty('bar');
    });
  });

  describe('validate', () => {
    const route = new Route('get', '/', {}, () => {});
    it('should return the raw input as type unknown if no schema is passed', () => {
      const output = route.validate(undefined, { foo: 'bar' });
      expect(output).toEqual({ foo: 'bar' });
    });

    it('should throw an error if the provided input does not match the provided schema', () => {
      expect(() => route.validate(testSchema, { foo: 1 })).toThrow();
    });

    it('should remove any properties not included in the schema', () => {
      const output = route.validate(testSchema, { foo: 'bar', baz: 'qux' });
      expect(output).toEqual({ foo: 'bar' });
      expect(output).not.toHaveProperty('baz');
    });
  });
});
