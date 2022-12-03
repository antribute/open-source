import { GraphQLError } from 'graphql';

const forbiddenErr = (code = 'FORBIDDEN') =>
  new GraphQLError('You do not have permission to access this object', {
    extensions: {
      code,
      http: {
        status: 403,
      },
    },
  });

export default forbiddenErr;
