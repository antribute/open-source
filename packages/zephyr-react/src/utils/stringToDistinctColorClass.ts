import clsx from 'clsx';
import { pick } from 'lodash-es';
import { twMerge } from 'tailwind-merge';
import { stringToArrayElement } from 'utils/hash';
import { notEmpty } from 'utils/notEmpty';

const distinctColors = {
  bg: {
    fallback: 'bg-neutral-500',
    colors: [
      'bg-palette-various-blue',
      'bg-palette-various-emerald',
      'bg-palette-various-orange',
      'bg-palette-various-fuchsia',
      'bg-palette-various-yellow',
      'bg-palette-various-rose',
      'bg-palette-various-cyan',
      'bg-palette-various-violet',
      'bg-palette-various-teal',
      'bg-palette-various-pink',
      'bg-palette-various-lime',
      'bg-palette-various-gray',
    ],
  },
  text: {
    fallback: 'text-neutral-500',
    colors: [
      'text-palette-various-blue',
      'text-palette-various-emerald',
      'text-palette-various-orange',
      'text-palette-various-fuchsia',
      'text-palette-various-yellow',
      'text-palette-various-rose',
      'text-palette-various-cyan',
      'text-palette-various-violet',
      'text-palette-various-teal',
      'text-palette-various-pink',
      'text-palette-various-lime',
      'text-palette-various-gray',
    ],
  },
} satisfies Record<
  string,
  {
    fallback: string;
    colors: string[];
  }
>;

type DistinctColorTokenKey = keyof typeof distinctColors;

/**
 * Hashes the input string to a distinct Tailwind CSS color class.
 *
 * @param str - The input string to hash.
 * @returns A `distinct-{color}` Tailwind CSS color class that is unique for the input string.
 */
export function stringToDistinctColorClass<
  TPickColorToken extends Partial<Record<DistinctColorTokenKey, boolean | string>>
>(
  str: string | undefined,
  classTokensMap: TPickColorToken,
  options?: {
    forceDefaultClass?: boolean;
  }
) {
  const { forceDefaultClass } = options ?? {};

  const classTokenKeys = Object.entries(classTokensMap)
    .map(([key, value]) => {
      return value ? (key as DistinctColorTokenKey) : undefined;
    })
    .filter(notEmpty);

  const classArr = classTokenKeys.map((key) => {
    const { colors, fallback: defaultFallback } = distinctColors[key];

    const defaultClassTokenValue = classTokensMap[key];

    const defaultClassToken =
      typeof defaultClassTokenValue === 'string' ? defaultClassTokenValue : undefined;

    const fallback = defaultClassToken ?? defaultFallback;

    if (forceDefaultClass) {
      return fallback;
    }

    const element = stringToArrayElement(str, colors, fallback);

    return element;
  });

  return classArr.join(' ');
}
