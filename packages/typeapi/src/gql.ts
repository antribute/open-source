import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { createYoga } from 'graphql-yoga';

import type { Config } from './config';

// TODO: Add the shit needed to create the schema itself here
export const createGraphqlSchema = async () => {
  return new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'Query',
      fields: {},
    }),
  });
};

export const createGraphqlRoute = async (server: FastifyInstance, config: Config) => {
  const schema = await createGraphqlSchema();

  const yoga = createYoga<{
    req: FastifyRequest;
    reply: FastifyReply;
  }>({
    graphqlEndpoint: config.graphql.endpoint,
    healthCheckEndpoint: '/health',
    logging: {
      debug: (...args) => args.forEach((arg) => server.log.debug(arg)),
      info: (...args) => args.forEach((arg) => server.log.info(arg)),
      warn: (...args) => args.forEach((arg) => server.log.warn(arg)),
      error: (...args) => args.forEach((arg) => server.log.error(arg)),
    },
    schema,
  });

  // Let's make sure this never gets included in a swagger file
  server.route({
    method: ['GET', 'OPTIONS', 'POST'],
    url: config.graphql.endpoint,
    handler: async (req, reply) => {
      const response = await yoga.handleNodeRequest(req, {
        req,
        reply,
      });
      response.headers.forEach((value, key) => {
        reply.header(key, value);
      });
      reply.status(response.status);
      reply.send(response.body);

      return reply;
    },
  });
};
