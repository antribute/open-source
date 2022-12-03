import { describe, expect, it } from 'vitest';
import apiHandlerConfig from './apiHandlerConfig';

describe('apiHandlerConfig', () => {
  it('should always disable the default body parser to allow GraphQL file uploads', () => {
    expect(apiHandlerConfig.api?.bodyParser).toEqual(false);
  });
});
