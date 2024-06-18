import { Kind } from '@sinclair/typebox';
import type { TAnySchema, TSchema } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';

import { ValidationError } from './Errors';
import type { FuncResolver } from './types';

/**
 * TODO: Write a short blurb on what the func does
 */
export class Func<I extends TSchema = TAnySchema, O extends TSchema = TAnySchema> {
  public config: TypeApi.FuncConfig;
  public inputSchema: I;
  public outputSchema: O;
  public originalResolver: FuncResolver<I, O>;
  public resolver: FuncResolver<I, O>;

  constructor(
    inputSchema: I,
    outputSchema: O,
    resolver: FuncResolver<I, O>,
    config: TypeApi.FuncConfig = {}
  ) {
    this.config = config;
    this.inputSchema = inputSchema;
    this.outputSchema = outputSchema;
    this.originalResolver = resolver;

    const resolverWithValidation = async (input: I) => {
      let parsedInput = input;
      if (inputSchema[Kind] !== 'Never' && !config.skipInputValidation) {
        parsedInput = this.validateAndClean(this.inputSchema, input, 'Input Validation Failed');
      }

      const output = await this.originalResolver(parsedInput);

      if (!config.skipOutputValidation) {
        return this.validateAndClean(this.outputSchema, output, 'Output Validation Failed');
      }

      return output;
    };

    // For some reason this needs to be cast, not sure why but I know it had something to do with
    // turning Type.Never() into a 0 param call. Idk but this fixes things well enough to ignore it
    this.resolver = resolverWithValidation as FuncResolver<I, O>;
  }

  private validateAndClean<D>(schema: TAnySchema, data: D, message: string): D {
    // We use Value.Default to ensure that any missing properties that include default values in
    // the schema are given their default values. We also use Value.Clean to strip the object of
    // any values that aren't a part of the schema. Per TypeBox's docs, both of these functions
    // intentionally return unknown and should be used alongside Value.Check before being cast to
    // their appropriate type

    const parsedData = Value.Clean(schema, Value.Default(schema, Value.Clone(data))) as D;

    if (!Value.Check(schema, parsedData)) {
      throw new ValidationError(schema, parsedData, message);
    }

    return parsedData;
  }
}
