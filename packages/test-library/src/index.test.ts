import { expect, it } from 'vitest';

import testFunc from '.';

it('should return Hello, World! by default', () => {
  expect(testFunc()).toEqual('Hello, World!');
});
