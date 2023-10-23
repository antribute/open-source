import { Type, narrow, type } from 'arktype';

export type CondType = 'number' | 'string' | 'array' | 'boolean';

export type GroupOperator = '$and' | '$or';

// Based on these conditions
export type Condition = '$gt' | '$gte' | '$lte' | '$lt' | '$eq' | '$ne' | '$in' | '$nin';

const equality = <T,>(of: Type<T>) => type(['===', of]);

const OperatorSymbolSchema = type(
  '"$gt" | "$gte" | "$lte" | "$lt" | "$eq" | "$ne" | "$in" | "$nin"'
);

console.log('OperatorSymbolSchema', OperatorSymbolSchema);

const conditions = {
  greaterThan: {
    symbol: '$gt',
    phrase: 'greater than',
    operator: '>',
    typeValidation: {
      number: (v: number) => type(`number>${v}`),
    },
  },
  greaterThanOrEqual: {
    symbol: '$gte',
    phrase: 'greater than or equal to',
    operator: '>=',
    typeValidation: {
      number: (v: number) => type(`number>=${v}`),
    },
  },
  lessThan: {
    symbol: '$lt',
    phrase: 'less than',
    operator: '<',
    typeValidation: {
      number: (v: number) => type(`number<${v}`),
    },
  },
  lessThanOrEqual: {
    symbol: '$lte',
    phrase: 'less than or equal to',
    operator: '<=',
    typeValidation: {
      number: (v: number) => type(`number<=${v}`),
    },
  },
  equal: {
    symbol: '$eq',
    phrase: 'equal to',
    operator: '===',
    typeValidation: {
      number: (v: number) => type(['===', v]),
      string: (v: string) => type(['===', v]),
    },
  },
  notEqual: {
    symbol: '$ne',
    phrase: 'not equal to',
    operator: '!==',
    schema: (v: string | number | boolean, options: string[] | number[]) =>
      narrow(type('string|number'), (v) => options.some((o) => o === v)),
  },
  in: {
    symbol: '$in',
    phrase: 'in',
    operator: 'in',
    schema: (v: string | number) => narrow('()', (s) => s === v),
  },
  notIn: {
    symbol: '$nin',
    phrase: 'not in',
    operator: 'not in',
  },
} satisfies Record<
  string,
  { symbol: string; operator: string; phrase: string } & Record<string, unknown>
>;

export const ReactQueryBuilder = () => {
  return <div>QueryBuilder</div>;
};
