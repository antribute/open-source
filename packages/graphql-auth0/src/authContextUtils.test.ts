import auth0 from 'auth0';
import jwt from 'jsonwebtoken';
import { describe, expect, it, vi } from 'vitest';
import type { SpyInstance } from 'vitest';

import { getUserPerms, verifyJwt } from './authContextUtils';

describe('getUserPerms', () => {
  const mockGetUserPermissions = vi.fn();
  const managementClientSpy: SpyInstance = vi.spyOn(auth0, 'ManagementClient');
  managementClientSpy.mockImplementation(() => ({
    getUserPermissions: mockGetUserPermissions,
  }));

  it('should run auth0.getUserPermissions and then create a map of permission names', async () => {
    const MOCK_PERMS = [
      {
        permission_name: 'foo:create',
      },
    ];
    mockGetUserPermissions.mockResolvedValue(MOCK_PERMS);
    const perms = await getUserPerms('foo', {
      auth0ClientId: 'bar',
      auth0ClientSecret: 'baz',
      auth0Domain: 'qux',
    });
    expect(perms).toEqual(['foo:create']);
  });
});

describe('verifyJwt', () => {
  const verifySpy: SpyInstance = vi.spyOn(jwt, 'verify');

  it('should reject the promise if jwt.verify returns an error', () => {
    const mockErr = new Error('JWT Error');
    verifySpy.mockImplementation((_token, _rsaKey, _params, callback: (err: Error) => void) => {
      callback(mockErr);
    });
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    expect(verifyJwt('foo', 'bar')).rejects.toEqual(mockErr);
  });

  it('should resolve the promise if jwt.verify does not return an error', () => {
    const mockToken = 'foo';
    verifySpy.mockImplementation(
      (_token, _rsaKey, _params, callback: (err: Error | undefined, token: string) => void) => {
        callback(undefined, mockToken);
      }
    );
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    expect(verifyJwt('foo', 'bar')).resolves.toEqual(mockToken);
  });
});
