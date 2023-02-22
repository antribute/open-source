// eslint-disable-next-line import/no-extraneous-dependencies
import { LiteralUnion } from 'type-fest';
import { getByPath } from 'dot-path-value';
import {
  HexAlphaPreset,
  HexAlphaTransparency,
  hexAlphaCodes,
  hexTransparencyPresetMap,
} from '../colors.constants';
import { HexAlphaOptions, generateHexAlpha } from './generateHexAlpha';

type HexValueOption = {
  hexColor?: string;
} & HexAlphaOptions;

type HexAlphaOverrideValue<T extends string = HexAlphaPreset> =
  | LiteralUnion<T, string>
  | HexValueOption
  | undefined;

type HexAlphaOverridesKey = LiteralUnion<'DEFAULT' | HexAlphaPreset, string>;
// type HexAlphaOverrides = Partial<
//   Record<LiteralUnion<'DEFAULT' | HexAlphaPreset, string>, HexAlphaOverrideValue>
// >;

type HexAlphaOverrides = {
  [K in HexAlphaOverridesKey]?: K extends HexAlphaPreset
    ? HexAlphaOverrideValue<HexAlphaPreset | HexAlphaTransparency>
    : HexAlphaOverrideValue;
};

type GenerateHexAlphaColorGroupReturn = Record<HexAlphaPreset | 'DEFAULT', string>;
export function generateHexAlphaColorGroup(
  hex: string,
  alphaOverrides?: HexAlphaOverrides
): GenerateHexAlphaColorGroupReturn {
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
    Object.entries({ ...defaultColorGroup, ...overrides }).filter(([key, value]) => Boolean(value))
  ) as GenerateHexAlphaColorGroupReturn;

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
      transparencyPreset: overrideValue as HexAlphaPreset,
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

  // Case: generateHexAlphaColorGroup('#FFFFFF', { DEFAULT: { hexAlphaPreset: 'ghost'} })
  // Case: generateHexAlphaColorGroup('#FFFFFF', { DEFAULT: { hexAlphaPreset: '#000000', hexAlphaPreset: 'ghost' } })
  return {
    hexColor: getByPath(overrideValue, 'hexColor') ?? hexColor,
    transparencyPreset: getByPath(overrideValue, 'transparencyPreset'),
    transparency: getByPath(overrideValue, 'transparency'),
  } satisfies HexValueOption;
}

export function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}
