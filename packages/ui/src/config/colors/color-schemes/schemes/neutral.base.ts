import { ColorScheme } from '../color-scheme-config.types';

export const neutralBaseColors = {
  boundary: 'palette-various-slate-600',
  'boundary-tint': 'palette-various-slate-900',
  'boundary-ghost': 'palette-various-slate-800',
  'boundary-subtle': 'palette-various-slate-700',
  'boundary-weak': 'palette-various-slate-600',
  'boundary-moderate': 'palette-various-slate-500',
  'boundary-high': 'palette-various-slate-400',
  'boundary-strong': 'palette-various-slate-300',
  'boundary-intense': 'palette-various-slate-200',

  surface: 'palette-neutral-400',
  'surface-light': 'palette-neutral-200',
  'surface-dark': 'palette-neutral-dark',
  'surface-soft': 'palette-neutral-300',

  primary: 'palette-various-slate-400',
  'primary-light': 'palette-various-slate-300',
  'primary-dark': 'palette-various-slate-500',
  'primary-soft': 'palette-various-slate-100',

  secondary: 'palette-various-slate-500',
  'secondary-light': 'palette-various-slate-400',
  'secondary-dark': 'palette-various-slate-600',
  'secondary-soft': 'palette-various-slate-400',
} satisfies Partial<ColorScheme>;
