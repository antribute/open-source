import { defineColorSchemes } from './color-schemes.helpers';
import { schemes } from './schemes';
import { ColorSchemeName } from './color-scheme-config.types';

export const colorSchemeNames = [
  'default',
  'surface',
  'surface-light',
  'surface-dark',
  'neutral',
  'neutral-light',
  'neutral-dark',
  'inverse',
  'inverse-light',
  'inverse-dark',
] as ColorSchemeName[];

export const colorSchemeDataAttributes = Object.fromEntries(
  colorSchemeNames.map((schemeName) => {
    return [`${schemeName}-color-scheme`, `color-scheme=${schemeName}`];
  })
);

export const { colorSchemeTokens, colorSchemeCssVariableClasses, colorSchemes } =
  defineColorSchemes(schemes);
