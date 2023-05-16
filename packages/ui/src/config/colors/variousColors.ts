import tailwindColors from 'tailwindcss/colors';
import { generateColorGroup } from './helpers/generateColorGroup';

export const variousColors = {
  'various-blue': generateColorGroup(tailwindColors.blue)({
    DEFAULT: '500',
    dark: '600',
    light: '300',
    soft: '100',
  }),
  'various-emerald': generateColorGroup(tailwindColors.emerald)({
    DEFAULT: '500',
    dark: '600',
    light: '300',
    soft: '100',
  }),
  'various-orange': generateColorGroup(tailwindColors.orange)({
    DEFAULT: '500',
    dark: '600',
    light: '300',
    soft: '100',
  }),
  'various-fuchsia': generateColorGroup(tailwindColors.fuchsia)({
    DEFAULT: '500',
    dark: '600',
    light: '300',
    soft: '100',
  }),
  'various-yellow': generateColorGroup(tailwindColors.yellow)({
    DEFAULT: '500',
    dark: '600',
    light: '300',
    soft: '100',
  }),
  'various-rose': generateColorGroup(tailwindColors.rose)({
    DEFAULT: '500',
    dark: '600',
    light: '300',
    soft: '100',
  }),
  'various-cyan': generateColorGroup(tailwindColors.cyan)({
    DEFAULT: '500',
    dark: '600',
    light: '300',
    soft: '100',
  }),
  'various-violet': generateColorGroup(tailwindColors.violet)({
    DEFAULT: '500',
    dark: '600',
    light: '300',
    soft: '100',
  }),
  'various-teal': generateColorGroup(tailwindColors.teal)({
    DEFAULT: '500',
    dark: '600',
    light: '300',
    soft: '100',
  }),
  'various-pink': generateColorGroup(tailwindColors.pink)({
    DEFAULT: '500',
    dark: '600',
    light: '300',
    soft: '100',
  }),
  'various-lime': generateColorGroup(tailwindColors.lime)({
    DEFAULT: '500',
    dark: '600',
    light: '300',
    soft: '100',
  }),
  'various-gray': generateColorGroup(tailwindColors.gray)({
    DEFAULT: '500',
    dark: '600',
    light: '300',
    soft: '100',
  }),
  'various-neutral': generateColorGroup(tailwindColors.neutral)({
    DEFAULT: '500',
    dark: '600',
    light: '300',
    soft: '100',
  }),
  'various-stone': generateColorGroup(tailwindColors.stone)({
    DEFAULT: '500',
    dark: '600',
    light: '300',
    soft: '100',
  }),
  'various-zinc': generateColorGroup(tailwindColors.zinc)({
    DEFAULT: '500',
    dark: '600',
    light: '300',
    soft: '100',
  }),
  'various-slate': generateColorGroup(tailwindColors.slate)({
    DEFAULT: '500',
    dark: '600',
    light: '300',
    soft: '100',
  }),
} satisfies Record<string, Record<string, string>>;
