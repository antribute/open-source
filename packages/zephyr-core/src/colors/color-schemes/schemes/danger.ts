import { defineColorScheme } from '../color-schemes.helpers';

const dangerScheme = defineColorScheme({
  name: 'danger',
  colorMode: 'dark',
  scheme: {
    primary: 'palette-danger-100',
    'primary-light': 'palette-danger-50',
    'primary-soft': 'palette-danger-200',
    'primary-dark': 'palette-danger-50',
    'primary-content': 'palette-danger',

    secondary: 'palette-various-rose-800',
    'secondary-dark': 'palette-various-rose-900',
    'secondary-light': 'palette-various-rose-700',
    'secondary-soft': 'palette-various-rose-700',
    'secondary-content': 'palette-content-intense',

    surface: 'palette-danger-500',
    'surface-soft': 'palette-danger-400',
    'surface-light': 'palette-danger-300',
    'surface-dark': 'palette-danger-600',
  },
});

export default dangerScheme;
