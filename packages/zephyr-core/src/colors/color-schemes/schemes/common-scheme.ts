import { colorPalette } from '../../colors';
import type { ColorScheme } from '../color-scheme-config.types';

export const commonScheme = {
  all: {
    heart: colorPalette['palette-heart'].DEFAULT,
    'heart-light': colorPalette['palette-heart'].light,
    'heart-dark': colorPalette['palette-heart'].dark,
    'heart-soft': colorPalette['palette-heart'].soft,

    info: colorPalette['palette-info'].DEFAULT,
    'info-light': colorPalette['palette-info'].light,
    'info-dark': colorPalette['palette-info'].dark,
    'info-soft': colorPalette['palette-info'].soft,

    positive: colorPalette['palette-positive'].DEFAULT,
    'positive-light': colorPalette['palette-positive'].light,
    'positive-dark': colorPalette['palette-positive'].dark,
    'positive-soft': colorPalette['palette-positive'].soft,

    danger: colorPalette['palette-danger'].DEFAULT,
    'danger-light': colorPalette['palette-danger'].light,
    'danger-dark': colorPalette['palette-danger'].dark,
    'danger-soft': colorPalette['palette-danger'].soft,

    caution: colorPalette['palette-caution'].DEFAULT,
    'caution-light': colorPalette['palette-caution'].light,
    'caution-dark': colorPalette['palette-caution'].dark,
    'caution-soft': colorPalette['palette-caution'].soft,

    'primary-content': colorPalette['palette-content-inverse'].intense,
    'secondary-content': colorPalette['palette-content-inverse'].intense,
  },

  lightMode: {
    base: colorPalette['palette-base'].DEFAULT,

    highlight: colorPalette['palette-highlight'].DEFAULT,
    'highlight-tint': colorPalette['palette-highlight'].tint,
    'highlight-ghost': colorPalette['palette-highlight'].ghost,
    'highlight-subtle': colorPalette['palette-highlight'].subtle,
    'highlight-weak': colorPalette['palette-highlight'].weak,
    'highlight-moderate': colorPalette['palette-highlight'].moderate,
    'highlight-high': colorPalette['palette-highlight'].high,
    'highlight-strong': colorPalette['palette-highlight'].strong,
    'highlight-intense': colorPalette['palette-highlight'].intense,

    boundary: colorPalette['palette-boundary'].DEFAULT,
    'boundary-tint': colorPalette['palette-boundary'].tint,
    'boundary-ghost': colorPalette['palette-boundary'].ghost,
    'boundary-subtle': colorPalette['palette-boundary'].subtle,
    'boundary-weak': colorPalette['palette-boundary'].weak,
    'boundary-moderate': colorPalette['palette-boundary'].moderate,
    'boundary-strong': colorPalette['palette-boundary'].strong,
    'boundary-high': colorPalette['palette-boundary'].high,
    'boundary-intense': colorPalette['palette-boundary'].intense,

    content: colorPalette['palette-content'].DEFAULT,
    'content-tint': colorPalette['palette-content'].tint,
    'content-ghost': colorPalette['palette-content'].ghost,
    'content-subtle': colorPalette['palette-content'].subtle,
    'content-weak': colorPalette['palette-content'].weak,
    'content-moderate': colorPalette['palette-content'].moderate,
    'content-high': colorPalette['palette-content'].high,
    'content-strong': colorPalette['palette-content'].strong,
    'content-intense': colorPalette['palette-content'].intense,

    'content-min-contrast': colorPalette['palette-neutral'].light,
    'content-max-contrast': colorPalette['palette-content'].intense,

    'inverse-content-max-contrast': colorPalette['palette-content-inverse'].intense,
    'inverse-content-min-contrast': colorPalette['palette-neutral'].light,

    inverse: colorPalette['palette-surface-inverse'].DEFAULT,
    'inverse-light': colorPalette['palette-surface-inverse'].light,
    'inverse-dark': colorPalette['palette-surface-inverse'].dark,
    'inverse-soft': colorPalette['palette-surface-inverse'].soft,

    'primary-content-max-contrast': colorPalette['palette-content'].intense,
    'primary-content-min-contrast': colorPalette['palette-neutral'].light,

    'secondary-content-max-contrast': colorPalette['palette-content'].high,
    'secondary-content-min-contrast': colorPalette['palette-neutral'][300],

    'inverse-content': colorPalette['palette-content'].intense,
  },

  darkMode: {
    base: colorPalette['palette-base'].inverse,

    highlight: colorPalette['palette-highlight-inverse'].DEFAULT,
    'highlight-tint': colorPalette['palette-highlight-inverse'].tint,
    'highlight-ghost': colorPalette['palette-highlight-inverse'].ghost,
    'highlight-subtle': colorPalette['palette-highlight-inverse'].subtle,
    'highlight-weak': colorPalette['palette-highlight-inverse'].weak,
    'highlight-moderate': colorPalette['palette-highlight-inverse'].moderate,
    'highlight-high': colorPalette['palette-highlight-inverse'].high,
    'highlight-strong': colorPalette['palette-highlight-inverse'].strong,
    'highlight-intense': colorPalette['palette-highlight-inverse'].intense,

    boundary: colorPalette['palette-boundary-inverse'].DEFAULT,
    'boundary-tint': colorPalette['palette-boundary-inverse'].tint,
    'boundary-ghost': colorPalette['palette-boundary-inverse'].ghost,
    'boundary-subtle': colorPalette['palette-boundary-inverse'].subtle,
    'boundary-weak': colorPalette['palette-boundary-inverse'].weak,
    'boundary-moderate': colorPalette['palette-boundary-inverse'].moderate,
    'boundary-strong': colorPalette['palette-boundary-inverse'].strong,
    'boundary-high': colorPalette['palette-boundary-inverse'].high,
    'boundary-intense': colorPalette['palette-boundary-inverse'].intense,

    content: colorPalette['palette-content-inverse'].DEFAULT,
    'content-tint': colorPalette['palette-content-inverse'].tint,
    'content-ghost': colorPalette['palette-content-inverse'].ghost,
    'content-subtle': colorPalette['palette-content-inverse'].subtle,
    'content-weak': colorPalette['palette-content-inverse'].weak,
    'content-moderate': colorPalette['palette-content-inverse'].moderate,
    'content-high': colorPalette['palette-content-inverse'].high,
    'content-strong': colorPalette['palette-content-inverse'].strong,
    'content-intense': colorPalette['palette-content-inverse'].intense,

    'content-min-contrast': colorPalette['palette-neutral'][50],
    'content-max-contrast': colorPalette['palette-content-inverse'].intense,

    'inverse-content-max-contrast': colorPalette['palette-content'].intense,
    'inverse-content-min-contrast': colorPalette['palette-neutral'].DEFAULT,

    inverse: colorPalette['palette-surface'].DEFAULT,
    'inverse-light': colorPalette['palette-surface'].light,
    'inverse-dark': colorPalette['palette-surface'].dark,
    'inverse-soft': colorPalette['palette-surface'].soft,

    'primary-content-max-contrast': colorPalette['palette-content-inverse'].intense,
    'primary-content-min-contrast': colorPalette['palette-various-slate']['300'],

    'secondary-content-max-contrast': colorPalette['palette-content-inverse'].high,
    'secondary-content-min-contrast': colorPalette['palette-various-slate']['300'],

    'inverse-content': colorPalette['palette-content-inverse'].intense,
  },
} satisfies Record<string, Partial<ColorScheme>>;
