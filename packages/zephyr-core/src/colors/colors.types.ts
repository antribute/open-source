/* eslint-disable import/no-extraneous-dependencies */
import { FixedLengthArray, LiteralUnion } from 'type-fest';
import { ColorScaleKey } from './colors.constants';

export type ColorGroup = Record<LiteralUnion<ColorScaleKey, 'string'>, string>;

export type ColorGroupArray = FixedLengthArray<string, 10>;

export type HexValue = `#${string}`;

export type ColorShadeVariant = 'soft' | 'dark' | 'light';

export type ColorPropKey = 'DEFAULT' | ColorShadeVariant;
