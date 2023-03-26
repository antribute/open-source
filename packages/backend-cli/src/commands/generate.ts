import { getConfig } from 'utils/config';
import { generateGraphqlBuilder, generateGraphqlSchema } from 'utils/graphql';
import { generateOrmConfig } from 'utils/orm';
import { generatePlatform } from 'utils/platform';

const generate = async (configPath = '.antributerc') => {
  const config = await getConfig(configPath);
  await generateOrmConfig(config);
  await generateGraphqlBuilder(config);
  await generateGraphqlSchema(config);
  await generatePlatform(config);
};

export default generate;
