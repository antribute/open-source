import { colorPalette } from '../../colors';
import { commonScheme } from './common-scheme';
import { GenericColorSchemeConfig } from '../color-scheme-config.types';

export const surfaceScheme = {
  surface: {
    ...commonScheme.all,
    ...commonScheme.lightBgContrast,

    highlight: colorPalette['palette-highlight'].DEFAULT,
    'highlight-weak': colorPalette['palette-highlight'].weak,
    'highlight-moderate': colorPalette['palette-highlight'].moderate,
    'highlight-high': colorPalette['palette-highlight'].high,
    'highlight-strong': colorPalette['palette-highlight'].strong,

    surface: colorPalette['palette-surface'].DEFAULT,
    'surface-light': colorPalette['palette-surface'][50],
    'surface-dark': colorPalette['palette-surface'].dark,
    'surface-soft': colorPalette['palette-surface'][50],

    primary: colorPalette['palette-neutral']['500'],
    'primary-light': colorPalette['palette-neutral']['300'],
    'primary-dark': colorPalette['palette-neutral']['600'],
    'primary-soft': colorPalette['palette-various-slate']['200'],

    secondary: colorPalette['palette-various-slate']['400'],
    'secondary-light': colorPalette['palette-various-slate']['300'],
    'secondary-dark': colorPalette['palette-various-slate']['500'],
    'secondary-soft': colorPalette['palette-various-slate']['100'],
  },

  'surface-light': {
    ...commonScheme.all,
    ...commonScheme.lightBgContrast,

    surface: colorPalette['palette-surface'].light,
    'surface-light': colorPalette['palette-surface'][100],
    'surface-dark': colorPalette['palette-surface'].dark,
    'surface-soft': colorPalette['palette-surface'][50],

    primary: colorPalette['palette-neutral']['500'],
    'primary-light': colorPalette['palette-neutral']['400'],
    'primary-dark': colorPalette['palette-neutral']['600'],
    'primary-soft': colorPalette['palette-various-slate']['200'],

    secondary: colorPalette['palette-various-slate']['400'],
    'secondary-light': colorPalette['palette-various-slate']['300'],
    'secondary-dark': colorPalette['palette-various-slate']['500'],
    'secondary-soft': colorPalette['palette-various-slate']['100'],
  },

  'surface-dark': {
    ...commonScheme.all,
    ...commonScheme.lightBgContrast,

    surface: colorPalette['palette-surface'].dark,
    'surface-light': colorPalette['palette-surface'][50],
    'surface-dark': colorPalette['palette-surface']['800'],
    'surface-soft': colorPalette['palette-surface'][100],

    primary: colorPalette['palette-neutral']['500'],
    'primary-light': colorPalette['palette-neutral']['400'],
    'primary-dark': colorPalette['palette-neutral']['600'],
    'primary-soft': colorPalette['palette-various-slate']['200'],

    secondary: colorPalette['palette-various-slate']['400'],
    'secondary-light': colorPalette['palette-various-slate']['300'],
    'secondary-dark': colorPalette['palette-various-slate']['500'],
    'secondary-soft': colorPalette['palette-various-slate']['100'],
  },

  'dark/default': {
    ...commonScheme.all,
    ...commonScheme.darkBgContrast,

    surface: colorPalette['palette-surface-inverse'].DEFAULT,
    'surface-light': colorPalette['palette-surface-inverse'].light,
    'surface-dark': colorPalette['palette-surface-inverse'].dark,
    'surface-soft': colorPalette['palette-surface-inverse'].soft,

    primary: colorPalette['palette-neutral']['500'],
    'primary-light': colorPalette['palette-neutral']['300'],
    'primary-dark': colorPalette['palette-neutral']['600'],
    'primary-soft': colorPalette['palette-various-slate']['200'],

    secondary: colorPalette['palette-neutral']['800'],
    'secondary-light': colorPalette['palette-neutral']['700'],
    'secondary-dark': colorPalette['palette-neutral']['900'],
    'secondary-soft': colorPalette['palette-neutral']['500'],
  },

  'dark/surface': {
    ...commonScheme.all,
    ...commonScheme.darkBgContrast,

    surface: colorPalette['palette-surface-inverse'].DEFAULT,
    'surface-light': colorPalette['palette-surface-inverse'][300],
    'surface-dark': colorPalette['palette-surface-inverse'][500],
    'surface-soft': colorPalette['palette-surface-inverse'][200],

    primary: colorPalette['palette-various-slate']['500'],
    'primary-light': colorPalette['palette-various-slate']['400'],
    'primary-dark': colorPalette['palette-various-slate']['600'],
    'primary-soft': colorPalette['palette-various-slate']['200'],

    secondary: colorPalette['palette-various-slate']['600'],
    'secondary-light': colorPalette['palette-various-slate']['500'],
    'secondary-dark': colorPalette['palette-various-slate']['500'],
    'secondary-soft': colorPalette['palette-various-slate']['300'],
  },

  'dark/surface-light': {
    ...commonScheme.all,
    ...commonScheme.darkBgContrast,

    surface: colorPalette['palette-surface-inverse'].light,
    'surface-light': colorPalette['palette-surface-inverse'][100],
    'surface-dark': colorPalette['palette-surface-inverse'][300],
    'surface-soft': colorPalette['palette-surface-inverse'][50],

    primary: colorPalette['palette-various-slate']['500'],
    'primary-light': colorPalette['palette-various-slate']['400'],
    'primary-dark': colorPalette['palette-various-slate']['600'],
    'primary-soft': colorPalette['palette-various-slate']['200'],

    secondary: colorPalette['palette-various-slate']['600'],
    'secondary-light': colorPalette['palette-various-slate']['500'],
    'secondary-dark': colorPalette['palette-various-slate']['500'],
    'secondary-soft': colorPalette['palette-various-slate']['300'],
  },

  'dark/surface-dark': {
    ...commonScheme.all,
    ...commonScheme.darkBgContrast,

    surface: colorPalette['palette-surface-inverse'].dark,
    'surface-light': colorPalette['palette-surface-inverse'][600],
    'surface-dark': colorPalette['palette-surface-inverse'][800],
    'surface-soft': colorPalette['palette-surface-inverse'][600],

    primary: colorPalette['palette-various-slate']['500'],
    'primary-light': colorPalette['palette-various-slate']['400'],
    'primary-dark': colorPalette['palette-various-slate']['600'],
    'primary-soft': colorPalette['palette-various-slate']['200'],

    secondary: colorPalette['palette-various-slate']['600'],
    'secondary-light': colorPalette['palette-various-slate']['500'],
    'secondary-dark': colorPalette['palette-various-slate']['500'],
    'secondary-soft': colorPalette['palette-various-slate']['300'],
  },
} satisfies Partial<GenericColorSchemeConfig>;
