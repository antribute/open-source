import type { LiteralUnion } from 'type-fest';
import type { ColorAlphaVariant } from '../colors.types';
import type { HexAlphaTransparency } from '../colors.constants';
import { hexAlphaCodes, hexTransparencyPresetMap } from '../colors.constants';
import type { HexAlphaOptions } from './generateHexAlpha';
import {
  generateHexAlpha,
  getTransparencyOption,
  getTransparencyPresetOption,
} from './generateHexAlpha';

type HexValueOption = {
  hexColor?: string;
} & HexAlphaOptions;

type HexAlphaOverrideValue<T extends string = ColorAlphaVariant> =
  | LiteralUnion<T, string>
  | HexValueOption
  | undefined;

type HexAlphaOverridesKey = LiteralUnion<'DEFAULT' | ColorAlphaVariant, string>;

type HexAlphaOverrides = {
  [K in HexAlphaOverridesKey]?: K extends ColorAlphaVariant
    ? HexAlphaOverrideValue<ColorAlphaVariant | HexAlphaTransparency>
    : HexAlphaOverrideValue;
};

type ColorGroupReturn = Record<ColorAlphaVariant | 'DEFAULT', string>;

type GenerateHexAlphaColorGroupReturn<TPrefix extends string | undefined> = {
  [K in keyof ColorGroupReturn as TPrefix extends string
    ? K extends 'DEFAULT'
      ? TPrefix
      : `${TPrefix}-${K}`
    : K]: ColorGroupReturn[K];
};
export function generateHexAlphaColorGroup<TPrefix extends string | undefined = undefined>(
  hex: string,
  alphaOverrides?: HexAlphaOverrides,
  options?: { prefix?: TPrefix }
): GenerateHexAlphaColorGroupReturn<TPrefix> {
  const defaultColorGroup = {
    tint: generateHexAlpha(hex, 'tint'),
    ghost: generateHexAlpha(hex, 'ghost'),
    subtle: generateHexAlpha(hex, 'subtle'),
    weak: generateHexAlpha(hex, 'weak'),
    moderate: generateHexAlpha(hex, 'moderate'),
    high: generateHexAlpha(hex, 'high'),
    strong: generateHexAlpha(hex, 'strong'),
    intense: generateHexAlpha(hex, 'intense'),
    DEFAULT: hex,
  };

  const overrides = Object.fromEntries(
    Object.entries(alphaOverrides ?? {}).map(([key, value]) => {
      if (!value) return [key, value];

      const { hexColor, ...hexAlphaOptions } = getHexAlphaOverrideOptions({
        hexColor: hex,
        overrideValue: value,
      });

      return [key, generateHexAlpha(hexColor, hexAlphaOptions)];
    })
  );

  const colorGroup = Object.fromEntries(
    Object.entries({ ...defaultColorGroup, ...overrides })
      .filter((entry) => Boolean(entry[1]))
      .map(([key, value]) => {
        function getKey() {
          const { prefix } = options ?? {};
          if (!prefix) return key;
          if (key === 'DEFAULT') return prefix;
          return `${prefix}-${key}`;
        }
        return [getKey(), value];
      })
  ) as GenerateHexAlphaColorGroupReturn<TPrefix>;

  return colorGroup;
}

function getHexAlphaOverrideOptions({
  hexColor,
  overrideValue,
}: {
  hexColor: string;
  overrideValue: NonNullable<HexAlphaOverrideValue>;
}) {
  // Case: generateHexAlphaColorGroup('#FFFFFF', { DEFAULT: 'ghost' })
  if (typeof overrideValue === 'string' && overrideValue in hexTransparencyPresetMap) {
    return {
      transparencyPreset: overrideValue as ColorAlphaVariant,
      hexColor,
    } satisfies HexValueOption;
  }

  // Case: generateHexAlphaColorGroup('#FFFFFF', { ghost: '5' })
  if (typeof overrideValue === 'string' && overrideValue in hexAlphaCodes) {
    return {
      transparency: overrideValue as HexAlphaTransparency,
      hexColor,
    } satisfies HexValueOption;
  }

  // Case: generateHexAlphaColorGroup('#FFFFFF', { DEFAULT: '#000000' })
  if (typeof overrideValue === 'string') {
    return {
      hexColor: overrideValue,
    } satisfies HexValueOption;
  }

  // Case: generateHexAlphaColorGroup('#FFFFFF', { DEFAULT: { ColorAlphaVariant: 'ghost'} })
  // Case: generateHexAlphaColorGroup('#FFFFFF', { DEFAULT: { ColorAlphaVariant: '#000000', ColorAlphaVariant: 'ghost' } })
  return {
    hexColor: overrideValue.hexColor ?? hexColor,
    transparencyPreset: getTransparencyPresetOption(overrideValue),
    transparency: getTransparencyOption(overrideValue),
  } satisfies HexValueOption;
}

export function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}
