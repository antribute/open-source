import {
  ColorScaleKey,
  HexAlphaPreset,
  colorScaleKeys,
  hexAlphaCodes,
  hexAlphaPresets,
} from './colors.constants';
import { ColorGroup, ColorGroupArray, ColorPropKey, HexValue } from './colors.types';

export function arrayToColorGroup(colorArr: ColorGroupArray): ColorGroup {
  const entries = colorArr.map(
    (color, index) => [colorScaleKeys[index]!, color] as [ColorScaleKey, string]
  );

  return Object.fromEntries(entries) as Record<ColorScaleKey, string>;
}

export function generateColorGroup<TColorGroup extends ColorGroup>(colorGroup: TColorGroup) {
  return <TProps extends Record<ColorPropKey, keyof TColorGroup>>(props: TProps) => {
    const resolvedColorEntries = Object.entries(props).map(([k, v]) => {
      const val = colorGroup[v as keyof typeof colorGroup];
      return [k, val];
    });

    return {
      ...(Object.fromEntries(resolvedColorEntries) as Record<keyof TProps, string>),
      ...colorGroup,
    };
  };
}

export function generateHexAlpha(hex: string, transparency: HexAlphaPreset) {
  const code = hexAlphaPresets[transparency];
  const hexAlphaCode = hexAlphaCodes[code];
  return `${hex}${hexAlphaCode}`;
}

export function generateHexAlphaColorGroup(
  hex: string,
  options?: { overrides?: Partial<Record<HexAlphaPreset | 'DEFAULT', HexValue | HexAlphaPreset>> }
): Record<HexAlphaPreset | 'DEFAULT', string> {
  const colorGroup = {
    faint: generateHexAlpha(hex, 'faint'),
    subtle: generateHexAlpha(hex, 'subtle'),
    weak: generateHexAlpha(hex, 'weak'),
    moderate: generateHexAlpha(hex, 'moderate'),
    high: generateHexAlpha(hex, 'high'),
    strong: hex,
    DEFAULT: hex,
  };

  const overrides = Object.fromEntries(
    Object.entries(options?.overrides ?? {}).map(([key, value]) => {
      if (value in hexAlphaPresets) {
        return [key, generateHexAlpha(hex, value as HexAlphaPreset)];
      }
      return [key, value];
    })
  );

  return {
    ...colorGroup,
    ...overrides,
  };
}
