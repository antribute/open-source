import { colorPalette } from '../../colors';
import { defineColorScheme } from '../color-schemes.helpers';

export default defineColorScheme({
  name: 'surface-dark',
  colorMode: 'light',
  scheme: {
    surface: colorPalette['palette-surface'].dark,
    'surface-light': colorPalette['palette-surface'][50],
    'surface-dark': colorPalette['palette-surface']['800'],
    'surface-soft': colorPalette['palette-surface'][100],

    primary: colorPalette['palette-neutral']['500'],
    'primary-light': colorPalette['palette-neutral']['400'],
    'primary-dark': colorPalette['palette-neutral']['600'],
    'primary-soft': colorPalette['palette-various-slate']['200'],

    secondary: colorPalette['palette-various-slate']['400'],
    'secondary-light': colorPalette['palette-various-slate']['300'],
    'secondary-dark': colorPalette['palette-various-slate']['500'],
    'secondary-soft': colorPalette['palette-various-slate']['100'],
  },
});
