import { ColorShadeVariant } from './colors.types';
import { colorPalette } from './colors';
import { objectMap } from './helpers/objectMap';
import {
  CssAlphaVariable,
  CssColorVariable,
  // CssVariableRgbaData,
  getCssAlphaVariable,
  getCssColorVariable,
  getCssVariableRgb,
  getCssVariableValue,
} from './helpers/cssVariables';
import { ColorAlphaVariant } from './colors.constants';

export type ColorSchemes = typeof colorSchemes;

export type ColorSchemeName = (typeof colorSchemeNames)[number];

export const colorSchemeNames = [
  'default',
  'neutral',
  'neutral-light',
  'neutral-dark',
  'surface',
  'surface-light',
  'surface-dark',
  'inverse',
] as const;

export const colorSchemeDataAttributes = Object.fromEntries(
  colorSchemeNames.map((schemeName) => {
    return [`${schemeName}-color-scheme`, `color-scheme=${schemeName}`];
  })
);

type ColorSchemeToken =
  | 'base'
  | TokenVariant<'primary'>
  | TokenVariant<'secondary'>
  | TokenVariant<'inverse'>
  | TokenShadeVariant<'surface'>
  | TokenShadeVariant<'heart'>
  | TokenShadeVariant<'info'>
  | TokenShadeVariant<'positive'>
  | TokenShadeVariant<'caution'>
  | TokenShadeVariant<'danger'>
  | TokenStrengthVariant<'highlight', 'weak' | 'moderate' | 'high' | 'strong' | 'DEFAULT'>
  | TokenStrengthVariant<
      'boundary',
      'tint' | 'ghost' | 'subtle' | 'weak' | 'moderate' | 'high' | 'strong' | 'DEFAULT'
    >
  | ContentTokenVariant<'content'>;

type TokenVariant<T extends string> =
  | TokenShadeVariant<T>
  | MinMaxContentContrastTokenVariant<T>
  | `${T}-content`;

type ContentTokenName<T extends string> = T extends 'content' ? 'content' : `${T}-content`;

type MinMaxContentContrastTokenVariant<T extends string> =
  | `${ContentTokenName<T>}-min-contrast`
  | `${ContentTokenName<T>}-max-contrast`;

type ContentTokenVariant<T extends string> =
  | TokenStrengthVariant<ContentTokenName<T>>
  | MinMaxContentContrastTokenVariant<T>;

type TokenShadeVariant<T extends string> = T | `${T}-${ColorShadeVariant}`;

type TokenStrengthVariant<
  T extends string,
  TPick extends ColorAlphaVariant | 'DEFAULT' = ColorAlphaVariant | 'DEFAULT'
> = `${T}-${Exclude<TPick, 'DEFAULT'>}` | (TPick extends 'DEFAULT' ? T : never);

type ColorScheme = Record<ColorSchemeToken, string>;

interface GenericColorSchemeConfig {
  'light/default': ColorScheme;
  'dark/default': ColorScheme;
  [k: string]: ColorScheme;
}

// Surface
// ({ DEFAULT: '50', dark: '400', light: '200', soft: '100' }),

// Surface inverse
// ({ DEFAULT: '400', dark: '700', light: '200', soft: '500' }),

