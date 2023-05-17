import { defineColorScheme } from '../color-schemes.helpers';

export default defineColorScheme({
  name: 'surface',
  colorMode: 'light',
  scheme: {
    highlight: 'palette-highlight',
    'highlight-weak': 'palette-highlight-weak',
    'highlight-moderate': 'palette-highlight-moderate',
    'highlight-high': 'palette-highlight-high',
    'highlight-strong': 'palette-highlight-strong',

    surface: 'palette-surface',
    'surface-light': 'palette-surface-100',
    'surface-dark': 'palette-surface-dark',
    'surface-soft': 'palette-surface-50',

    primary: 'palette-neutral-500',
    'primary-light': 'palette-neutral-300',
    'primary-dark': 'palette-neutral-600',
    'primary-soft': 'palette-various-slate-200',

    secondary: 'palette-various-slate-400',
    'secondary-light': 'palette-various-slate-300',
    'secondary-dark': 'palette-various-slate-500',
    'secondary-soft': 'palette-various-slate-100',
  },
});
