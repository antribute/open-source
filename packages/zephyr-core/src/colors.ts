import tailwindColors from 'tailwindcss/colors';
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
type ColorScaleKey = '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';

type ColorScale = Record<ColorScaleKey, string>;

type ColorProps<
  TColorProp,
  TRecord extends Record<string, TColorProp> = Record<string, TColorProp>
> = {
  DEFAULT: TColorProp;
  soft: TColorProp;
  dark: TColorProp;
  light: TColorProp;
  primary?: TColorProp;
} & TRecord;

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

  primary: generateColorGroup(tailwindColors.cyan)({
    DEFAULT: '500',
    dark: '600',
    light: '300',
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

  surface: generateColorGroup({
    DEFAULT: '#FFFFFF',
    '50': '#F3F3F3',
    '100': '#FCFCFD',
    '200': '#F9FAFA',
    '300': '#F7F7F8',
    '400': '#F4F5F6',
    '500': '#F1F2F4',
    '600': '#E9EAED',
    '700': '#DEE0E4',
    '800': '#D2D6DA',
    '900': '#CACED4',
  })({ DEFAULT: 'DEFAULT', dark: '700', light: '400', soft: '300' }),

  'surface-inverse': generateColorGroup({
    '50': '#384252',
    '100': '#2E3542',
    '200': '#262B36',
    '300': '#22262F',
    '400': '#1A1D23',
    '500': '#15181E',
    '600': '#13161B',
    '700': '#111318',
    '800': '#0D0E12',
    '900': '#0B0C0F',
  })({ DEFAULT: '400', dark: '500', light: '300', soft: '700' }),

  distinct: {
    '1': '#19196B',
    '2': '#296218',
    '3': '#EB5528',
    '4': '#F9D849',
    '5': '#74FB4C',
    '7': '#EB33F8',
    '8': '#F4B9C2',
    '9': '#000000',
    '10': '#EF8733',
    '11': '#75140C',
    '12': '#808080',
  },
} satisfies Record<string, string | Record<string, string>>;

function generateColorGroup<T extends ColorScale>(colorGroup: T) {
  return <TProps extends ColorProps<keyof T>>(props: TProps) => {
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
