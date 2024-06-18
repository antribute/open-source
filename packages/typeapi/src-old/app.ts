export interface CreateAppParams<S extends TypeApi.AppSchema> {
  funcs: S;
  routes?: TypeApi.Route[];
}

export const createApp = <S extends TypeApi.AppSchema>({
  funcs,
  routes = [],
}: CreateAppParams<S>): TypeApi.App<S> => {
  return { funcs, routes };
};
