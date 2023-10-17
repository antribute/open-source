import { colorPalette } from '../colors';
import type { CssAlphaVariable, CssColorVariable } from '../helpers/cssVariables';
import {
  getCssAlphaVariable,
  getCssColorVariable,
  getCssVariableRgb,
  getCssVariableValue,
} from '../helpers/cssVariables';
import { objectMap } from '../helpers/objectMap';
import type {
  ColorScheme,
  ColorSchemeConfig,
  GenericColorSchemeConfig,
  ResolvedColorScheme,
  ResolvedColorSchemeConfig,
} from './color-scheme-config.types';
import type { ColorSchemeToken } from './color-scheme-tokens.types';
import { commonScheme } from './schemes/common-scheme';

function resolveColorScheme(scheme: Partial<ColorScheme>): ResolvedColorScheme {
  return objectMap(scheme, ({ key, value }) => {
    const color = colorPalette[value!];
    return [key, color];
  });
}

function getExtendedConfig(options: ColorSchemeConfig) {
  if ('extend' in options) return options.extend;
  return undefined;
}

export function defineColorScheme<T extends ColorSchemeConfig>(options: T) {
  const { name, colorMode, scheme } = options;

  const extendedConfig = getExtendedConfig(options);

  const { scheme: extendedScheme } = extendedConfig ?? {};

  const colorModeScheme =
    (colorMode ?? extendedConfig?.colorMode) === 'dark'
      ? commonScheme.darkMode
      : commonScheme.lightMode;

  const resolvedScheme = resolveColorScheme({ ...commonScheme.all, ...colorModeScheme, ...scheme });

  return {
    ...extendedConfig,
    name,
    colorMode,
    scheme: { ...extendedScheme, ...resolvedScheme },
    unresolvedScheme: scheme,
  } as ResolvedColorSchemeConfig;
}

export function defineColorSchemes<T extends ResolvedColorSchemeConfig[]>(
  resolvedSchemeConfigs: T
) {
  const colorSchemes = resolvedSchemeConfigs.reduce<GenericColorSchemeConfig>((acc, cur) => {
    acc[cur.name] = cur.scheme;
    return acc;
  }, {} as GenericColorSchemeConfig);

  const colorSchemeCssVariableClasses = getColorSchemesCssVariableClasses(colorSchemes);

  const lightDefault = colorSchemes.default;

  const rootScheme = colorSchemeCssVariableClasses[':root']!;

  const colorSchemeTokens = getColorSchemeTokens(lightDefault, rootScheme) as Record<
    keyof typeof lightDefault,
    string
  >;

  return {
    colorSchemes,
    colorSchemeCssVariableClasses,
    colorSchemeTokens,
    colorSchemeConfigs: resolvedSchemeConfigs,
  };
}

function getColorSchemeTokens<T extends Record<string, string>>(scheme: T, variableMap: T) {
  return objectMap(scheme, ({ key: token }) => {
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
            entries.push([alphaVariableName, `${Number.parseFloat(alpha.toFixed(2))}`]);
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

  if (schemeKey === 'default') {
    return [':root', dataColorSchemeClass];
  }

  if (schemeKey === 'dark/default') {
    return ['[data-mode="dark"]', `[data-mode="dark"] [data-color-scheme="default"]`];
  }

  if (isDarkMode) {
    return [`[data-mode="dark"] [data-color-scheme="${baseSchemeKey!}"]`];
  }

  return [dataColorSchemeClass];
}
