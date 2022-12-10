import { getPublicKey, getUserPerms, verifyJwt } from './authContextUtils';
import type { UserContext } from './types';

export interface CreateAuthContextParams {
  auth0ClientId: string;
  auth0ClientSecret: string;
  auth0Domain: string;
}

// As a rule of thumb, we don't allow "any" to be used at Antribute, however we're going to make an
// exception for server context as we want this to be modular and work with any server
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createAuthContext<ServerContext extends Record<string, any>>({
  auth0ClientId,
  auth0ClientSecret,
  auth0Domain,
}: CreateAuthContextParams) {
  const LOGGED_OUT = { loggedIn: false, permissions: [] };
  return async ({ req }: ServerContext): Promise<UserContext> => {
    // These rules are trigged as a side effect of allowing ServerContext to be any. See the
    // above comment for why we're breaking our "no any" rules here
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const authHeader = req.headers.authorization ?? req.headers.Authorization;
    if (!authHeader || typeof authHeader !== 'string') {
      return LOGGED_OUT;
    }

    const [, authToken] = authHeader.split('Bearer ');
    if (!authToken) {
      return LOGGED_OUT;
    }

    const publicKey = await getPublicKey(auth0Domain);

    const unverifiedUser = await verifyJwt(authToken, publicKey);
    if (unverifiedUser === undefined || typeof unverifiedUser === 'string') {
      throw new Error('Malformatted user');
    }

    const userId = unverifiedUser.sub ?? '';
    const permissions = await getUserPerms(userId, {
      auth0ClientId,
      auth0ClientSecret,
      auth0Domain,
    });

    return {
      loggedIn: true,
      permissions,
      userId,
    };
  };
}

export default createAuthContext;
