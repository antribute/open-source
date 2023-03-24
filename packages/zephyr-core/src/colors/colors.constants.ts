import type { ColorAlphaVariant } from './colors.types';

export type ColorScaleKey = (typeof colorScaleKeys)[number];

export const colorScaleKeys = [
  '50',
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
] as const;

export type HexAlphaTransparency = keyof typeof hexAlphaCodes;

/**
 * Hexadecimal color code for transparency
 * Source: https://gist.github.com/lopspower/03fb1cc0ac9f32ef38f4
 *
 * */
export const hexAlphaCodes = {
  '100': 'FF',
  '95': 'F2',
  '90': 'E6',
  '85': 'D9',
  '80': 'CC',
  '75': 'BF',
  '70': 'B3',
  '65': 'A6',
  '60': '99',
  '55': '8C',
  '50': '80',
  '45': '73',
  '40': '66',
  '35': '59',
  '30': '4D',
  '25': '40',
  '23': '3B',
  '20': '33',
  '15': '26',
  '12': '1F',
  '10': '1A',
  '9': '17',
  '8': '14',
  '7': '12',
  '6': '0F',
  '5': '0D',
  '4': '0A',
  '3': '08',
  '2': '05',
  '1': '03',
  '0': '00',
};

export const hexTransparencyPresetMap = {
  tint: '5',
  ghost: '20',
  subtle: '30',
  weak: '50',
  moderate: '70',
  high: '90',
  strong: '95',
  intense: '100',
} satisfies Record<ColorAlphaVariant, HexAlphaTransparency>;
