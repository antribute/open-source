import type { ColorScheme } from '../color-scheme-config.types';

export const commonScheme = {
  all: {
    heart: 'palette-heart',
    'heart-light': 'palette-heart-light',
    'heart-dark': 'palette-heart-dark',
    'heart-soft': 'palette-heart-soft',

    info: 'palette-info',
    'info-light': 'palette-info-light',
    'info-dark': 'palette-info-dark',
    'info-soft': 'palette-info-soft',

    success: 'palette-success',
    'success-light': 'palette-success-light',
    'success-dark': 'palette-success-dark',
    'success-soft': 'palette-success-soft',

    danger: 'palette-danger',
    'danger-light': 'palette-danger-light',
    'danger-dark': 'palette-danger-dark',
    'danger-soft': 'palette-danger-soft',

    caution: 'palette-caution',
    'caution-light': 'palette-caution-light',
    'caution-dark': 'palette-caution-dark',
    'caution-soft': 'palette-caution-soft',

    'primary-content': 'palette-content-inverse-intense',
    'secondary-content': 'palette-content-inverse-intense',
  },

  lightMode: {
    base: 'palette-base',

    boundary: 'palette-various-slate-300',
    'boundary-tint': 'palette-various-slate-50',
    'boundary-ghost': 'palette-various-slate-100',
    'boundary-subtle': 'palette-various-slate-200',
    'boundary-weak': 'palette-various-slate-300',
    'boundary-moderate': 'palette-various-slate-400',
    'boundary-high': 'palette-various-slate-500',
    'boundary-strong': 'palette-various-slate-600',
    'boundary-intense': 'palette-various-slate-700',

    highlight: 'palette-highlight',
    'highlight-tint': 'palette-highlight-tint',
    'highlight-ghost': 'palette-highlight-ghost',
    'highlight-subtle': 'palette-highlight-subtle',
    'highlight-weak': 'palette-highlight-weak',
    'highlight-moderate': 'palette-highlight-moderate',
    'highlight-high': 'palette-highlight-high',
    'highlight-strong': 'palette-highlight-strong',
    'highlight-intense': 'palette-highlight-intense',

    content: 'palette-content',
    'content-tint': 'palette-content-tint',
    'content-ghost': 'palette-content-ghost',
    'content-subtle': 'palette-content-subtle',
    'content-weak': 'palette-content-weak',
    'content-moderate': 'palette-content-moderate',
    'content-high': 'palette-content-high',
    'content-strong': 'palette-content-strong',
    'content-intense': 'palette-content-intense',

    'content-min-contrast': 'palette-neutral-light',
    'content-max-contrast': 'palette-content-intense',

    'inverse-content-max-contrast': 'palette-content-inverse-intense',
    'inverse-content-min-contrast': 'palette-neutral-light',

    inverse: 'palette-surface-inverse',
    'inverse-light': 'palette-surface-inverse-light',
    'inverse-dark': 'palette-surface-inverse-dark',
    'inverse-soft': 'palette-surface-inverse-soft',

    'primary-content-max-contrast': 'palette-content-intense',
    'primary-content-min-contrast': 'palette-neutral-light',

    'secondary-content-max-contrast': 'palette-content-high',
    'secondary-content-min-contrast': 'palette-neutral-300',

    'inverse-content': 'palette-content-intense',
  },

  darkMode: {
    base: 'palette-base-inverse',

    boundary: 'palette-various-zinc-700',
    'boundary-tint': 'palette-various-zinc-950',
    'boundary-ghost': 'palette-various-zinc-900',
    'boundary-subtle': 'palette-various-zinc-800',
    'boundary-weak': 'palette-various-zinc-700',
    'boundary-moderate': 'palette-various-zinc-600',
    'boundary-high': 'palette-various-zinc-500',
    'boundary-intense': 'palette-various-zinc-400',

    highlight: 'palette-highlight-inverse',
    'highlight-tint': 'palette-highlight-inverse-tint',
    'highlight-ghost': 'palette-highlight-inverse-ghost',
    'highlight-subtle': 'palette-highlight-inverse-subtle',
    'highlight-weak': 'palette-highlight-inverse-weak',
    'highlight-moderate': 'palette-highlight-inverse-moderate',
    'highlight-high': 'palette-highlight-inverse-high',
    'highlight-strong': 'palette-highlight-inverse-strong',
    'highlight-intense': 'palette-highlight-inverse-intense',

    content: 'palette-content-inverse',
    'content-tint': 'palette-content-inverse-tint',
    'content-ghost': 'palette-content-inverse-ghost',
    'content-subtle': 'palette-content-inverse-subtle',
    'content-weak': 'palette-content-inverse-weak',
    'content-moderate': 'palette-content-inverse-moderate',
    'content-high': 'palette-content-inverse-high',
    'content-strong': 'palette-content-inverse-strong',
    'content-intense': 'palette-content-inverse-intense',

    'content-min-contrast': 'palette-neutral-50',
    'content-max-contrast': 'palette-content-inverse-intense',

    'inverse-content-max-contrast': 'palette-content-intense',
    'inverse-content-min-contrast': 'palette-neutral',

    inverse: 'palette-surface',
    'inverse-light': 'palette-surface-light',
    'inverse-dark': 'palette-surface-dark',
    'inverse-soft': 'palette-surface-soft',

    'primary-content-max-contrast': 'palette-content-inverse-intense',
    'primary-content-min-contrast': 'palette-various-slate-300',

    'secondary-content-max-contrast': 'palette-content-inverse-high',
    'secondary-content-min-contrast': 'palette-various-slate-300',

    'inverse-content': 'palette-content-inverse-intense',
  },
} satisfies Record<string, Partial<ColorScheme>>;
