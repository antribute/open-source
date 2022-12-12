import { describe, expect, it } from 'vitest';
import { buildLoggingPrefix } from './common';

describe('buildLoggingPrefix', () => {
  it('should add a [Tracking] prefix to logs if a mixpanel token is provided', () => {
    expect(buildLoggingPrefix('foo').includes('[Tracking]:')).toEqual(true);
  });

  it('should add a [Tracking (Log Only)] prefix to logs if a mixpanel token is not provided', () => {
    expect(buildLoggingPrefix().includes('[Tracking (Log Only)]:')).toEqual(true);
  });
});
