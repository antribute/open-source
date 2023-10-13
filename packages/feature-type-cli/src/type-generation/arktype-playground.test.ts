/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import { describe, expect, it } from 'bun:test';
import { makeEnum } from 'utils/arktype-helpers';

describe('arktype-playground', () => {
  it('createBox', () => {
    expect(true).toEqual(true);
  });
  it('query-builder', () => {
    const OperatorEnum = makeEnum('OperatorEnum', [
      '$gt',
      '$gte',
      '$lte',
      '$lt',
      '$eq',
      '$ne',
      '$in',
      '$nin',
    ]);
    console.log(OperatorEnum);
  });
});
