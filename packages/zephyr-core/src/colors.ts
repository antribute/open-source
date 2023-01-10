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
} & TRecord;

export const colors = {
  primary: generateColorGroup({
    '50': '#f2fbf9',
    '100': '#d4f3ec',
    '200': '#a9e6da',
    '300': '#6bcfc0',
    '400': '#49b8ab',
    '500': '#309c91',
    '600': '#247d76',
    '700': '#20655f',
    '800': '#1e514e',
    '900': '#1d4441',
  })({ DEFAULT: '300', dark: '400', light: '200', soft: '50' }),

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
  })({ DEFAULT: '500', dark: '600', light: '400', soft: '100' }),

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
  })({ DEFAULT: '500', dark: '600', light: '400', soft: '100' }),

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
  })({ DEFAULT: '500', dark: '600', light: '400', soft: '100' }),

  positive: generateColorGroup({
    '50': '#f0f9f2',
    '100': '#daf1de',
    '200': '#b8e2c1',
    '300': '#89cc9b',
    '400': '#4da167',
    '500': '#369356',
    '600': '#267543',
    '700': '#1e5e37',
    '800': '#1a4b2d',
    '900': '#163e26',
  })({ DEFAULT: '500', dark: '600', light: '400', soft: '100' }),

  gray: generateColorGroup({
    '50': '#f6f8f8',
    '100': '#edf0f2',
    '200': '#d6dce1',
    '300': '#b1bfc8',
    '400': '#8a9da8',
    '500': '#697f8c',
    '600': '#536774',
    '700': '#44545f',
    '800': '#3b464e',
    '900': '#363e44',
  })({ DEFAULT: '500', dark: '600', light: '400', soft: '100' }),

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
  })({ DEFAULT: '500', dark: '600', light: '400', soft: '100' }),

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
  })({ DEFAULT: '500', dark: '600', light: '400', soft: '100' }),

  'black-alpha': generateColorGroup({
    '50': 'rgba(21, 24, 30, 0.04)',
    '100': 'rgba(21, 24, 30, 0.06)',
    '200': 'rgba(21, 24, 30, 0.08)',
    '300': 'rgba(21, 24, 30, 0.16)',
    '400': 'rgba(21, 24, 30, 0.24)',
    '500': 'rgba(21, 24, 30, 0.36)',
    '600': 'rgba(21, 24, 30, 0.48)',
    '700': 'rgba(21, 24, 30, 0.64)',
    '800': 'rgba(21, 24, 30, 0.84)',
    '900': 'rgba(21, 24, 30, 0.96)',
  })({ DEFAULT: '500', dark: '600', light: '400', soft: '100' }),

  'white-alpha': generateColorGroup({
    '50': 'rgba(227, 229, 232, 0.04)',
    '100': 'rgba(227, 229, 232, 0.06)',
    '200': 'rgba(227, 229, 232, 0.08)',
    '300': 'rgba(227, 229, 232, 0.16)',
    '400': 'rgba(227, 229, 232, 0.24)',
    '500': 'rgba(227, 229, 232, 0.36)',
    '600': 'rgba(227, 229, 232, 0.48)',
    '700': 'rgba(227, 229, 232, 0.52)',
    '800': 'rgba(227, 229, 232, 0.72)',
    '900': 'rgba(227, 229, 232, 0.92)',
  })({ DEFAULT: '500', dark: '600', light: '400', soft: '100' }),

  content: {
    DEFAULT: '#d2d4d7',
    weak: '#e3e5e885',
    moderate: '#e3e5e8b8',
    strong: '#ffffff',
  },

  'content-inverse': {
    DEFAULT: '#15181ef5',
    strong: '#15181E',
    moderate: '#15181ed6',
    weak: '#15181ea3',
    positive: '#7BCC7E',
    negative: '#E08787',
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

  surface: {
    DEFAULT: '#FFFFFF',
    nested: '#EEEFF1',
    raised: '#E3E5E8',
    elevated: '#D3D5D9',
  },

  'surface-inverse': {
    DEFAULT: '#15181E',
    nested: '#111318',
    raised: '#1A1D23',
    elevated: '#22262F',
  },

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
} satisfies Record<string, Record<string, string>>;

function generateColorGroup<T extends ColorScale>(colorGroup: T) {
  return (props: ColorProps<keyof T>) => {
    const resolvedColorEntries = Object.entries(props).map(([k, v]) => {
      const val = colorGroup[v as keyof typeof colorGroup];
      return [k, val];
    });

    return {
      ...Object.fromEntries(resolvedColorEntries),
      ...colorGroup,
    };
  };
}
