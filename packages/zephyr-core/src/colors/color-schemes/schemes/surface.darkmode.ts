import { defineColorScheme } from '../color-schemes.helpers';

export default defineColorScheme({
  name: 'dark/surface',
  colorMode: 'dark',
  scheme: {
    surface: 'palette-surface-inverse',
    'surface-light': 'palette-surface-inverse-300',
    'surface-dark': 'palette-surface-inverse-500',
    'surface-soft': 'palette-surface-inverse-200',

    primary: 'palette-various-slate-500',
    'primary-light': 'palette-various-slate-400',
    'primary-dark': 'palette-various-slate-600',
    'primary-soft': 'palette-various-slate-200',

    secondary: 'palette-various-slate-600',
    'secondary-light': 'palette-various-slate-500',
    'secondary-dark': 'palette-various-slate-500',
    'secondary-soft': 'palette-various-slate-300',
  },
});
