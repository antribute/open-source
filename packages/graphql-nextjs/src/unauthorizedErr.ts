import { GraphQLError } from 'graphql';

const unauthorizedErr = (code = 'UNAUTHORIZED') =>
  new GraphQLError('Unauthorized', {
    extensions: {
      code,
      http: {
        status: 401,
      },
    },
  });

export default unauthorizedErr;
