import { describe, expect, it } from 'vitest';

import createAuthScopes from './createAuthScopes';

describe('createAuthScopes', () => {
  it('should transform an array of strings into a valid map of auth scopes', () => {
    const MOCK_USER_PERMISSIONS = [
      'foo:create',
      'foo:deleteAny',
      'foo:deleteOwned',
      'foo:readAny',
      'foo:readOwned',
      'foo:updateAny',
      'foo:updateOwned',
    ];
    const MOCK_MODELS = ['foo', 'bar'] as const;
    const authScopes = createAuthScopes(MOCK_MODELS)({
      loggedIn: true,
      permissions: MOCK_USER_PERMISSIONS,
    });
    expect(authScopes['foo:create']).toEqual(true);
    expect(authScopes['foo:deleteAny']).toEqual(true);
    expect(authScopes['foo:deleteOwned']).toEqual(true);
    expect(authScopes['foo:readAny']).toEqual(true);
    expect(authScopes['foo:readOwned']).toEqual(true);
    expect(authScopes['foo:updateAny']).toEqual(true);
    expect(authScopes['foo:updateOwned']).toEqual(true);
    expect(authScopes['bar:create']).toEqual(false);
    expect(authScopes['bar:deleteAny']).toEqual(false);
    expect(authScopes['bar:deleteOwned']).toEqual(false);
    expect(authScopes['bar:readAny']).toEqual(false);
    expect(authScopes['bar:readOwned']).toEqual(false);
    expect(authScopes['bar:updateAny']).toEqual(false);
    expect(authScopes['bar:updateOwned']).toEqual(false);
  });

  it('should return every auth scope as false if the user is not logged in', () => {
    const MOCK_USER_PERMISSIONS = [
      'foo:create',
      'foo:deleteAny',
      'foo:deleteOwned',
      'foo:readAny',
      'foo:readOwned',
      'foo:updateAny',
      'foo:updateOwned',
    ];
    const MOCK_MODELS = ['foo', 'bar'] as const;
    const authScopes = createAuthScopes(MOCK_MODELS)({
      loggedIn: false,
      permissions: MOCK_USER_PERMISSIONS,
    });
    expect(authScopes['foo:create']).toEqual(false);
    expect(authScopes['foo:deleteAny']).toEqual(false);
    expect(authScopes['foo:deleteOwned']).toEqual(false);
    expect(authScopes['foo:readAny']).toEqual(false);
    expect(authScopes['foo:readOwned']).toEqual(false);
    expect(authScopes['foo:updateAny']).toEqual(false);
    expect(authScopes['foo:updateOwned']).toEqual(false);
    expect(authScopes['bar:create']).toEqual(false);
    expect(authScopes['bar:deleteAny']).toEqual(false);
    expect(authScopes['bar:deleteOwned']).toEqual(false);
    expect(authScopes['bar:readAny']).toEqual(false);
    expect(authScopes['bar:readOwned']).toEqual(false);
    expect(authScopes['bar:updateAny']).toEqual(false);
    expect(authScopes['bar:updateOwned']).toEqual(false);
  });
});
