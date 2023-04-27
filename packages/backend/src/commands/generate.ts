// import { generateGraphqlBuilder, generateGraphqlSchema } from 'utils/graphql';
// import { generatePlatform } from 'utils/platform';

import { getConfig, importAndRunGenerator } from '@antribute/backend-core';

const generate = async (configPath?: string) => {
  const config = await getConfig(configPath);

  // The very first step is to generate our auth. The choices that the developer makes for auth can
  // have a direct effect on other portions of the app such as the ORM or GraphQL Resolvers
  await importAndRunGenerator('Authorization', config.auth.platform, config);
  await importAndRunGenerator('ORM', config.orm.platform, config);
  // await generateGraphqlBuilder(config);
  // await generateGraphqlSchema(config);
  // await generatePlatform(config);
};

export default generate;
