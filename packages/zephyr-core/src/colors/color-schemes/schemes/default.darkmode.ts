import { defineColorScheme } from '../color-schemes.helpers';

export default defineColorScheme({
  name: 'dark/default',
  colorMode: 'dark',
  scheme: {
    surface: 'palette-surface-inverse',
    'surface-light': 'palette-surface-inverse-light',
    'surface-dark': 'palette-surface-inverse-dark',
    'surface-soft': 'palette-surface-inverse-soft',

    primary: 'palette-neutral-500',
    'primary-light': 'palette-neutral-300',
    'primary-dark': 'palette-neutral-600',
    'primary-soft': 'palette-various-slate-200',

    secondary: 'palette-neutral-800',
    'secondary-light': 'palette-neutral-700',
    'secondary-dark': 'palette-neutral-900',
    'secondary-soft': 'palette-neutral-500',
  },
});
