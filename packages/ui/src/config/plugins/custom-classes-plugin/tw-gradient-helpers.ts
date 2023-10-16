import type { PluginAPI } from 'tailwindcss/types/config';
import { mergeObjects } from '../../helpers/utilities';
import { clsx } from './class-style-utils';
import type { ClassComponentMap } from './custom-classes-plugin.helpers';
import { classComponentMap } from './custom-classes-plugin.helpers';

export type TWGradientDirections = (typeof twGradientDirections)[number];

export const twGradientDirections = ['t', 'tr', 'tl', 'b', 'br', 'bl', 'l', 'r'] as const;

export interface TWGradientOptions {
  dir: TWGradientDirections;
  fromColor: string;
  toColor: string;
  viaColor?: string;
}

export function generateGradientDirections<T extends ClassComponentMap>(
  gradient: ({ dir }: { dir: TWGradientDirections }) => T
) {
  const gradientDirections = twGradientDirections.map((dir) => {
    return gradient({ dir });
  });

  return mergeObjects(gradientDirections);
}

export function generateTwGradientClasses<
  T extends Record<string, unknown> | string[] | readonly string[]
>(
  data: T,
  {
    gradientName,
    gradient,
  }: {
    gradientName: string;
    gradient: (data: { color: string; dir: TWGradientDirections }) => string | TWGradientOptions;
  }
) {
  const gradientClasses = generateGradientDirections(({ dir }) => {
    return classComponentMap(data, (k) => {
      const g = gradient({ color: k, dir });
      return {
        name: `bg-gradient-${k}-${gradientName}-${dir}`,
        className: typeof g === 'string' ? g : twGradient({ ...g, dir }),
      };
    });
  });

  return gradientClasses;
}

export function twGradient(
  { dir, fromColor, toColor, viaColor }: TWGradientOptions,
  className?: string
) {
  return clsx(
    `bg-gradient-to-${dir}`,
    `from-${fromColor}`,
    viaColor && `via-${viaColor}`,
    `to-${toColor}`,
    className
  );
}

export function baseTokensWithLightAndDarkColors({ theme }: { theme: PluginAPI['theme'] }) {
  const tokens = Object.keys(theme('colors'));
  const lightSuffix = '-light';
  const darkSuffix = '-dark';

  const baseTokens = tokens.filter(
    (token) => !token.endsWith(lightSuffix) && !token.endsWith(darkSuffix)
  );

  return baseTokens.filter((baseToken) => {
    const hasLightToken = hasPair(`${baseToken}${lightSuffix}`, tokens, lightSuffix, darkSuffix);
    const hasDarkToken = hasPair(`${baseToken}${darkSuffix}`, tokens, darkSuffix, lightSuffix);
    return hasLightToken && hasDarkToken;
  });
}

function hasPair(token: string, list: string[], suffix1: string, suffix2: string) {
  if (token.endsWith(suffix1)) {
    const baseToken = token.slice(0, -suffix1.length);
    return list.includes(baseToken + suffix2);
  }
  return false;
}
