import { defineColorScheme } from '../color-schemes.helpers';
import { neutralBaseColors } from './neutral.base';

export default defineColorScheme({
  name: 'neutral-light',
  colorMode: 'dark',
  scheme: {
    ...neutralBaseColors,

    boundary: 'palette-various-slate-500',
    'boundary-tint': 'palette-various-slate-800',
    'boundary-ghost': 'palette-various-slate-700',
    'boundary-subtle': 'palette-various-slate-600',
    'boundary-weak': 'palette-various-slate-500',
    'boundary-moderate': 'palette-various-slate-400',
    'boundary-high': 'palette-various-slate-300',
    'boundary-strong': 'palette-various-slate-200',
    'boundary-intense': 'palette-various-slate-100',

    surface: 'palette-neutral-400',
    'surface-light': 'palette-neutral-200',
    'surface-dark': 'palette-neutral-dark',
    'surface-soft': 'palette-neutral-300',

    secondary: 'palette-various-slate-500',
    'secondary-light': 'palette-various-slate-400',
    'secondary-dark': 'palette-various-slate-600',
    'secondary-soft': 'palette-various-slate-400',
  },
});
