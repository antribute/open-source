import pug from 'pug';

import { createPlugin } from '../../plugin';
import { createRoute } from '../../route';

export const PugPlugin = createPlugin(() => ({
  pluginName: 'Pug',
}));

export const createPugRoute;
