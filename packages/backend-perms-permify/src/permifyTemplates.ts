export type PermifyIndexTemplate = Record<string, never>;
export const permifyIndexTemplate = `//
// Autogenerated by \`@antribute/backend\`
// Any modifications will be overwritten on subsequent runs.
//

import permify from '@permify/permify-node';

export interface PermissionsParams {
  objectId: string;
  objectType: string;
  relation: string;
  userId: string;
}

export const buildPermify = () => {
  const client = permify.grpc.newClient({
    cert: null,
    endpoint: "localhost:3478",
  });
  return client;
}

export const addPermissions = async ({ objectId, objectType, relation, userId }: PermissionsParams): Promise<void> => {
  const permify = buildPermify();
  console.log(objectId, objectType, relation, userId, permify);
  // await auth0Fga.write({
  //   authorization_model_id: authModelId || process.env.AUTH0_FGA_MODEL_ID!,
  //   writes: {
  //     tuple_keys: [{ object: \`\${objectType}:\${objectId}\`, relation, user: \`user:\${userId}\` }]
  //   },
  // });
};

export const checkPermissions = async ({ objectId, objectType, relation, userId }: PermissionsParams): Promise<boolean> => {
  const permify = buildPermify();
  console.log(objectId, objectType, relation, userId, permify);
  // const res = await auth0Fga.check({
  //   authorization_model_id: authModelId || process.env.AUTH0_FGA_MODEL_ID!,
  //   tuple_key: { object: \`\${objectType}:\${objectId}\`, relation, user: \`user:\${userId}\` }
  // });
  // return res.allowed ?? false;
  return false;
};

export const removePermissions = async ({ objectId, objectType, relation, userId }: PermissionsParams): Promise<void> => {
  const permify = buildPermify();
  console.log(objectId, objectType, relation, userId, permify);
  // await auth0Fga.write({
  //   authorization_model_id: authModelId || process.env.AUTH0_FGA_MODEL_ID!,
  //   deletes: {
  //     tuple_keys: [{ object: \`\${objectType}:\${objectId}\`, relation, user: \`user:\${userId}\` }]
  //   },
  // });
};
`;