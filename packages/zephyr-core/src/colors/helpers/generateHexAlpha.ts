import { getByPath } from 'dot-path-value';
import {
  HexAlphaTransparency,
  HexAlphaPreset,
  hexAlphaCodes,
  hexTransparencyPresetMap,
} from '../colors.constants';

export type HexAlphaOptions =
  | { transparencyPreset?: HexAlphaPreset | undefined }
  | { transparency?: HexAlphaTransparency };

type GenerateHexAlphaFnOptions = HexAlphaPreset | HexAlphaOptions;

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
