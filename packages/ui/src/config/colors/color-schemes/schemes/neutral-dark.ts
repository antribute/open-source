import { defineColorScheme } from '../color-schemes.helpers';
import { neutralBaseColors } from './neutral.base';

export default defineColorScheme({
  name: 'neutral-dark',
  colorMode: 'dark',
  scheme: {
    ...neutralBaseColors,

    surface: 'palette-neutral-800',
    'surface-light': 'palette-neutral-600',
    'surface-dark': 'palette-neutral-900',
    'surface-soft': 'palette-neutral-700',

    secondary: 'palette-various-slate-500',
    'secondary-light': 'palette-various-slate-400',
    'secondary-dark': 'palette-various-slate-600',
    'secondary-soft': 'palette-various-slate-200',
  },
});
