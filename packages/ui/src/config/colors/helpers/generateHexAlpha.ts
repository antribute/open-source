import type { ColorAlphaVariant } from '../colors.types';
import type { HexAlphaTransparency } from '../colors.constants';
import { hexAlphaCodes, hexTransparencyPresetMap } from '../colors.constants';

interface TransparencyPresetOption {
  transparencyPreset?: ColorAlphaVariant | undefined;
}

interface TransparencyOption {
  transparency?: HexAlphaTransparency;
}

export type HexAlphaOptions = TransparencyPresetOption | TransparencyOption;

type GenerateHexAlphaFnOptions = ColorAlphaVariant | HexAlphaOptions;

export function generateHexAlpha(hexColor: string, options: GenerateHexAlphaFnOptions) {
  const hex = hexColor.slice(0, 7);

  let hexAlphaCode: string | undefined;

  if (typeof options === 'string') {
    hexAlphaCode = hexAlphaCodes[hexTransparencyPresetMap[options]];
  } else {
    const transparency = getTransparencyOption(options);

    const transparencyPreset = getTransparencyPresetOption(options);

    const code = transparencyPreset ? hexTransparencyPresetMap[transparencyPreset] : transparency;

    hexAlphaCode = code ? hexAlphaCodes[code] : undefined;
  }

  return `${hex}${hexAlphaCode ?? ''}`;
}

export function getTransparencyPresetOption(option: TransparencyPresetOption | TransparencyOption) {
  function isPreset(
    option: TransparencyPresetOption | TransparencyOption
  ): option is TransparencyPresetOption {
    return 'transparencyPreset' in option;
  }

  return isPreset(option) ? option.transparencyPreset : undefined;
}

export function getTransparencyOption(option: TransparencyPresetOption | TransparencyOption) {
  function isPreset(
    option: TransparencyPresetOption | TransparencyOption
  ): option is TransparencyOption {
    return 'transparency' in option;
  }

  return isPreset(option) ? option.transparency : undefined;
}
