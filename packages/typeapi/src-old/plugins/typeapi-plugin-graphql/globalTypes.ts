declare global {
  // eslint-disable-next-line ts/no-namespace
  export namespace TypeApi {
    // eslint-disable-next-line unused-imports/no-unused-vars
    export interface App<S extends AppSchema> {
      graphql?: {
        mutations?: [];
        queries?: [];
      };
    }
  }
}
