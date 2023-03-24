import {
  CssAlphaVariable,
  CssColorVariable,
  getCssAlphaVariable,
  getCssColorVariable,
  getCssVariableRgb,
  getCssVariableValue,
} from '../helpers/cssVariables';
import { objectMap } from '../helpers/objectMap';
import {
  ColorSchemeConfig,
  GenericColorSchemeConfig,
  ResolvedColorSchemeConfig,
} from './color-scheme-config.types';
import { ColorSchemeToken } from './color-scheme-tokens.types';
import { commonScheme } from './schemes/common-scheme';

export function defineColorScheme<T extends ColorSchemeConfig>({ name, colorMode, scheme }: T) {
  const colorModeScheme = colorMode === 'dark' ? commonScheme.darkMode : commonScheme.lightMode;

  const resolvedScheme = { ...commonScheme.all, ...colorModeScheme, ...scheme };

  return {
    name,
    colorMode,
    scheme: resolvedScheme,
  } as ResolvedColorSchemeConfig;
}

export function defineColorSchemes<T extends ResolvedColorSchemeConfig[]>(
  resolvedSchemeConfigs: T
) {
  const colorSchemes = resolvedSchemeConfigs.reduce<GenericColorSchemeConfig>((acc, cur) => {
    acc[cur.name] = cur.scheme;
    return acc;
    // eslint-disable-next-line @typescript-eslint/prefer-reduce-type-parameter
  }, {} as GenericColorSchemeConfig);

  const colorSchemeCssVariableClasses = getColorSchemesCssVariableClasses(colorSchemes);

  const lightDefault = colorSchemes.default;

  const colorSchemeTokens = getColorSchemeTokens(
    lightDefault,
    colorSchemeCssVariableClasses[':root']!
  ) as Record<keyof typeof lightDefault, string>;

  return {
    colorSchemes,
    colorSchemeCssVariableClasses,
    colorSchemeTokens,
    colorSchemeConfigs: resolvedSchemeConfigs,
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
