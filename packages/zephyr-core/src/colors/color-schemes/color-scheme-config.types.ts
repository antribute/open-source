import type { O } from 'ts-toolbelt';
import { ColorSchemeToken } from './color-scheme-tokens.types';
import { commonScheme } from './schemes/common-scheme';

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
  | 'inverse-dark'
  | 'danger';

export interface ColorSchemeConfig<
  TName extends keyof GenericColorSchemeConfig = keyof GenericColorSchemeConfig
> {
  name: TName;
  colorMode: 'light' | 'dark';
  scheme: O.Optional<
    ColorScheme,
    | keyof (typeof commonScheme)['all']
    | keyof (typeof commonScheme)['darkMode']
    | keyof (typeof commonScheme)['lightMode']
  >;
}

export type ResolvedColorSchemeConfig = Omit<ColorSchemeConfig, 'scheme'> & {
  scheme: ColorScheme;
};

export type GenericColorSchemeConfig = Partial<Record<`dark/${ColorSchemeName}`, ColorScheme>> & {
  [K in ColorSchemeName | 'dark/default']: ColorScheme;
};