const commonSchemeTokens = {
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

  lightBgContrast: {
    base: colorPalette['palette-base'].DEFAULT,

    highlight: colorPalette['palette-highlight'].DEFAULT,
    'highlight-weak': colorPalette['palette-highlight'].weak,
    'highlight-moderate': colorPalette['palette-highlight'].moderate,
    'highlight-high': colorPalette['palette-highlight'].high,
    'highlight-strong': colorPalette['palette-highlight'].strong,

    boundary: colorPalette['palette-boundary'].DEFAULT,
    'boundary-tint': colorPalette['palette-boundary'].tint,
    'boundary-ghost': colorPalette['palette-boundary'].ghost,
    'boundary-subtle': colorPalette['palette-boundary'].subtle,
    'boundary-weak': colorPalette['palette-boundary'].weak,
    'boundary-moderate': colorPalette['palette-boundary'].moderate,
    'boundary-strong': colorPalette['palette-boundary'].strong,
    'boundary-high': colorPalette['palette-boundary'].high,

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

  darkBgContrast: {
    base: colorPalette['palette-base'].inverse,

    highlight: colorPalette['palette-highlight-inverse'].DEFAULT,
    'highlight-weak': colorPalette['palette-highlight-inverse'].weak,
    'highlight-moderate': colorPalette['palette-highlight-inverse'].moderate,
    'highlight-high': colorPalette['palette-highlight-inverse'].high,
    'highlight-strong': colorPalette['palette-highlight-inverse'].strong,

    boundary: colorPalette['palette-boundary-inverse'].DEFAULT,
    'boundary-tint': colorPalette['palette-boundary-inverse'].tint,
    'boundary-ghost': colorPalette['palette-boundary-inverse'].ghost,
    'boundary-subtle': colorPalette['palette-boundary-inverse'].subtle,
    'boundary-weak': colorPalette['palette-boundary-inverse'].weak,
    'boundary-moderate': colorPalette['palette-boundary-inverse'].moderate,
    'boundary-strong': colorPalette['palette-boundary-inverse'].strong,
    'boundary-high': colorPalette['palette-boundary-inverse'].high,

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

const lightDefault = {
  ...commonSchemeTokens.all,

  ...commonSchemeTokens.lightBgContrast,

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
} satisfies ColorScheme;

const colorSchemeConfig = {
  // Default

  'light/default': lightDefault,

  'dark/default': {
    ...commonSchemeTokens.all,
    ...commonSchemeTokens.darkBgContrast,

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

  // Surface
  surface: lightDefault,
  'surface-light': {
    ...commonSchemeTokens.all,
    ...commonSchemeTokens.lightBgContrast,

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
    ...commonSchemeTokens.all,
    ...commonSchemeTokens.lightBgContrast,

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

  'dark/surface': {
    ...commonSchemeTokens.all,
    ...commonSchemeTokens.darkBgContrast,

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
    ...commonSchemeTokens.all,
    ...commonSchemeTokens.darkBgContrast,

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
    ...commonSchemeTokens.all,
    ...commonSchemeTokens.darkBgContrast,

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

  // Neutral
  neutral: {
    ...commonSchemeTokens.all,
    ...commonSchemeTokens.darkBgContrast,

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
    ...commonSchemeTokens.all,
    ...commonSchemeTokens.darkBgContrast,

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
    ...commonSchemeTokens.all,
    ...commonSchemeTokens.darkBgContrast,

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

  // Inverse
  inverse: {
    ...commonSchemeTokens.all,
    ...commonSchemeTokens.darkBgContrast,

    surface: colorPalette['palette-content'].DEFAULT,
    'surface-light': colorPalette['palette-surface-inverse'].light,
    'surface-dark': colorPalette['palette-surface-inverse'].dark,
    'surface-soft': colorPalette['palette-surface-inverse'][300],

    primary: colorPalette['palette-various-slate']['400'],
    'primary-light': colorPalette['palette-various-slate']['300'],
    'primary-dark': colorPalette['palette-various-slate']['500'],
    'primary-soft': colorPalette['palette-various-slate']['200'],

    secondary: colorPalette['palette-various-slate']['500'],
    'secondary-light': colorPalette['palette-various-slate']['400'],
    'secondary-dark': colorPalette['palette-various-slate']['600'],
    'secondary-soft': colorPalette['palette-various-slate']['300'],
  },

  // 'dark/inverse': {
  //   ...commonSchemeTokens.all,
  //   ...commonSchemeTokens.lightBgContrast,

  //   surface: colorPalette['palette-surface'].DEFAULT,
  //   'surface-light': colorPalette['palette-surface'].DEFAULT,
  //   'surface-dark': colorPalette['palette-surface'].dark,
  //   'surface-soft': colorPalette['palette-surface'].DEFAULT,

  //   primary: colorPalette['palette-neutral']['500'],
  //   'primary-light': colorPalette['palette-neutral']['400'],
  //   'primary-dark': colorPalette['palette-neutral']['600'],
  //   'primary-soft': colorPalette['palette-various-slate']['200'],

  //   secondary: colorPalette['palette-various-slate']['400'],
  //   'secondary-light': colorPalette['palette-various-slate']['300'],
  //   'secondary-dark': colorPalette['palette-various-slate']['500'],
  //   'secondary-soft': colorPalette['palette-various-slate']['100'],
  // },

  'dark/inverse': lightDefault,
} satisfies GenericColorSchemeConfig;

export const { colorSchemeTokens, colorSchemeCssVariableClasses, colorSchemes } =
  defineColorSchemes(colorSchemeConfig);

function defineColorSchemes<T extends GenericColorSchemeConfig>(colorSchemes: T) {
  const colorSchemeCssVariableClasses = getColorSchemesCssVariableClasses(colorSchemes);

  const lightDefault = colorSchemes['light/default'];
  const colorSchemeTokens = getColorSchemeTokens(
    lightDefault,
    colorSchemeCssVariableClasses[':root']!
  ) as Record<keyof typeof lightDefault, string>;

  // eslint-disable-next-line no-console
  console.log({ colorSchemeTokens, colorSchemes, colorSchemeCssVariableClasses });
  return {
    colorSchemes,
    colorSchemeCssVariableClasses,
    colorSchemeTokens,
  };
}

function getColorSchemeTokens<T extends Record<string, string>>(scheme: T, variableMap: T) {
  return objectMap(scheme, (token) => {
    const cssVariable = getCssColorVariable(token);
    const alphaVariable = getCssAlphaVariable(token);

    return [
      `${token}`,
      getCssVariableValue(cssVariable, alphaVariable in variableMap ? alphaVariable : undefined),
    ];
  });
}

function getColorSchemesCssVariableClasses<T extends GenericColorSchemeConfig>(colorSchemes: T) {
  return Object.fromEntries(
    Object.entries(colorSchemes).flatMap(([schemeKey, value]) => {
      const cssThemeVariablesMap = Object.fromEntries(
        Object.entries(value).flatMap(([themeToken, hex]) => {
          const colorVariableName = getCssColorVariable(themeToken);
          const alphaVariableName = getCssAlphaVariable(themeToken);

          const { rgb, alpha } = getCssVariableRgb(hex);

          const entries: [string, string | number][] = [[colorVariableName, rgb]];

          if (alpha >= 0 && alpha !== 1) {
            entries.push([alphaVariableName, `${parseFloat(alpha.toFixed(2))}`]);
          }

          return entries as [CssColorVariable | CssAlphaVariable, string][];
        })
      ) as Record<ColorSchemeToken, string>;

      return getColorSchemeCssVariableNames(schemeKey).map((cssVariableName) => {
        return [cssVariableName, { color: value.content, ...cssThemeVariablesMap }];
      });
    })
  );
}

function getColorSchemeCssVariableNames(schemeKey: string) {
  const [mode, ...rest] = schemeKey.split('/');

  const baseSchemeKey = rest.join('/');

  const dataColorSchemeClass = `[data-color-scheme="${schemeKey}"]`;

  const isDarkMode = mode === 'dark';

  if (schemeKey === 'light/default') {
    return [':root', dataColorSchemeClass];
  }

  if (schemeKey === 'dark/default') {
    return ['[data-mode="dark"]', dataColorSchemeClass];
  }

  if (isDarkMode) {
    return [`[data-mode="dark"] [data-color-scheme="${baseSchemeKey!}"]`];
  }

  return [dataColorSchemeClass];
}
