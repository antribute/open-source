import type { FixedLengthArray, LiteralUnion } from 'type-fest';
import type { ColorScaleKey } from './colors.constants';

export type ColorGroup = Record<LiteralUnion<ColorScaleKey, 'string'>, string>;

export type ColorGroupArray = FixedLengthArray<string, 10>;

export type HexValue = `#${string}`;

export type ColorShadeVariant = 'soft' | 'dark' | 'light';

export type ColorPropKey = 'DEFAULT' | ColorShadeVariant;

export type ColorAlphaVariant =
  | 'tint'
  | 'ghost'
  | 'subtle'
  | 'weak'
  | 'moderate'
  | 'high'
  | 'strong'
  | 'intense';
