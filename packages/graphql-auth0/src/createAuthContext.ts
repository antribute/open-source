import { ManagementClient } from 'auth0';
import { verify } from 'jsonwebtoken';
import type { JwtPayload } from 'jsonwebtoken';
import JwksRsa from 'jwks-rsa';

import type { UserContext } from 'types';

export const verifyJwt = async (
  token: string,
  rsaKey: string
): Promise<string | JwtPayload | undefined> =>
  new Promise((resolve, reject) => {
    verify(token, rsaKey, { algorithms: ['RS256'] }, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });

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
    const jwksRsa = JwksRsa({
      jwksUri: `https://${auth0Domain}/.well-known/jwks.json`,
    });

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

    // TODO: Should we consider some sort of redis cache here for quicker user load times? It's
    // probably safer to load it every time, but this could cause slowness
    let publicKey: string;
    try {
      const signingKey = await jwksRsa.getSigningKey('K_ToVGV177arfdgzA8DOv');
      publicKey = signingKey.getPublicKey();
    } catch (err) {
      throw new Error(
        `An error occurred while getting the jwks signing key: ${(err as Error).message}`
      );
    }

    const unverifiedUser = await verifyJwt(authToken, publicKey);
    if (unverifiedUser === undefined || typeof unverifiedUser === 'string') {
      throw new Error('Malformatted user');
    }

    const userId = unverifiedUser.sub ?? '';
    const auth0 = new ManagementClient({
      domain: auth0Domain,
      clientId: auth0ClientId,
      clientSecret: auth0ClientSecret,
    });

    const permissions = (await auth0.getUserPermissions({ id: userId }))
      .filter((perm) => !!perm.permission_name?.length)
      .map((perm) => perm.permission_name ?? '');

    console.log('@@@@@@@@', permissions);

    return {
      loggedIn: true,
      permissions,
      userId,
    };
  };
}

export default createAuthContext;
