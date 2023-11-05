import { createCommand, output } from '@antribute/typecli';

import { getConfig } from 'config';
import { migrate } from 'db';

const makeMigrationsCommand = createCommand({
  name: 'migrate',
  description: 'Applies migrations to database URL in config',
  args: {},
  handler: async () => {
    output.info('Applying Migrations');
    const config = await getConfig();
    await migrate(config);
    output.success('Migrations Applied Successfully');
  },
});

export default makeMigrationsCommand;
