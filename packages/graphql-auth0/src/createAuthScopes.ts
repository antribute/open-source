import type { UserContext } from 'types';

export type AuthScopes<Models extends readonly string[]> = Record<
  `${Models[number]}:create`,
  boolean
> &
  Record<`${Models[number]}:deleteAny`, boolean> &
  Record<`${Models[number]}:deleteOwned`, boolean> &
  Record<`${Models[number]}:readAny`, boolean> &
  Record<`${Models[number]}:readOwned`, boolean> &
  Record<`${Models[number]}:updateAny`, boolean> &
  Record<`${Models[number]}:updateOwned`, boolean>;

export const scopeAuthOptions = {
  treatErrorsAsUnauthorized: true,
};

const buildAuthScopes =
  <Scopes extends readonly string[]>(models: Scopes) =>
  (context: UserContext): AuthScopes<Scopes> =>
    models.reduce((allPerms, model) => {
      const perm = {
        [`${model}:create`]: context.permissions.includes(`${model}:create`),
        [`${model}:deleteAny`]: context.permissions.includes(`${model}:deleteAny`),
        [`${model}:deleteOwned`]: context.permissions.includes(`${model}:deleteOwned`),
        [`${model}:readAny`]: context.permissions.includes(`${model}:readAny`),
        [`${model}:readOwned`]: context.permissions.includes(`${model}:readOwned`),
        [`${model}:updateAny`]: context.permissions.includes(`${model}:updateAny`),
        [`${model}:updateOwned`]: context.permissions.includes(`${model}:updateOwned`),
      };
      return { ...allPerms, ...perm };
      // Annoyingly this has to be casted here rather than things automatically working
      // eslint-disable-next-line @typescript-eslint/prefer-reduce-type-parameter
    }, {} as AuthScopes<Scopes>);

export default buildAuthScopes;
