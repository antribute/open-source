/* eslint-disable @typescript-eslint/prefer-reduce-type-parameter */
import { Primitive } from 'zod';

type PickPrimitiveObjectProperties<T> = {
  [K in keyof T as T[K] extends Exclude<Primitive, symbol> ? K : never]: T[K];
};

/**
 * Picks only properties with primitive values
 * from an object and returns a new object with those properties.
 *
 * @returns A new object containing only the properties with primitive values.
 *
 */
export function pickPrimitiveObjectProperties<T extends object>(
  obj: T
): PickPrimitiveObjectProperties<T> {
  return Object.entries(obj).reduce((result, [key, value]) => {
    if (
      typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'boolean' ||
      typeof value === 'bigint' ||
      typeof value === 'symbol' ||
      value === null ||
      value === undefined
    ) {
      result[key as keyof PickPrimitiveObjectProperties<T>] = value;
    }
    return result;
  }, {} as PickPrimitiveObjectProperties<T>);
}
