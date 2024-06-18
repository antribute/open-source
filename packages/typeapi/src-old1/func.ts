import { Value } from '@sinclair/typebox/value';
import type { Static, TSchema } from '@sinclair/typebox';
import type { MaybePromise } from './utils';

// export interface FuncParams<I extends TSchema | undefined, O extends TSchema> {
//   inputSchema?: I;
//   outputSchema: O;
// }

// export function func<I extends TSchema, O extends TSchema>(
//   { inputSchema, outputSchema }: FuncParams<I, O>,
//   resolver: TypeApi.Func<I, O>['resolver']
// ): TypeApi.Func<I, O> {
//   return {
//     inputSchema,
//     outputSchema,
//     resolver,
//   };
// }

// , resolver: () => MaybePromise<Static<O>>

type Resolver<I extends TSchema | undefined, O extends TSchema> = I extends TSchema
  ? (input: Static<I>) => MaybePromise<Static<O>>
  : (input?: unknown) => MaybePromise<Static<O>>;

export class Func<I extends TSchema | undefined, O extends TSchema> {
  inputSchema: I;
  outputSchema: O;
  resolver: Resolver<I, O>;

  constructor(outputSchema: O, resolver: Resolver<I, O>, inputSchema?: I) {
    this.inputSchema = inputSchema as I;
    this.outputSchema = outputSchema;
    this.resolver = (async (input: unknown) => {
      if (inputSchema && !Value.Check(inputSchema, input)) {
        const errors = [...Value.Errors(inputSchema, input)];
        // TODO: Actually handle errors in a sane way
        // eslint-disable-next-line no-console
        console.log(errors, Value.Check(inputSchema, input));
        throw new Error('Unprocessable Content');
      }
      const data = await resolver(input);
      return Value.Clean(outputSchema, Value.Clone(data));
    }) as Resolver<I, O>;
  }
}
