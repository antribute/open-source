import type { Static, TSchema } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';

export interface CreateFuncParams<
  I extends TSchema | undefined,
  O extends TSchema,
  IS = I extends TSchema ? Static<I> : unknown,
  OS = Static<O>
> {
  inputSchema?: I;
  outputSchema: O;
  resolver: TypeApi.Func<I, O, IS, OS>['resolver'];
}

export const createFunc = <
  I extends TSchema | undefined,
  O extends TSchema,
  IS = I extends TSchema ? Static<I> : unknown,
  OS = Static<O>
>({
  inputSchema,
  outputSchema,
  resolver,
}: CreateFuncParams<I, O, IS, OS>): TypeApi.Func<I, O, IS, OS> => ({
  inputSchema,
  outputSchema,
  resolver: async (input) => {
    if (inputSchema && Value.Check(inputSchema, input)) {
      const errors = Value.Errors(inputSchema, input);
      // TODO: Actually handle errors in a sane way
      // eslint-disable-next-line no-console
      console.log(errors);
      throw new Error('Unprocessable Content');
    }
    const data = await resolver(input);
    return data as OS;
  },
});
