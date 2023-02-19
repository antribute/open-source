import tailwindColors from 'tailwindcss/colors';
import type { LiteralUnion, FixedLengthArray } from 'type-fest';

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */

const colorScaleKeys = [
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

type ColorScaleKey = (typeof colorScaleKeys)[number];

type ColorGroup = Record<LiteralUnion<ColorScaleKey, 'string'>, string>;

type ColorPropKey = 'DEFAULT' | 'soft' | 'dark' | 'light';

const body = '#F6F6F6' as const;

const slate = generateColorGroup(tailwindColors.slate)({
  DEFAULT: '500',
  dark: '600',
  light: '300',
  soft: '100',
});

export const colors = {
  body,
  black: '#000000',
  white: '#FAFAFA',
  'body-inverted': '#0D0E11',

  primary: generateColorGroup({
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
  }),

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

  light: generateColorGroup({
    '50': '#FBFBFB',
    '100': '#f3f4f6',
    '200': '#E7E7E7',
    '300': '#CCCCCC',
    '400': '#B2B2B2',
    '500': '#969696',
    '600': '#767676',
    '700': '#5E5E5E',
    '800': '#3F3F3F',
    '900': '#353535',
  })({ DEFAULT: '500', dark: '600', light: '300', soft: '100' }),

  dark: generateColorGroup({
    '50': '#E3E4E6',
    '100': '#CDCFD2',
    '200': '#B0B2B7',
    '400': '#75777C',
    '300': '#94969B',
    '500': '#5C5E63',
    '600': '#3E4044',
    '700': '#313337',
    '800': '#232529',
    '900': '#1B1D21',
  })({ DEFAULT: '500', dark: '600', light: '300', soft: '100' }),

  content: {
    DEFAULT: '#15181ef5',
    weak: '#15181ea3',
    moderate: '#15181ed6',
    strong: '#15181E',
    muted: slate['300'],
  },

  'content-inverse': {
    DEFAULT: '#d2d4d7',
    weak: '#e3e5e885',
    moderate: '#e3e5e8b8',
    strong: '#ffffff',
    // positive: '#7BCC7E',
    // negative: '#E08787',
  },

  divider: {
    DEFAULT: '#BDC0C7',
    weak: '#D3D5D9',
    moderate: '#BDC0C7',
    strong: '#A7ABB4',
  },

  'divider-inverse': {
    DEFAULT: '#3F4550',
    weak: '#2B303B',
    moderate: '#464c57',
    strong: '#535965',
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
  )({ DEFAULT: '50', dark: '600', light: '400', soft: '200' }),

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
  )({ DEFAULT: '400', dark: '700', light: '300', soft: '900' }),

  distinct: {
    '1': tailwindColors.blue['500'],
    '2': tailwindColors.emerald['500'],
    '3': tailwindColors.orange['500'],
    '4': tailwindColors.fuchsia['500'],
    '5': tailwindColors.cyan['500'],
    '6': tailwindColors.red['500'],
    '7': tailwindColors.yellow['500'],
    '8': tailwindColors.pink['500'],
    '9': tailwindColors.violet['500'],
    '10': tailwindColors.rose['500'],
    '11': tailwindColors.zinc['500'],
    '12': tailwindColors.slate['500'],
  },
} satisfies Record<string, string | Record<string, string>>;

function generateColorGroup<TColorGroup extends ColorGroup>(colorGroup: TColorGroup) {
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

type ColorGroupArray = FixedLengthArray<string, 10>;

function arrayToColorGroup(colorArr: ColorGroupArray): ColorGroup {
  const entries = colorArr.map(
    (color, index) => [colorScaleKeys[index]!, color] as [ColorScaleKey, string]
  );

  return Object.fromEntries(entries) as Record<ColorScaleKey, string>;
}
