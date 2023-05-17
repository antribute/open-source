import { defineColorScheme } from '../color-schemes.helpers';
import surfaceScheme from './surface';

export default defineColorScheme({
  name: 'default',
  colorMode: 'light',
  scheme: surfaceScheme.unresolvedScheme,
});
