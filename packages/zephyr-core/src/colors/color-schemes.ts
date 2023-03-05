import { ColorShadeVariant } from './colors.types';
import { colors } from './colors';
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

type ColorSchemeToken =
  | 'base'
  | TokenShadeVariant<'secondary'>
  | TokenShadeVariant<'primary'>
  | TokenShadeVariant<'surface'>
  | TokenStrengthVariant<'highlight', 'weak' | 'moderate' | 'high' | 'strong' | 'DEFAULT'>
  | TokenStrengthVariant<'content', 'weak' | 'moderate' | 'high' | 'strong' | 'DEFAULT'>;

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

const colorSchemeConfig = {
  'light/default': {
    base: colors.base.DEFAULT,

    content: colors.content.DEFAULT,
    'content-moderate': colors.content.moderate,
    'content-weak': colors.content.weak,
    'content-high': colors.content.high,
    'content-strong': colors.content.strong,

    highlight: colors.highlight.DEFAULT,
    'highlight-weak': colors.highlight.weak,
    'highlight-moderate': colors.highlight.moderate,
    'highlight-high': colors.highlight.strong,
    'highlight-strong': colors.highlight.strong,

    surface: colors.neutral[600],
    'surface-light': colors.neutral.light,
    'surface-dark': colors.neutral.dark,
    'surface-soft': colors.neutral[100],

    primary: colors['various-slate']['500'],
    'primary-light': colors['various-slate']['400'],
    'primary-dark': colors['various-slate']['600'],
    'primary-soft': colors['various-slate']['200'],

    secondary: colors['various-slate']['600'],
    'secondary-light': colors['various-slate']['500'],
    'secondary-dark': colors['various-slate']['700'],
    'secondary-soft': colors['various-slate']['300'],
  },

  'dark/default': {
    base: colors.base.inverse,

    content: colors['content-inverse'].DEFAULT,
    'content-weak': colors['content-inverse'].weak,
    'content-moderate': colors['content-inverse'].moderate,
    'content-high': colors['content-inverse'].high,
    'content-strong': colors['content-inverse'].strong,

    highlight: colors.highlight.DEFAULT,
    'highlight-weak': colors.highlight.weak,
    'highlight-moderate': colors.highlight.moderate,
    'highlight-high': colors.highlight.high,
    'highlight-strong': colors.highlight.strong,

    surface: colors['surface-inverse'].DEFAULT,
    'surface-light': colors['surface-inverse'].light,
    'surface-dark': colors['surface-inverse'].dark,
    'surface-soft': colors['surface-inverse'].soft,

    primary: colors['various-slate']['500'],
    'primary-light': colors['various-slate']['400'],
    'primary-dark': colors['various-slate']['600'],
    'primary-soft': colors['various-slate']['200'],

    secondary: colors['various-slate']['600'],
    'secondary-light': colors['various-slate']['500'],
    'secondary-dark': colors['various-slate']['500'],
    'secondary-soft': colors['various-slate']['300'],
  },

  surface: {
    base: colors.base.inverse,

    content: colors.content.DEFAULT,
    'content-weak': colors.content.weak,
    'content-moderate': colors.content.moderate,
    'content-high': colors.content.high,
    'content-strong': colors.content.strong,

    highlight: colors.highlight.DEFAULT,
    'highlight-weak': colors.highlight.weak,
    'highlight-moderate': colors.highlight.moderate,
    'highlight-high': colors.highlight.high,
    'highlight-strong': colors.highlight.strong,

    surface: colors.surface.DEFAULT,
    'surface-light': colors.neutral.light,
    'surface-dark': colors.neutral.dark,
    'surface-soft': colors.neutral[100],

    primary: colors['various-slate']['500'],
    'primary-light': colors['various-slate']['400'],
    'primary-dark': colors['various-slate']['600'],
    'primary-soft': colors['various-slate']['200'],

    secondary: colors['various-slate']['600'],
    'secondary-light': colors['various-slate']['500'],
    'secondary-dark': colors['various-slate']['500'],
    'secondary-soft': colors['various-slate']['300'],
  },
  'surface-light': {
    base: colors.base.inverse,

    content: colors.content.DEFAULT,
    'content-weak': colors.content.weak,
    'content-moderate': colors.content.moderate,
    'content-high': colors.content.high,
    'content-strong': colors.content.strong,

    highlight: colors.highlight.DEFAULT,
    'highlight-weak': colors.highlight.weak,
    'highlight-moderate': colors.highlight.moderate,
    'highlight-high': colors.highlight.high,
    'highlight-strong': colors.highlight.strong,

    surface: colors.surface.light,
    'surface-light': colors.neutral.light,
    'surface-dark': colors.neutral.dark,
    'surface-soft': colors.neutral[100],

    primary: colors['various-slate']['500'],
    'primary-light': colors['various-slate']['400'],
    'primary-dark': colors['various-slate']['600'],
    'primary-soft': colors['various-slate']['200'],

    secondary: colors['various-slate']['600'],
    'secondary-light': colors['various-slate']['500'],
    'secondary-dark': colors['various-slate']['500'],
    'secondary-soft': colors['various-slate']['300'],
  },

  'surface-dark': {
    base: colors.base.inverse,

    content: colors.content.DEFAULT,
    'content-weak': colors.content.weak,
    'content-moderate': colors.content.moderate,
    'content-high': colors.content.high,
    'content-strong': colors.content.strong,

    highlight: colors.highlight.DEFAULT,
    'highlight-weak': colors.highlight.weak,
    'highlight-moderate': colors.highlight.moderate,
    'highlight-high': colors.highlight.high,
    'highlight-strong': colors.highlight.strong,

    surface: colors.surface.dark,
    'surface-light': colors.neutral.light,
    'surface-dark': colors.neutral.dark,
    'surface-soft': colors.neutral[100],

    primary: colors['various-slate']['500'],
    'primary-light': colors['various-slate']['400'],
    'primary-dark': colors['various-slate']['600'],
    'primary-soft': colors['various-slate']['200'],

    secondary: colors['various-slate']['600'],
    'secondary-light': colors['various-slate']['500'],
    'secondary-dark': colors['various-slate']['500'],
    'secondary-soft': colors['various-slate']['300'],
  },

  'dark/surface': {
    base: colors.base.inverse,

    content: colors['content-inverse'].DEFAULT,
    'content-weak': colors['content-inverse'].weak,
    'content-moderate': colors['content-inverse'].moderate,
    'content-high': colors['content-inverse'].high,
    'content-strong': colors['content-inverse'].strong,

    highlight: colors.highlight.DEFAULT,
    'highlight-weak': colors.highlight.weak,
    'highlight-moderate': colors.highlight.moderate,
    'highlight-high': colors.highlight.high,
    'highlight-strong': colors.highlight.strong,

    surface: colors['surface-inverse'].DEFAULT,
    'surface-light': colors.neutral.light,
    'surface-dark': colors.neutral.dark,
    'surface-soft': colors.neutral[100],

    primary: colors['various-slate']['500'],
    'primary-light': colors['various-slate']['400'],
    'primary-dark': colors['various-slate']['600'],
    'primary-soft': colors['various-slate']['200'],

    secondary: colors['various-slate']['600'],
    'secondary-light': colors['various-slate']['500'],
    'secondary-dark': colors['various-slate']['500'],
    'secondary-soft': colors['various-slate']['300'],
  },

  'dark/surface-light': {
    base: colors.base.inverse,

    content: colors['content-inverse'].DEFAULT,
    'content-weak': colors['content-inverse'].weak,
    'content-moderate': colors['content-inverse'].moderate,
    'content-high': colors['content-inverse'].high,
    'content-strong': colors['content-inverse'].strong,

    highlight: colors.highlight.DEFAULT,
    'highlight-weak': colors.highlight.weak,
    'highlight-moderate': colors.highlight.moderate,
    'highlight-high': colors.highlight.high,
    'highlight-strong': colors.highlight.strong,

    surface: colors['surface-inverse'].light,
    'surface-light': colors.neutral.light,
    'surface-dark': colors.neutral.dark,
    'surface-soft': colors.neutral[100],

    primary: colors['various-slate']['500'],
    'primary-light': colors['various-slate']['400'],
    'primary-dark': colors['various-slate']['600'],
    'primary-soft': colors['various-slate']['200'],

    secondary: colors['various-slate']['600'],
    'secondary-light': colors['various-slate']['500'],
    'secondary-dark': colors['various-slate']['500'],
    'secondary-soft': colors['various-slate']['300'],
  },
  'dark/surface-dark': {
    base: colors.base.inverse,

    content: colors['content-inverse'].DEFAULT,
    'content-weak': colors['content-inverse'].weak,
    'content-moderate': colors['content-inverse'].moderate,
    'content-high': colors['content-inverse'].high,
    'content-strong': colors['content-inverse'].strong,

    highlight: colors.highlight.DEFAULT,
    'highlight-weak': colors.highlight.weak,
    'highlight-moderate': colors.highlight.moderate,
    'highlight-high': colors.highlight.high,
    'highlight-strong': colors.highlight.strong,

    surface: colors['surface-inverse'].dark,
    'surface-light': colors.neutral.light,
    'surface-dark': colors.neutral.dark,
    'surface-soft': colors.neutral[100],

    primary: colors['various-slate']['500'],
    'primary-light': colors['various-slate']['400'],
    'primary-dark': colors['various-slate']['600'],
    'primary-soft': colors['various-slate']['200'],

    secondary: colors['various-slate']['600'],
    'secondary-light': colors['various-slate']['500'],
    'secondary-dark': colors['various-slate']['500'],
    'secondary-soft': colors['various-slate']['300'],
  },

  neutral: {
    base: colors.base.inverse,

    content: colors['content-inverse'].DEFAULT,
    'content-weak': colors['content-inverse'].weak,
    'content-moderate': colors['content-inverse'].moderate,
    'content-high': colors['content-inverse'].high,
    'content-strong': colors['content-inverse'].strong,

    highlight: colors.highlight.DEFAULT,
    'highlight-weak': colors.highlight.weak,
    'highlight-moderate': colors.highlight.moderate,
    'highlight-high': colors.highlight.high,
    'highlight-strong': colors.highlight.strong,

    surface: colors.neutral[600],
    'surface-light': colors.neutral.light,
    'surface-dark': colors.neutral.dark,
    'surface-soft': colors.neutral[100],

    primary: colors['various-slate']['500'],
    'primary-light': colors['various-slate']['400'],
    'primary-dark': colors['various-slate']['600'],
    'primary-soft': colors['various-slate']['200'],

    secondary: colors['various-slate']['600'],
    'secondary-light': colors['various-slate']['500'],
    'secondary-dark': colors['various-slate']['500'],
    'secondary-soft': colors['various-slate']['300'],
  },

  inverse: {
    base: colors.base.inverse,

    content: colors['content-inverse'].DEFAULT,
    'content-weak': colors['content-inverse'].weak,
    'content-moderate': colors['content-inverse'].moderate,
    'content-high': colors['content-inverse'].high,
    'content-strong': colors['content-inverse'].strong,

    highlight: colors.highlight.DEFAULT,
    'highlight-weak': colors.highlight.weak,
    'highlight-moderate': colors.highlight.moderate,
    'highlight-high': colors.highlight.high,
    'highlight-strong': colors.highlight.strong,

    surface: colors.content.DEFAULT,
    'surface-light': colors.neutral.light,
    'surface-dark': colors.neutral.dark,
    'surface-soft': colors.neutral[100],

    primary: colors['various-slate']['500'],
    'primary-light': colors['various-slate']['400'],
    'primary-dark': colors['various-slate']['600'],
    'primary-soft': colors['various-slate']['200'],

    secondary: colors['various-slate']['600'],
    'secondary-light': colors['various-slate']['500'],
    'secondary-dark': colors['various-slate']['500'],
    'secondary-soft': colors['various-slate']['300'],
  },
  'dark/inverse': {
    base: colors.base.inverse,

    content: colors['content-inverse'].DEFAULT,
    'content-weak': colors['content-inverse'].weak,
    'content-moderate': colors['content-inverse'].moderate,
    'content-high': colors['content-inverse'].high,
    'content-strong': colors['content-inverse'].strong,

    highlight: colors.highlight.DEFAULT,
    'highlight-weak': colors.highlight.weak,
    'highlight-moderate': colors.highlight.moderate,
    'highlight-high': colors.highlight.high,
    'highlight-strong': colors.highlight.strong,

    surface: colors['content-inverse'].DEFAULT,
    'surface-light': colors.surface.light,
    'surface-dark': colors.content.intense,
    'surface-soft': colors.neutral[100],

    primary: colors['various-slate']['500'],
    'primary-light': colors['various-slate']['400'],
    'primary-dark': colors['various-slate']['600'],
    'primary-soft': colors['various-slate']['200'],

    secondary: colors['various-slate']['600'],
    'secondary-light': colors['various-slate']['500'],
    'secondary-dark': colors['various-slate']['500'],
    'secondary-soft': colors['various-slate']['300'],
  },

  'neutral-light': {
    base: colors.base.inverse,

    content: colors['content-inverse'].DEFAULT,
    'content-weak': colors['content-inverse'].weak,
    'content-moderate': colors['content-inverse'].moderate,
    'content-high': colors['content-inverse'].high,
    'content-strong': colors['content-inverse'].strong,

    highlight: colors.highlight.DEFAULT,
    'highlight-weak': colors.highlight.weak,
    'highlight-moderate': colors.highlight.moderate,
    'highlight-high': colors.highlight.high,
    'highlight-strong': colors.highlight.strong,

    surface: colors.neutral[400],
    'surface-light': colors.neutral.light,
    'surface-dark': colors.neutral.dark,
    'surface-soft': colors.neutral[100],

    primary: colors['various-slate']['400'],
    'primary-light': colors['various-slate']['300'],
    'primary-dark': colors['various-slate']['500'],
    'primary-soft': colors['various-slate']['100'],

    secondary: colors['various-slate']['600'],
    'secondary-light': colors['various-slate']['500'],
    'secondary-dark': colors['various-slate']['700'],
    'secondary-soft': colors['various-slate']['300'],
  },

  'neutral-dark': {
    base: colors.base.inverse,

    content: colors['content-inverse'].DEFAULT,
    'content-weak': colors['content-inverse'].weak,
    'content-moderate': colors['content-inverse'].moderate,
    'content-high': colors['content-inverse'].high,
    'content-strong': colors['content-inverse'].strong,

    highlight: colors.highlight.DEFAULT,
    'highlight-weak': colors.highlight.weak,
    'highlight-moderate': colors.highlight.moderate,
    'highlight-high': colors.highlight.high,
    'highlight-strong': colors.highlight.strong,

    surface: colors.neutral[800],
    'surface-light': colors.neutral['700'],
    'surface-dark': colors.neutral['900'],
    'surface-soft': colors.neutral['600'],

    primary: colors['various-slate']['500'],
    'primary-light': colors['various-slate']['400'],
    'primary-dark': colors['various-slate']['600'],
    'primary-soft': colors['various-slate']['200'],

    secondary: colors['various-slate']['600'],
    'secondary-light': colors['various-slate']['500'],
    'secondary-dark': colors['various-slate']['500'],
    'secondary-soft': colors['various-slate']['300'],
  },
} satisfies GenericColorSchemeConfig;

