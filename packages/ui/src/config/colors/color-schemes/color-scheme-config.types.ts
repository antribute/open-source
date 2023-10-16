import type { O } from 'ts-toolbelt';
import type { PaletteColor } from '../colors';
import type { OptionalExceptFor } from '../../helpers/type-utilities';
import type { ColorSchemeToken } from './color-scheme-tokens.types';
import type { commonScheme } from './schemes/common-scheme';

export type ColorScheme = Record<ColorSchemeToken, PaletteColor>;

export type ResolvedColorScheme = { [K in keyof ColorScheme]: string };

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
  | 'success'
  | 'danger'
  | 'info'
  | 'caution'
  | 'heart';

export interface BaseColorSchemeConfig<
  TName extends ColorSchemeConfigName = ColorSchemeConfigName
> {
  name: TName;
  colorMode: 'light' | 'dark';
  scheme: O.Optional<ColorScheme, DefaultColorSchemeProperties>;
}

export interface ExtendedColorSchemeConfig<
  TName extends ColorSchemeConfigName = ColorSchemeConfigName
> extends OptionalExceptFor<BaseColorSchemeConfig<TName>, 'name'> {
  extend: ResolvedColorSchemeConfig;
}

export type ColorSchemeConfig<TName extends ColorSchemeConfigName = ColorSchemeConfigName> =
  | BaseColorSchemeConfig<TName>
  | ExtendedColorSchemeConfig<TName>;

export type ResolvedColorSchemeConfig = Omit<ColorSchemeConfig, 'scheme'> & {
  scheme: ResolvedColorScheme;
  unresolvedScheme: ColorScheme;
};

type ColorSchemeConfigName = keyof GenericColorSchemeConfig;

export type GenericColorSchemeConfig = Partial<
  Record<`dark/${ColorSchemeName}`, ResolvedColorScheme>
> & {
  [K in ColorSchemeName | 'dark/default']: ResolvedColorScheme;
};

type DefaultColorSchemeProperties =
  | keyof (typeof commonScheme)['all']
  | keyof (typeof commonScheme)['darkMode']
  | keyof (typeof commonScheme)['lightMode'];
