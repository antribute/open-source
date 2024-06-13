/* eslint-disable @typescript-eslint/ban-types */

const types = {
  string: 'string',
  number: 'number',
  boolean: 'boolean',
  object: 'object',
  undefined: 'undefined',
  function: 'function',
  symbol: 'symbol',
  bigint: 'bigint',
} as const;

type Type = keyof typeof types;

function getType<T>(value: T): Type {
  return typeof value as Type;
}

const c = typeof 'v';
