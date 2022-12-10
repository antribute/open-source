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
  ({ loggedIn, permissions }: UserContext): AuthScopes<Scopes> =>
    models.reduce((allPerms, model) => {
      if (!loggedIn) {
        return {
          ...allPerms,
          [`${model}:create`]: false,
          [`${model}:deleteAny`]: false,
          [`${model}:deleteOwned`]: false,
          [`${model}:readAny`]: false,
          [`${model}:readOwned`]: false,
          [`${model}:updateAny`]: false,
          [`${model}:updateOwned`]: false,
        };
      }
      return {
        ...allPerms,
        [`${model}:create`]: permissions.includes(`${model}:create`),
        [`${model}:deleteAny`]: permissions.includes(`${model}:deleteAny`),
        [`${model}:deleteOwned`]: permissions.includes(`${model}:deleteOwned`),
        [`${model}:readAny`]: permissions.includes(`${model}:readAny`),
        [`${model}:readOwned`]: permissions.includes(`${model}:readOwned`),
        [`${model}:updateAny`]: permissions.includes(`${model}:updateAny`),
        [`${model}:updateOwned`]: permissions.includes(`${model}:updateOwned`),
      };
      // Annoyingly this has to be casted here rather than things automatically working
      // eslint-disable-next-line @typescript-eslint/prefer-reduce-type-parameter
    }, {} as AuthScopes<Scopes>);

export default buildAuthScopes;
