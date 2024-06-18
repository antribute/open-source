import { graphqlServer } from '@hono/graphql-server';
import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import type { GraphQLFieldConfig, ThunkObjMap } from 'graphql';

import { createPlugin } from '../../plugin';
import './globalTypes';

export interface GraphQLPluginConfig {
  isGraphQLEndpointEnabled?: boolean;
  graphQLEndpointPath?: string;
}

export const GraphQLPlugin = createPlugin<GraphQLPluginConfig>(
  ({ isGraphQLEndpointEnabled = true, graphQLEndpointPath = '/graphql' }) => ({
    pluginName: 'GraphQL',
    onServerPostConfig: (server) => {
      if (!isGraphQLEndpointEnabled) {
        return;
      }

      // TODO: Iterate over fields and get this shit working
      const objects: Record<string, GraphQLObjectType> = {};
      const mutations: ThunkObjMap<GraphQLFieldConfig<any, any>> = {};
      const queries: ThunkObjMap<GraphQLFieldConfig<any, any>> = {};

      const schema = new GraphQLSchema({
        ...objects,
        query: new GraphQLObjectType({ name: 'Query', fields: queries }),
        mutation: new GraphQLObjectType({ name: 'Mutation', fields: mutations }),
      });
      const rootResolver = () => ({});
      server.use(graphQLEndpointPath, graphqlServer({ schema, rootResolver }));
    },
  })
);
