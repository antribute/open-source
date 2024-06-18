import { Hono } from 'hono';
import { Logger } from './Logger';
import type { Plugin } from './Plugin';
import { TypedResponse } from './TypedResponse';
import type { RouterRoutes, RouterShape, SdkShape } from './types';

/**
 * TODO: Write a short blurb on what the router does
 */
export class Router<S extends SdkShape, R extends RouterShape<S>> {
  public config: TypeApi.RouterConfig;
  public logger = new Logger();
  public routes: RouterRoutes<S, R>;
  public shape: R;

  constructor(sdk: { shape: S }, shape: R, config: TypeApi.RouterConfig = {}) {
    this.config = config;
    this.shape = shape;

    // This code is REALLY ugly and kinda inefficient. I'd like to revisit this in the future
    this.routes = Object.entries(shape).reduce((pathMap, [path, methods]) => {
      const methodsWithResolvers = Object.entries(methods).reduce(
        (methodMap, [method, funcDef]) => {
          const fullFunc = sdk.shape[funcDef.funcName]!;
          return { [method]: { ...fullFunc, funcConfig: funcDef.config }, ...methodMap };
        },
        // If I don't use any here spreading methodMap fails as it says it's not an object?
        {} as RouterRoutes<S, R>[any]
      );
      return { [path]: methodsWithResolvers, ...pathMap };
    }, {} as RouterRoutes<S, R>);
  }

  /**
   * Takes the SDK and Router shape and neatly bundles it into a Hono application to serve requests
   */
  public async buildHono(plugins: Plugin[]) {
    let hono = new Hono();

    plugins.forEach(async (plugin) => {
      const pluginRes = await plugin.onPreRouteBuild({ hono, router: this.shape });
      hono = pluginRes.hono;
    });

    Object.entries(this.routes).forEach(([path, methods]) => {
      Object.entries(methods as RouterRoutes<S, R>[typeof path]).forEach(([method, func]) => {
        hono = hono.on([method], path, async (ctx) => {
          // TODO: Should we abstract this to its own util func somewhere?

          // In routes, a function's input can come from a few different sources. To build a pretty
          // comprehensive dictionary of inputs, we combine path params, query string params, and
          // the request body. This requires some type casting to make work since all of these
          // could be anything. To reduce the probability of errors or injections of bad data, we
          // strip anything that's not in the func's input schema during its validation process
          const pathParams: any = ctx.req.param || {};
          const queryStringParams: any = ctx.req.query() || {};
          // const body: any = (await ctx.req.json()) || {};

          const allParams = { ...pathParams, ...queryStringParams };
          const output = await func.resolver(allParams);

          if (output instanceof TypedResponse) {
            return TypedResponse;
          }

          // TODO: Add route config here for additional params
          return ctx.json(output);
        });
      });
    });

    plugins.forEach(async (plugin) => {
      const pluginRes = await plugin.onPostRouteBuild({ hono, router: this.shape });
      hono = pluginRes.hono;
    });

    return hono;
  }
}
