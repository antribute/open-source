import { colorPalette } from '../../colors';
import { defineColorScheme } from '../color-schemes.helpers';

export default defineColorScheme({
  name: 'neutral-light',
  colorMode: 'dark',
  scheme: {
    surface: colorPalette['palette-neutral'][400],
    'surface-light': colorPalette['palette-neutral'][200],
    'surface-dark': colorPalette['palette-neutral'].dark,
    'surface-soft': colorPalette['palette-neutral'][300],

    primary: colorPalette['palette-various-slate']['400'],
    'primary-light': colorPalette['palette-various-slate']['300'],
    'primary-dark': colorPalette['palette-various-slate']['500'],
    'primary-soft': colorPalette['palette-various-slate']['100'],

    secondary: colorPalette['palette-various-slate']['500'],
    'secondary-light': colorPalette['palette-various-slate']['400'],
    'secondary-dark': colorPalette['palette-various-slate']['600'],
    'secondary-soft': colorPalette['palette-various-slate']['400'],
  },
});
