import { colorPalette } from '../../colors';
import { defineColorScheme } from '../color-schemes.helpers';

export default defineColorScheme({
  name: 'dark/surface-light',
  colorMode: 'dark',
  scheme: {
    surface: colorPalette['palette-surface-inverse'].light,
    'surface-light': colorPalette['palette-surface-inverse'][100],
    'surface-dark': colorPalette['palette-surface-inverse'][300],
    'surface-soft': colorPalette['palette-surface-inverse'][50],

    primary: colorPalette['palette-various-slate']['500'],
    'primary-light': colorPalette['palette-various-slate']['400'],
    'primary-dark': colorPalette['palette-various-slate']['600'],
    'primary-soft': colorPalette['palette-various-slate']['200'],

    secondary: colorPalette['palette-various-slate']['600'],
    'secondary-light': colorPalette['palette-various-slate']['500'],
    'secondary-dark': colorPalette['palette-various-slate']['500'],
    'secondary-soft': colorPalette['palette-various-slate']['300'],
  },
});