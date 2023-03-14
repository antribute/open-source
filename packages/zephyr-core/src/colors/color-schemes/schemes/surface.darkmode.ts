import { colorPalette } from '../../colors';
import { defineColorScheme } from '../color-schemes.helpers';

export default defineColorScheme({
  name: 'dark/surface',
  colorMode: 'dark',
  scheme: {
    surface: colorPalette['palette-surface-inverse'].DEFAULT,
    'surface-light': colorPalette['palette-surface-inverse'][300],
    'surface-dark': colorPalette['palette-surface-inverse'][500],
    'surface-soft': colorPalette['palette-surface-inverse'][200],

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
