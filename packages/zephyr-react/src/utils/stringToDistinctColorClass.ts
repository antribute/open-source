import clsx from 'clsx';
import { pick } from 'lodash-es';
import { twMerge } from 'tailwind-merge';
import { stringToArrayElement } from 'utils/hash';
import { notEmpty } from 'utils/notEmpty';

const distinctColors = {
  bg: {
    fallback: 'bg-neutral-500',
    colors: [
      'bg-various-blue',
      'bg-various-emerald',
      'bg-various-orange',
      'bg-various-fuchsia',
      'bg-various-yellow',
      'bg-various-rose',
      'bg-various-cyan',
      'bg-various-violet',
      'bg-various-teal',
      'bg-various-pink',
      'bg-various-lime',
      'bg-various-gray',
    ],
  },
  text: {
    fallback: 'text-neutral-500',
    colors: [
      'text-various-blue',
      'text-various-emerald',
      'text-various-orange',
      'text-various-fuchsia',
      'text-various-yellow',
      'text-various-rose',
      'text-various-cyan',
      'text-various-violet',
      'text-various-teal',
      'text-various-pink',
      'text-various-lime',
      'text-various-gray',
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
