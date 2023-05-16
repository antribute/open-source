import { defineColorScheme } from '../color-schemes.helpers';
import { neutralBaseColors } from './neutral.base';

export default defineColorScheme({
  name: 'neutral',
  colorMode: 'dark',
  scheme: {
    ...neutralBaseColors,

    surface: 'palette-neutral-600',
    'surface-light': 'palette-neutral-light',
    'surface-dark': 'palette-neutral-dark',
    'surface-soft': 'palette-neutral-500',

    secondary: 'palette-various-slate-500',
    'secondary-light': 'palette-various-slate-400',
    'secondary-dark': 'palette-various-slate-600',
    'secondary-soft': 'palette-various-slate-400',
  },
});
