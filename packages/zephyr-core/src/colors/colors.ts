import tailwindColors from 'tailwindcss/colors';
import { variousColors } from './variousColors';
import { generateColorGroup } from './helpers/generateColorGroup';
import { arrayToColorGroup } from './helpers/arrayToColorGroup';
import { generateHexAlphaColorGroup } from './helpers/generateHexAlphaColorGroup';

const black = '#000000';

const white = '#FFFFFF';

const surface = generateColorGroup(
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
)({ DEFAULT: '50', dark: '600', light: '400', soft: '200' });

const surfaceInverse = generateColorGroup(
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
)({ DEFAULT: '400', dark: '700', light: '300', soft: '900' });

const neutral = generateColorGroup({
  '50': '#f6f7f9',
  '100': '#eceef2',
  '200': '#d4dae3',
  '300': '#afbaca',
  '400': '#8495ac',
  '500': '#657892',
  '600': '#506079',
  '700': '#414e63',
  '800': '#384252',
  '900': '#333b47',
})({
  light: '300',
  DEFAULT: '800',
  dark: '900',
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

export const colors = {
  highlight: generateHexAlphaColorGroup(neutral[500], {
    DEFAULT: '7',
    tint: '2',
    ghost: undefined,
    subtle: '4',
    weak: '5',
    moderate: '8',
    high: '10',
    strong: undefined,
    intense: undefined,
  }),

  white,
  black,
  base,
  neutral,

  primary: generateColorGroup({
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
    light: '500',
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
  })({ DEFAULT: '500', dark: '600', light: '300', soft: '100' }),

  positive: generateColorGroup(tailwindColors.emerald)({
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
    ...generateHexAlphaColorGroup(neutral.DEFAULT, { DEFAULT: 'subtle' }),
  },

  surface,

  'surface-inverse': surfaceInverse,

  'surface-neutral': generateColorGroup({
    DEFAULT: '#384252',
    ...arrayToColorGroup([
      '#506079',
      '#4b5970',
      '#455267',
      '#404c5f',
      '#3b4556',
      '#374151',
      '#36404e',
      '#353e4c',
      '#343d49',
      '#333b47',
    ]),
  })({ DEFAULT: 'DEFAULT', dark: '700', light: '300', soft: '100' }),

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

function test() {
  const highlight = generateHexAlphaColorGroup(base.inverse, {
    DEFAULT: 'subtle',
    tint: '5',
    ghost: '10',
    subtle: '15',
    weak: '20',
    moderate: '25',
    high: '30',
    strong: undefined,
    intense: undefined,
  });
  console.log(highlight);
}

test();
