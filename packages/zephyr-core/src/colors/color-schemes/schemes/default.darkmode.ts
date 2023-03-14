import { colorPalette } from '../../colors';
import { defineColorScheme } from '../color-schemes.helpers';

export default defineColorScheme({
  name: 'dark/default',
  colorMode: 'dark',
  scheme: {
    surface: colorPalette['palette-surface-inverse'].DEFAULT,
    'surface-light': colorPalette['palette-surface-inverse'].light,
    'surface-dark': colorPalette['palette-surface-inverse'].dark,
    'surface-soft': colorPalette['palette-surface-inverse'].soft,

    primary: colorPalette['palette-neutral']['500'],
    'primary-light': colorPalette['palette-neutral']['300'],
    'primary-dark': colorPalette['palette-neutral']['600'],
    'primary-soft': colorPalette['palette-various-slate']['200'],

    secondary: colorPalette['palette-neutral']['800'],
    'secondary-light': colorPalette['palette-neutral']['700'],
    'secondary-dark': colorPalette['palette-neutral']['900'],
    'secondary-soft': colorPalette['palette-neutral']['500'],
  },
});
