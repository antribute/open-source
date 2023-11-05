import { createCommand, output } from '@antribute/typecli';

import { getConfig } from 'config';
import { makeMigrations } from 'db';

const makeMigrationsCommand = createCommand({
  name: 'makemigrations',
  description: 'Creates new database migrations based on changes made to .model.ts files',
  args: {},
  handler: async () => {
    output.info('Creating Migrations');
    const config = await getConfig();
    await makeMigrations(config);
    output.success('Migrations Created Successfully');
  },
});

export default makeMigrationsCommand;
