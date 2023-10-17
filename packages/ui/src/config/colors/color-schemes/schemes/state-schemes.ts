import type { ColorSchemeConfig, ColorSchemeName } from '../color-scheme-config.types';
import { defineColorScheme } from '../color-schemes.helpers';

const stateColors = ['success', 'info', 'danger', 'caution', 'heart'] satisfies ColorSchemeName[];

export default stateColors.flatMap((color) => {
  const config = {
    name: color,
    colorMode: 'light',
    scheme: {
      'primary-content-max-contrast': `palette-${color}-500`,
      'primary-content-min-contrast': `palette-${color}-600`,

      content: `palette-white`,

      surface: `palette-${color}`,
      'surface-light': `palette-${color}-light`,
      'surface-dark': `palette-${color}-dark`,
      'surface-soft': `palette-${color}-soft`,

      primary: `palette-${color}-500`,
      'primary-light': `palette-${color}-300`,
      'primary-dark': `palette-${color}-600`,
      'primary-soft': `palette-${color}-200`,

      secondary: `palette-${color}-400`,
      'secondary-light': `palette-${color}-300`,
      'secondary-dark': `palette-${color}-500`,
      'secondary-soft': `palette-${color}-100`,
    },
  } satisfies ColorSchemeConfig;

  const darkConfig = {
    ...config,
    name: `dark/${color}`,
    colorMode: 'dark',
  } satisfies ColorSchemeConfig;

  return [config, darkConfig].map((e) => defineColorScheme(e));
});
