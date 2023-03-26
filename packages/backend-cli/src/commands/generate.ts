import { getConfig } from 'utils/config';
import { generateGraphqlBuilder, generateGraphqlSchema } from 'utils/graphql';
import { generateOrmConfig } from 'utils/orm';

const generate = async (configPath = '.antributerc') => {
  const config = await getConfig(configPath);
  await generateOrmConfig(config);
  await generateGraphqlBuilder(config);
  await generateGraphqlSchema(config);
};

export default generate;
