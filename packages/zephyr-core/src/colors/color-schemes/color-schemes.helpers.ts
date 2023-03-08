import {
  CssAlphaVariable,
  CssColorVariable,
  getCssAlphaVariable,
  getCssColorVariable,
  getCssVariableRgb,
  getCssVariableValue,
} from '../helpers/cssVariables';
import { objectMap } from '../helpers/objectMap';
import { GenericColorSchemeConfig } from './color-scheme-config.types';
import { ColorSchemeToken } from './color-scheme-tokens.types';

export function defineColorSchemes<T extends GenericColorSchemeConfig>(colorSchemes: T) {
  const colorSchemeCssVariableClasses = getColorSchemesCssVariableClasses(colorSchemes);

  const lightDefault = colorSchemes.default;

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

  if (schemeKey === 'default') {
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
