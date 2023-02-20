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

export type HexAlphaCode = keyof typeof hexAlphaCodes;

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
  '20': '33',
  '15': '26',
  '10': '1A',
  '5': '0D',
  '0': '00',
};

export type HexAlphaPreset = keyof typeof hexAlphaPresets;

export const hexAlphaPresets = {
  faint: '10',
  subtle: '30',
  weak: '50',
  moderate: '70',
  high: '90',
  strong: '100',
} satisfies Record<string, HexAlphaCode>;
