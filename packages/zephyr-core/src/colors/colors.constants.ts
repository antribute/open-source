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

export type HexAlphaPreset = keyof typeof hexTransparencyPresetMap;

export const hexTransparencyPresetMap = {
  // Tint - a color that has been lightened by adding white, creating a pastel or pale appearance.
  // Usage: Suitable for subtle backgrounds, highlighting important elements, or creating a gentle contrast against a darker color.
  tint: '10',

  // Ghost - a color that is very light and barely visible, often with a white or gray tint.
  // Usage: Suitable for very subtle or neutral backgrounds, or creating a barely-visible text color or placeholder text.
  ghost: '20',

  // Subtle - a color that is light and understated, without being too faint or desaturated.
  // Usage: Suitable for subtle backgrounds, borders, or text color. Can also be used for accent colors that are not too overpowering.
  subtle: '30',

  // Weak - a color that is light, but still has a moderate level of saturation or hue.
  // Usage: Suitable for backgrounds or accent colors that provide a gentle contrast against darker colors. Can also be used for subtle borders or text color.
  weak: '50',

  // Moderate - a color that is medium in strength and saturation.
  // Usage: Suitable for backgrounds, borders, or accent colors that provide a moderate level of contrast and visual impact.
  moderate: '70',

  // High - a color that is relatively strong and saturated, with a significant level of visual impact.
  // Usage: Suitable for prominent elements that need to stand out, such as important buttons or call-to-action elements.
  high: '90',

  // Strong - a color that is strong and vibrant, with a high level of saturation and visual impact.
  // Usage: Suitable for prominent elements that need to stand out, such as important buttons or call-to-action elements. Can also be used for accent colors that provide a strong contrast against darker colors.
  strong: '95',

  // Intense - a color that is very strong and saturated, with the highest possible level of visual impact.
  // Usage: Suitable for the most prominent and attention-grabbing elements, such as error messages or urgent call-to-action elements. Should be used sparingly.
  intense: '100',
} satisfies Record<string, HexAlphaTransparency>;
