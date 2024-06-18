export const createRoute = <Path extends string>(
  path: Path,
  method: string,
  handler: TypeApi.Route<Path>['handler']
): TypeApi.Route<Path> => ({
  path,
  method,
  handler,
});
