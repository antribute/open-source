import type { TAnySchema } from '@sinclair/typebox';
import type { Env, Handler } from 'hono';

declare global {
  // eslint-disable-next-line ts/no-namespace
  export namespace TypeApi {
    export interface Route<P extends string = string, S extends AppSchema = {}> {
      path: P;
      method: string;
      handler: Handler<Env, P>;
      restPlugin?: {
        inputSchema: TAnySchema | undefined;
        outputSchema: TAnySchema;
      };
    }
  }
}
