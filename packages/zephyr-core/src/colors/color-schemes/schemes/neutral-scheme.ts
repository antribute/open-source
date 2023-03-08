import { colorPalette } from '../../colors';
import { commonScheme } from './common-scheme';
import { GenericColorSchemeConfig } from '../color-scheme-config.types';

export const neutralScheme = {
  neutral: {
    ...commonScheme.all,
    ...commonScheme.darkBgContrast,

    surface: colorPalette['palette-neutral'][600],
    'surface-light': colorPalette['palette-neutral'].light,
    'surface-dark': colorPalette['palette-neutral'].dark,
    'surface-soft': colorPalette['palette-neutral'][500],

    primary: colorPalette['palette-various-slate']['400'],
    'primary-light': colorPalette['palette-various-slate']['300'],
    'primary-dark': colorPalette['palette-various-slate']['500'],
    'primary-soft': colorPalette['palette-various-slate']['100'],

    secondary: colorPalette['palette-various-slate']['500'],
    'secondary-light': colorPalette['palette-various-slate']['400'],
    'secondary-dark': colorPalette['palette-various-slate']['600'],
    'secondary-soft': colorPalette['palette-various-slate']['400'],
  },

  'neutral-light': {
    ...commonScheme.all,
    ...commonScheme.darkBgContrast,

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

  'neutral-dark': {
    ...commonScheme.all,
    ...commonScheme.darkBgContrast,

    surface: colorPalette['palette-neutral'][800],
    'surface-light': colorPalette['palette-neutral']['600'],
    'surface-dark': colorPalette['palette-neutral']['900'],
    'surface-soft': colorPalette['palette-neutral'][700],

    primary: colorPalette['palette-various-slate']['400'],
    'primary-light': colorPalette['palette-various-slate']['300'],
    'primary-dark': colorPalette['palette-various-slate']['500'],
    'primary-soft': colorPalette['palette-various-slate']['100'],

    secondary: colorPalette['palette-various-slate']['500'],
    'secondary-light': colorPalette['palette-various-slate']['400'],
    'secondary-dark': colorPalette['palette-various-slate']['600'],
    'secondary-soft': colorPalette['palette-various-slate']['200'],
  },
} satisfies Partial<GenericColorSchemeConfig>;
