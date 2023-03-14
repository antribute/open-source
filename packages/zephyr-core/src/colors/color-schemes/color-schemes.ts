import { defineColorSchemes } from './color-schemes.helpers';
import { schemes } from './schemes';
import { ColorSchemeName } from './color-scheme-config.types';

export const mainColorSchemeNames = [
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
] satisfies ColorSchemeName[];

export const appStateColorSchemeNames = ['danger'] satisfies ColorSchemeName[];

export const colorSchemeNames = [
  ...mainColorSchemeNames,
  ...appStateColorSchemeNames,
] satisfies ColorSchemeName[];

export const colorSchemeDataAttributes = Object.fromEntries(
  colorSchemeNames.map((schemeName) => {
    return [`${schemeName}-color-scheme`, `color-scheme=${schemeName}`];
  })
);

export const { colorSchemeTokens, colorSchemeCssVariableClasses, colorSchemes } =
  defineColorSchemes(schemes);
