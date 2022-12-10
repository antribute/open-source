import { afterEach, describe, expect, it, vi } from 'vitest';

import * as authContextUtils from './authContextUtils';
import createAuthContext from './createAuthContext';

const MOCK_AUTH_CONTEXT_PARAMS = {
  auth0ClientId: 'foo',
  auth0ClientSecret: 'bar',
  auth0Domain: 'antribute.com',
};

interface MockServerContext {
  req: {
    headers: {
      Authorization?: string | string[];
    };
  };
}

describe('createAuthContext', () => {
  const getPublicKeySpy = vi.spyOn(authContextUtils, 'getPublicKey');
  const getUserPermsSpy = vi.spyOn(authContextUtils, 'getUserPerms');
  const verifyJwtSpy = vi.spyOn(authContextUtils, 'verifyJwt');

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should return the logged out variant if no token is provided', async () => {
    const MOCK_CONTEXT: MockServerContext = {
      req: {
        headers: {},
      },
    };
    const authContextCreator = createAuthContext<MockServerContext>(MOCK_AUTH_CONTEXT_PARAMS);
    const authContext = await authContextCreator(MOCK_CONTEXT);
    expect(authContext).toEqual({ loggedIn: false, permissions: [] });
  });

  it('should return the logged out variant if the authorization header is an array', async () => {
    const MOCK_CONTEXT: MockServerContext = {
      req: {
        headers: {
          Authorization: ['foo', 'bar'],
        },
      },
    };
    const authContextCreator = createAuthContext<MockServerContext>(MOCK_AUTH_CONTEXT_PARAMS);
    const authContext = await authContextCreator(MOCK_CONTEXT);
    expect(authContext).toEqual({ loggedIn: false, permissions: [] });
  });

  it('should return the logged out variant if bearer is not provided before the token', async () => {
    const MOCK_CONTEXT: MockServerContext = {
      req: {
        headers: {
          Authorization: 'My super cool yet unformatted token',
        },
      },
    };
    const authContextCreator = createAuthContext<MockServerContext>(MOCK_AUTH_CONTEXT_PARAMS);
    const authContext = await authContextCreator(MOCK_CONTEXT);
    expect(authContext).toEqual({ loggedIn: false, permissions: [] });
  });

  it('should throw a "malformatted user" error if verifyJWT returns invalid output', () => {
    getPublicKeySpy.mockImplementation(() => Promise.resolve('mock public key'));
    verifyJwtSpy.mockResolvedValue('This is invalid');
    const MOCK_CONTEXT: MockServerContext = {
      req: {
        headers: {
          Authorization: 'Bearer foo',
        },
      },
    };
    const authContextCreator = createAuthContext<MockServerContext>(MOCK_AUTH_CONTEXT_PARAMS);
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    expect(authContextCreator(MOCK_CONTEXT)).rejects.toThrowError('Malformatted user');
    expect(getPublicKeySpy).toHaveBeenCalledTimes(1);
  });

  it('should call the auth0 api and return a list of permissions for the logged in user', async () => {
    const MOCK_PERMISSIONS = ['foo:create'];
    const MOCK_USER_ID = 'foo';
    getPublicKeySpy.mockResolvedValue('mock public key');
    getUserPermsSpy.mockResolvedValue(MOCK_PERMISSIONS);
    verifyJwtSpy.mockResolvedValue({
      sub: MOCK_USER_ID,
    });
    const MOCK_CONTEXT: MockServerContext = {
      req: {
        headers: {
          Authorization: 'Bearer foo',
        },
      },
    };
    const authContextCreator = createAuthContext<MockServerContext>(MOCK_AUTH_CONTEXT_PARAMS);
    const authContext = await authContextCreator(MOCK_CONTEXT);
    expect(authContext).toEqual({
      loggedIn: true,
      permissions: MOCK_PERMISSIONS,
      userId: MOCK_USER_ID,
    });
  });
});
