import { GraphQLError } from 'graphql';

const notFoundErr = (id: string, objectName = 'Object', code = 'NOT_FOUND') =>
  new GraphQLError(`${objectName} with id "${id}" not found`, {
    extensions: {
      code,
      http: {
        status: 404,
      },
    },
  });

export default notFoundErr;
