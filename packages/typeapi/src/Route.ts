import { Any, Type } from '@sinclair/typebox';
import type { TAnySchema, TParameters } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';
import { Hono } from 'hono';
import type { Context } from 'hono';
import type { Env } from 'hono/types';

import { InputValidationError } from './Errors';
import type { RouteResolver, RouteResolverInput, RouteSchema } from './types';

export class Route<P extends string, M extends string, S extends RouteSchema<P>> {
  public config: TypeApi.RouteConfig;
  public path: P;
  public method: M;
  public resolver: RouteResolver<P, S>;
  protected originalResolver: RouteResolver<P, S>;
  public schema: S;

  constructor(
    path: P,
    method: M,
    resolver: RouteResolver<P, S>,
    schema?: S,
    config?: TypeApi.RouteConfig
  ) {
    this.config = config || {};
    this.path = path;
    this.method = method;
    this.originalResolver = resolver;
    this.schema = schema || ({} as S);

    // Construct a new version of the included resolver with built-in validation
    this.resolver = (input) => {
      const validatedInput = this.validateRequest(input);
      const res = this.originalResolver(validatedInput);
      return res;
    };
  }

  /**
   * Wraps your resolver in a Hono instance, allowing it to be used inside of TypeAPI apps as well
   * as any other Hono app
   */
  public register(plugins: TypeApi.Plugin[]) {
    let hono = new Hono({ strict: false });

    plugins.forEach((plugin) => {
      hono = plugin.onRoutePreRegister(hono, this as TypeApi.Route);
    });

    hono = hono.on(this.method, this.path, async (ctx) => {
      const body = await this.parseRequestBody(ctx.req);

      const honoInput = {
        body,
        headers: ctx.req.header,
        path: ctx.req.param(),
        query: ctx.req.query(),
      } as RouteResolverInput<P, S>;
      const res = await this.resolver(honoInput);

      return this.createResponse(res);
    });

    plugins.forEach((plugin) => {
      hono = plugin.onRoutePostRegister(hono, this as TypeApi.Route);
    });

    return hono;
  }

  /**
   * Creates a Web API Response based off of your resolver's content type
   */
  private createResponse({ body, headers, status }: Awaited<ReturnType<RouteResolver<P, S>>>) {
    let contentType = headers?.['Content-Type'] ?? headers?.['content-type'];
    let parsedBody: unknown = body;

    // If the resolver doesn't return a content type header, let's try to infer one based off of
    // the resolver's body
    if (!contentType || Array.isArray(contentType)) {
      // If the content is an object or array, we can assume it's a
      if (typeof body === 'object' || Array.isArray(body)) {
        contentType = 'application/json; charset=UTF-8';
      } else if (typeof body === 'string' && body.includes('<') && body.includes('>')) {
        contentType = 'text/html; charset=UTF-8';
      } else {
        contentType = 'text/plain';
      }
    }

    // Now that we have a content type, let's go ahead and stringify any non-string bodies
    if (typeof body !== 'string') {
      parsedBody = JSON.stringify(body);
    }

    // TODO: Remove any (this looks like it's bun related)
    return new Response(parsedBody, {
      headers: {
        ...headers,
        'Content-Type': contentType,
      } as any,
      status: status || 200,
    });
  }

  /**
   * Attempts to parse the request's body based off of the request's content type header, returns
   * the raw body if content type is either not provided or not supported
   */
  private async parseRequestBody(req: Context<Env, P, object>['req']): Promise<any> {
    const reqContentType = req.header('Content-Type') || req.header('content-type');

    if (reqContentType?.includes('application/json')) {
      const body = await req.json();
      return body;
    }

    if (
      reqContentType?.includes('application/x-www-form-urlencoded') ||
      reqContentType?.includes('multipart/form-data')
    ) {
      const body = await req.parseBody();
      return body;
    }

    if (reqContentType?.includes('text/plain')) {
      const body = await req.text();
      return body;
    }

    // If the request doesn't have a content type that TypeAPI understands, return the raw body
    // We're comfortable doing this since we validate the body in the resolver
    return req.raw.body;
  }

  /**
   * Validates an unknown request body with the route's TypeBox schema and automatically adds any
   * missing fields that contain default values
   */
  private validateRequest(resolverInput: RouteResolverInput<P, S>) {
    const bodySchema = this.schema.input?.body;
    const headersSchema = this.schema.input?.headers;
    const pathSchema = this.schema.input?.path;
    const querySchema = this.schema.input?.query;

    const parsedRequestInput = {
      body: this.validateWithDefaults<RouteResolverInput<P, S>['body']>(
        bodySchema ? Type.Object(bodySchema) : Any(),
        resolverInput.body,
        { schemaName: 'Request Body' }
      ),
      headers: this.validateWithDefaults<RouteResolverInput<P, S>['headers']>(
        headersSchema ? Type.Object(headersSchema) : Any(),
        resolverInput.headers,
        { schemaName: 'Request Headers' }
      ),
      path: this.validateWithDefaults<RouteResolverInput<P, S>['path']>(
        bodySchema ? Type.Object(pathSchema as TParameters<any>) : Any(),
        resolverInput.path,
        // By default all path params are strings. Sometimes an endpoint might want a path param to
        // be a number. Because of this, we allow conversions for path param values
        { convert: true, schemaName: 'Path Parameters' }
      ),
      query: this.validateWithDefaults<RouteResolverInput<P, S>['query']>(
        querySchema ? Type.Object(querySchema) : Any(),
        resolverInput.query,
        { schemaName: 'Query String Parameters' }
      ),
    };

    return parsedRequestInput as RouteResolverInput<P, S>;
  }

  private validateWithDefaults<V>(
    schema: TAnySchema,
    value: V,
    opts?: { convert?: boolean; schemaName?: string }
  ) {
    let parsedData = Value.Clean(schema, Value.Default(schema, value));
    if (opts?.convert) {
      parsedData = Value.Convert(schema, parsedData);
    }

    if (!Value.Check(schema, parsedData)) {
      throw new InputValidationError(schema, parsedData, opts?.schemaName);
    }

    // Note: TypeBox intentionally returns type "unknown" for Value.Clean and Value.Convert and
    // recommends to check (which we're doing above) and cast values after those operations. This
    // function is very intentionally casting parsedData to V
    return parsedData as V;
  }
}
