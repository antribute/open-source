import { ColorSchemeToken } from './color-scheme-tokens.types';

export type ColorScheme = Record<ColorSchemeToken, string>;

export type ColorSchemeName =
  | 'default'
  | 'neutral'
  | 'neutral-light'
  | 'neutral-dark'
  | 'surface'
  | 'surface-light'
  | 'surface-dark'
  | 'inverse'
  | 'inverse-light'
  | 'inverse-dark';

export type GenericColorSchemeConfig = Partial<Record<`dark/${ColorSchemeName}`, ColorScheme>> & {
  [K in ColorSchemeName | 'dark/default']: ColorScheme;
};
