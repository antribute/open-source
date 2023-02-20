/* eslint-disable import/no-extraneous-dependencies */
import { FixedLengthArray, LiteralUnion } from 'type-fest';
import { ColorScaleKey } from './colors.constants';

export type ColorGroup = Record<LiteralUnion<ColorScaleKey, 'string'>, string>;

export type ColorGroupArray = FixedLengthArray<string, 10>;

export type ColorPropKey = 'DEFAULT' | 'soft' | 'dark' | 'light';

export type HexValue = `#${string}`;
