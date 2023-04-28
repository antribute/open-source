import { getConfig, importAndRunGenerator } from '@antribute/backend-core';

const generate = async (configPath?: string) => {
  const config = await getConfig(configPath);

  await importAndRunGenerator('Authorization', config.auth.platform, config);
  await importAndRunGenerator('ORM', config.orm.platform, config);
  await importAndRunGenerator('GraphQL', config.graphql.platform, config);
  await importAndRunGenerator('Server', config.server.platform, config);
};

export default generate;
