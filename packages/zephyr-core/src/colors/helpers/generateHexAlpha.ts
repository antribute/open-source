import { getByPath } from 'dot-path-value';
import type { ColorAlphaVariant } from '../colors.types';
import { HexAlphaTransparency, hexAlphaCodes, hexTransparencyPresetMap } from '../colors.constants';

export type HexAlphaOptions =
  | { transparencyPreset?: ColorAlphaVariant | undefined }
  | { transparency?: HexAlphaTransparency };

type GenerateHexAlphaFnOptions = ColorAlphaVariant | HexAlphaOptions;

export function generateHexAlpha(hexColor: string, options: GenerateHexAlphaFnOptions) {
  const hex = hexColor.slice(0, 7);

  let hexAlphaCode: string | undefined;

  if (typeof options === 'string') {
    hexAlphaCode = hexAlphaCodes[hexTransparencyPresetMap[options]];
  } else {
    const transparency = getByPath(options, 'transparency');

    const transparencyPreset = getByPath(options, 'transparencyPreset');

    const code = transparencyPreset ? hexTransparencyPresetMap[transparencyPreset] : transparency;

    hexAlphaCode = code ? hexAlphaCodes[code] : undefined;
  }

  return `${hex}${hexAlphaCode ?? ''}`;
}
