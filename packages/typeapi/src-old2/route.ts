import type { Static, TSchema } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';
import { Hono } from 'hono';

import type { Resolver, ResolverInput } from './types/resolver';
import { validateOptionalSchema } from './utils';

export class Route<M extends string, P extends string, C extends TypeApi.RouteConfig> {
  public config: C;
  public method: M;
  public path: P;
  public resolver: Resolver<P, C>;

  constructor(method: M, path: P, config: C, resolver: Resolver<P, C>) {
    this.config = config;
    this.method = method;
    this.path = path;

    this.resolver = async (input) => {
      const data = await resolver({
        body: validateOptionalSchema(config.req?.body, input.body),
        headers: validateOptionalSchema(config.req?.headers, input.headers),
        path: input.pathParams,
        query: validateOptionalSchema(config.req?.query, input.query),
      } as unknown as ResolverInput<P, C>);

      if (config.res) {
        return Value.Clean(config.res, Value.Clone(data)) as typeof data;
      }
      return data;
    };
  }

  public register(hono: Hono): Hono {
    return hono.route(
      '/',
      new Hono().on([this.method], this.path, async (ctx) => {
        const rawBody = ctx.req.json();
        const data = await this.resolver({
          body: rawBody,
          headers: ctx.req.header(),
          path: ctx.req.param(),
          query: ctx.req.query(),
        } as unknown as ResolverInput<P, C>);

        // TODO: We should probably allow users to set the status code, headers, content type, etc
        // before our initial release
        if (typeof data === 'object') {
          return ctx.json(data as C['res'] extends TSchema ? Static<TSchema> : unknown);
        }
        if (typeof data === 'string') {
          return ctx.html(data);
        }
        throw new TypeError(
          `Resolver must return either an object or a string, received type ${typeof data}`
        );
      })
    );
  }
}

// import type { Static, TSchema } from '@sinclair/typebox';
// import { Value } from '@sinclair/typebox/value';
// import { Hono } from 'hono';
// import type { ParamKeyToRecord, ParamKeys } from 'hono/types';

// import { validateOptionalSchema } from './utils';
// import type { MaybePromise, MaybeStatic, UnionToIntersection } from './utils';

// export type ResolverInput<
//   P extends string,
//   B extends TSchema | undefined,
//   H extends TSchema | undefined,
//   Q extends TSchema | undefined
// > = (B extends TSchema ? { body: Static<B> } : { body?: unknown }) &
//   (H extends TSchema ? { headers: Static<H> } : { headers?: unknown }) &
//   (Q extends TSchema ? { query: Static<Q> } : { query?: unknown }) &
//   (keyof UnionToIntersection<ParamKeyToRecord<ParamKeys<P>>> extends never
//     ? { path?: unknown }
//     : { path: UnionToIntersection<ParamKeyToRecord<ParamKeys<P>>> });

// export type Resolver<
//   P extends string,
//   R extends TSchema | undefined,
//   B extends TSchema | undefined,
//   H extends TSchema | undefined,
//   Q extends TSchema | undefined
// > = (input: ResolverInput<P, B, H, Q>) => MaybePromise<R extends TSchema ? Static<R> : unknown>;

// export class Route<
//   M extends string,
//   P extends string,
//   R extends TSchema | undefined = undefined,
//   B extends TSchema | undefined = undefined,
//   H extends TSchema | undefined = undefined,
//   Q extends TSchema | undefined = undefined
// > {
//   public bodySchema: B;
//   public headerSchema: H;
//   public responseSchema: R;
//   public querySchema: Q;

//   public method: M;
//   public path: P;
//   public resolver: Resolver<P, R, B, H, Q>;

//   constructor(
//     method: M,
//     path: P,
//     config: { bodySchema?: B; headersSchema?: H; querySchema?: Q; responseSchema?: R },
//     resolver: Resolver<P, R, B, H, Q>
//   ) {
//     this.bodySchema = config.bodySchema as B;
//     this.headerSchema = config.headersSchema as H;
//     this.responseSchema = config.responseSchema as R;
//     this.querySchema = config.querySchema as Q;

//     this.path = path;
//     this.method = method;

//     this.resolver = async (input) => {
//       const data = await resolver({
//         body: validateOptionalSchema<B | undefined>(config.bodySchema, input.body),
//         headers: validateOptionalSchema<H | undefined>(config.headersSchema, input.headers),
//         path: input.path,
//         query: validateOptionalSchema<Q | undefined>(config.querySchema, input.query),
//         // TODO: Can we fix needing to cast this here?
//       } as unknown as typeof input);
//       if (config.responseSchema) {
//         // Value.Clean always returns unknown, so we have to cast here
//         return Value.Clean(config.responseSchema, Value.Clone(data)) as typeof data;
//       }
//       return data;
//     };
//   }

//   public register(hono: Hono): Hono {
//     return hono.route(
//       '/',
//       new Hono().on([this.method], this.path, async (ctx) => {
//         const rawBody = ctx.req.json();
//         const data = await this.resolver({
//           body: rawBody,
//           headers: ctx.req.header(),
//           path: ctx.req.param(),
//           query: ctx.req.query(),
//           // This cast is intentional as Hono types will never overlap
//         } as unknown as ResolverInput<P, B, H, Q>);

//         if (typeof data === 'object') {
//           return ctx.json(data as NonNullable<MaybeStatic<R>>);
//         }
//         if (typeof data === 'string') {
//           return ctx.html(data);
//         }
//         throw new TypeError(
//           `Resolver must return either an object or a string, received type ${typeof data}`
//         );
//       })
//     );
//   }
// }