export const { colorSchemeTokens, colorSchemeCssVariableClasses, colorSchemes } =
  defineColorSchemes(colorSchemeConfig);

function defineColorSchemes<T extends GenericColorSchemeConfig>(colorSchemes: T) {
  const colorSchemeCssVariableClasses = getColorSchemesCssVariableClasses(colorSchemes);
  const colorSchemeTokens = getColorSchemeTokens(
    colorSchemes['light/default'],
    colorSchemeCssVariableClasses[':root']!
  );

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

    // eslint-disable-next-line no-console
    console.log('SCHEME', scheme, 'Alpha variable', alphaVariable, 'variables', variableMap);

    return [
      token,
      getCssVariableValue(
        cssVariable,
        // alphaVariable in scheme ? scheme[alphaVariable as keyof typeof scheme] : undefined
        alphaVariable in variableMap ? alphaVariable : undefined
      ),
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
// function getColorSchemesCssVariableClasses<T extends GenericColorSchemeConfig>(colorSchemes: T) {
//   return Object.fromEntries(
//     Object.entries(colorSchemes).flatMap(([schemeKey, value]) => {
//       const cssThemeVariablesMap = objectMap(value, (themeToken, hex) => {
//         return [getCssVariable(themeToken), getCssVariableRgb(hex)];
//       });

//       return getColorSchemeCssVariableNames(schemeKey).map((cssVariableName) => {
//         return [cssVariableName, { color: value.content, ...cssThemeVariablesMap }];
//       });
//     })
//   );
// }

function getColorSchemeCssVariableNames(schemeKey: string) {
  const [mode, ...rest] = schemeKey.split('/');

  const baseSchemeKey = rest.join('/');

  const schemeKeyClass = `[data-color-scheme="${schemeKey}"]`;

  const isDarkMode = mode === 'dark';

  if (schemeKey === 'light/default') {
    return [':root', schemeKeyClass];
  }

  if (schemeKey === 'dark/default') {
    return ['[data-mode="dark"]', schemeKeyClass];
  }

  if (isDarkMode) {
    return [`[data-mode="dark"] [data-color-scheme="${baseSchemeKey!}"]`];
  }

  return [schemeKeyClass];
}
