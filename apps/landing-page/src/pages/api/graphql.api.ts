import { apiHandlerConfig, createHandler } from '@antribute/graphql-nextjs';

const config = { ...apiHandlerConfig };
export { config };

const handler = createHandler({});
export default handler;
