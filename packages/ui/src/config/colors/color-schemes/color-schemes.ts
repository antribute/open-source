import { defineColorSchemes } from './color-schemes.helpers';
import { colorSchemeConfigs } from './schemes';
import type { ColorSchemeName } from './color-scheme-config.types';

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

export type ColorSchemeBaseTokens = (typeof colorSchemeBaseTokens)[number];

export const colorSchemeBaseTokens = [
  'primary',
  'secondary',
  'inverse',
  'surface',
  'heart',
  'info',
  'success',
  'caution',
  'danger',
  'highlight',
  'boundary',
  'content',
] as const;

export const appStateColorSchemeNames = [
  'danger',
  'info',
  'danger',
  'caution',
  'success',
] satisfies ColorSchemeName[];

export const colorSchemeNames = [
  ...mainColorSchemeNames,
  ...appStateColorSchemeNames,
] as ColorSchemeName[];

export const colorSchemeDataAttributes = Object.fromEntries(
  colorSchemeNames.map((schemeName) => {
    return [`${schemeName}-color-scheme`, `color-scheme=${schemeName}`];
  })
);

export const { colorSchemeTokens, colorSchemeCssVariableClasses, colorSchemes } =
  defineColorSchemes(colorSchemeConfigs);
