import tailwindColors from 'tailwindcss/colors';
import { variousColors } from './variousColors';
import { generateColorGroup } from './helpers/generateColorGroup';
import { arrayToColorGroup } from './helpers/arrayToColorGroup';
import { generateHexAlphaColorGroup } from './helpers/generateHexAlphaColorGroup';
import { objectMap } from './helpers/objectMap';

const black = '#000000';

const white = '#FFFFFF';

const neutral = generateColorGroup(
  arrayToColorGroup([
    '#f6f7f9',
    '#5e7495',
    '#425571',
    '#46556b',
    '#3d4c62',
    '#324156',
    '#2b374a',
    '#262f3e',
    '#212a38',
    '#1c2532',
  ])
)({
  light: '400',
  DEFAULT: '600',
  dark: '800',
  soft: '100',
});

const contentInverse = generateHexAlphaColorGroup('#e3e5e8', {
  intense: white,
  DEFAULT: '#d2d4d7',
});

const base = {
  DEFAULT: '#F6F6F6',
  inverse: '#0D0E11',
};

type Colors = typeof colors;

const highlightAlphaMap = {
  DEFAULT: '7',
  tint: '2',
  ghost: '4',
  subtle: '7',
  weak: '10',
  moderate: '12',
  high: '15',
  strong: '25',
  intense: '30',
};

export const colors = {
  highlight: generateHexAlphaColorGroup(neutral[500], highlightAlphaMap),
  'highlight-inverse': generateHexAlphaColorGroup(
    variousColors['various-slate'].light,
    highlightAlphaMap
  ),
  white,
  black,
  base,
  neutral,

  heart: generateColorGroup({
    '50': '#fff0fa',
    '100': '#ffe4f7',
    '200': '#ffc9f0',
    '300': '#ff9ce2',
    '400': '#ff5fcc',
    '500': '#ff30b4',
    '600': '#f50d93',
    '700': '#e6007e',
    '800': '#b00460',
    '900': '#920952',
  })({
    DEFAULT: '700',
    dark: '800',
    light: '400',
    soft: '100',
  }),

  info: generateColorGroup(tailwindColors.cyan)({
    DEFAULT: '500',
    dark: '600',
    light: '300',
    soft: '100',
  }),

  caution: generateColorGroup({
    '50': '#ffffea',
    '100': '#fffbc5',
    '200': '#fff885',
    '300': '#ffed46',
    '400': '#ffdf1b',
    '500': '#ffbf00',
    '600': '#e29300',
    '700': '#bb6802',
    '800': '#985008',
    '900': '#7c420b',
  })({ DEFAULT: '500', dark: '600', light: '300', soft: '100' }),

  danger: generateColorGroup({
    '50': '#fff1f2',
    '100': '#ffdfe1',
    '200': '#ffc4c8',
    '300': '#ff9ba2',
    '400': '#ff626e',
    '500': '#ff3140',
    '600': '#f22837',
    '700': '#cb0a18',
    '800': '#a70d18',
    '900': '#8a121b',
  })({ DEFAULT: '500', dark: '700', light: '300', soft: '100' }),

  success: generateColorGroup(tailwindColors.emerald)({
    DEFAULT: '500',
    dark: '600',
    light: '300',
    soft: '100',
  }),

  gray: generateColorGroup(tailwindColors.gray)({
    DEFAULT: '500',
    dark: '600',
    light: '300',
    soft: '100',
  }),

  content: generateHexAlphaColorGroup('#15181E', {
    DEFAULT: 'high',
    ghost: { hexColor: neutral['500'], transparencyPreset: 'ghost' },
  }),

  'content-inverse': contentInverse,

  boundary: {
    focus: base.inverse,
    ...generateHexAlphaColorGroup(neutral[300], {
      DEFAULT: 'subtle',
    }),
  },

  'boundary-inverse': {
    focus: contentInverse.weak,
    ...generateHexAlphaColorGroup(base.DEFAULT, { DEFAULT: 'subtle' }),
  },

  surface: generateColorGroup(
    arrayToColorGroup([
      '#ffffff',
      '#f5f7f9',
      '#eceff3',
      '#e3e7ed',
      '#dae0e8',
      '#d3dae4',
      '#ccd5e0',
      '#c5d0de',
      '#bfccdb',
      '#b9c8d9',
    ])
  )({ DEFAULT: '50', dark: '400', light: '200', soft: '100' }),

  'surface-inverse': generateColorGroup(
    arrayToColorGroup([
      '#2d3542',
      '#282f3a',
      '#232832',
      '#1e222a',
      '#1a1d23',
      '#181b21',
      '#171a20',
      '#16181e',
      '#14171d',
      '#13151b',
    ])
  )({ DEFAULT: '400', dark: '700', light: '200', soft: '500' }),

  distinct: {
    '1': variousColors['various-blue'].DEFAULT,
    '2': variousColors['various-emerald'].DEFAULT,
    '3': variousColors['various-orange'].DEFAULT,
    '4': variousColors['various-fuchsia'].DEFAULT,
    '5': variousColors['various-yellow'].DEFAULT,
    '6': variousColors['various-rose'].DEFAULT,
    '7': variousColors['various-cyan'].DEFAULT,
    '8': variousColors['various-violet'].DEFAULT,
    '9': variousColors['various-teal'].DEFAULT,
    '10': variousColors['various-pink'].DEFAULT,
    '11': variousColors['various-lime'].DEFAULT,
    '12': variousColors['various-gray'].DEFAULT,
  },
  ...variousColors,
} satisfies Record<string, string | Record<string, string>>;

export type ColorPalette = { [P in keyof Colors & string as `palette-${P}`]: Colors[P] };

export const colorPalette = {
  inherit: tailwindColors.inherit,
  current: tailwindColors.current,
  transparent: tailwindColors.transparent,
  ...(objectMap<string, unknown>(colors, (key, value) => {
    return [`palette-${key!}`, value];
  }) as ColorPalette),
};
