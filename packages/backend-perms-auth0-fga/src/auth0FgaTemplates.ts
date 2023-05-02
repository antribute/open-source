export type FgaIndexTemplate = Record<string, never>;
export const fgaIndexTemplate = `//
// Autogenerated by \`@antribute/backend\`
// Any modifications will be overwritten on subsequent runs.
//

import { Auth0FgaApi } from '@auth0/fga';

const auth0Fga = new Auth0FgaApi({
  clientId: process.env.AUTH0_FGA_CLIENT_ID!,
  clientSecret: process.env.AUTH0_FGA_CLIENT_SECRET!,
  environment: process.env.AUTH0_FGA_ENVIRONMENT!,
  storeId: process.env.AUTH0_FGA_STORE_ID!,
});

export interface PermissionsParams {
  authModelId?: string;
  objectId: string;
  objectType: string;
  relation: string;
  userId: string;
}

export const addPermissions = async ({ authModelId, objectId, objectType, relation, userId }: PermissionsParams): Promise<void> => {
  await auth0Fga.write({
    authorization_model_id: authModelId || process.env.AUTH0_FGA_MODEL_ID!,
    writes: {
      tuple_keys: [{ object: \`\${objectType}:\${objectId}\`, relation, user: \`user:\${userId}\` }]
    },
  });
};

export const checkPermissions = async ({ authModelId, objectId, objectType, relation, userId }: PermissionsParams): Promise<boolean> => {
  const res = await auth0Fga.check({
    authorization_model_id: authModelId || process.env.AUTH0_FGA_MODEL_ID!,
    tuple_key: { object: \`\${objectType}:\${objectId}\`, relation, user: \`user:\${userId}\` }
  });
  return res.allowed ?? false;
};

export const removePermissions = async ({ authModelId, objectId, objectType, relation, userId }: PermissionsParams): Promise<void> => {
  await auth0Fga.write({
    authorization_model_id: authModelId || process.env.AUTH0_FGA_MODEL_ID!,
    deletes: {
      tuple_keys: [{ object: \`\${objectType}:\${objectId}\`, relation, user: \`user:\${userId}\` }]
    },
  });
};

export default auth0Fga;
`;