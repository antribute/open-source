import { ManagementClient } from 'auth0';
import { verify } from 'jsonwebtoken';
import type { JwtPayload } from 'jsonwebtoken';
import jwksRsa from 'jwks-rsa';

export const getPublicKey = async (auth0Domain: string, keyId?: string) => {
  const rsaResponse = jwksRsa({
    jwksUri: `https://${auth0Domain}/.well-known/jwks.json`,
  });
  const signingKey = await rsaResponse.getSigningKey(keyId);
  const publicKey = signingKey.getPublicKey();
  return publicKey;
};

export const getUserPerms = async (
  userId: string,
  {
    auth0Domain,
    auth0ClientId,
    auth0ClientSecret,
  }: {
    auth0Domain: string;
    auth0ClientId: string;
    auth0ClientSecret: string;
  }
) => {
  const auth0 = new ManagementClient({
    domain: auth0Domain,
    clientId: auth0ClientId,
    clientSecret: auth0ClientSecret,
  });

  // TODO: Should we consider some sort of redis cache here for quicker user load times? It's
  // probably safer to load it every time, but this could cause slowness
  const permissions = (await auth0.getUserPermissions({ id: userId }))
    .filter((perm) => !!perm.permission_name?.length)
    .map((perm) => perm.permission_name ?? '');

  return permissions;
};

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
