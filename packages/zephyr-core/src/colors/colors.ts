import tailwindColors from 'tailwindcss/colors';
import {
  arrayToColorGroup,
  generateColorGroup,
  generateHexAlphaColorGroup,
} from './colors.helpers';

const slate = generateColorGroup(tailwindColors.slate)({
  DEFAULT: '500',
  dark: '600',
  light: '300',
  soft: '100',
});

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

const oxfordBlue = generateColorGroup({
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

const black = '#000000';

const white = '#FFFFFF';

const base = {
  DEFAULT: '#F6F6F6',
  inverse: '#0D0E11',
};

export const colors = {
  white,
  black,
  base,
  primary: oxfordBlue,

  secondary: generateColorGroup({
    '50': '#fdf5ef',
    '100': '#fbe7d9',
    '200': '#f7ccb1',
    '300': '#f1a87e',
    '400': '#eb7d4c',
    '500': '#e55c2a',
    '600': '#d7431f',
    '700': '#b2321c',
    '800': '#8e2a1e',
    '900': '#73241b',
  })({ DEFAULT: '500', dark: '600', light: '300', soft: '100' }),

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

  slate,
  content: generateHexAlphaColorGroup('#15181E', { overrides: { DEFAULT: 'high' } }),
  'content-inverse': generateHexAlphaColorGroup('#e3e5e8', {
    overrides: { strong: white, DEFAULT: '#d2d4d7' },
  }),

  boundary: {
    intense: base.inverse,
    ...generateHexAlphaColorGroup(oxfordBlue[300], { overrides: { DEFAULT: 'subtle' } }),
  },
  'boundary-inverse': {
    intense: oxfordBlue[400],
    ...generateHexAlphaColorGroup(oxfordBlue.DEFAULT, {
      overrides: { DEFAULT: 'subtle' },
    }),
  },
  divider: generateHexAlphaColorGroup('#BDC0C7'),
  'divider-inverse': generateHexAlphaColorGroup('#3F4550'),

  border: {
    DEFAULT: '#BDC0C7',
    weak: '#D3D5D9',
    moderate: '#BDC0C7',
    strong: '#A7ABB4',
  },

  'border-inverse': {
    DEFAULT: '#3F4550',
    weak: '#2B303B',
    moderate: '#464c57',
    strong: '#535965',
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
    '1': tailwindColors.blue['500'],
    '2': tailwindColors.emerald['500'],
    '3': tailwindColors.orange['500'],
    '4': tailwindColors.fuchsia['500'],
    '5': tailwindColors.yellow['500'],
    '6': tailwindColors.rose['500'],
    '7': tailwindColors.cyan['500'],
    '8': tailwindColors.violet['500'],
    '9': tailwindColors.teal['500'],
    '10': tailwindColors.pink['500'],
    '11': tailwindColors.lime['500'],
    '12': tailwindColors.gray['500'],
  },
} satisfies Record<string, string | Record<string, string>>;
