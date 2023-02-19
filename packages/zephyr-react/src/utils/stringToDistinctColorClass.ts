import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { stringToArrayElement } from 'utils/hash';

const distinctColors = {
  bg: {
    fallback: 'bg-surface-neutral',
    colors: [
      'bg-distinct-1',
      'bg-distinct-2',
      'bg-distinct-3',
      'bg-distinct-4',
      'bg-distinct-5',
      'bg-distinct-6',
      'bg-distinct-7',
      'bg-distinct-8',
      'bg-distinct-9',
      'bg-distinct-10',
      'bg-distinct-11',
      'bg-distinct-12',
    ],
  },
  text: {
    fallback: 'text-surface-neutral',
    colors: [
      'text-distinct-1',
      'text-distinct-2',
      'text-distinct-3',
      'text-distinct-4',
      'text-distinct-5',
      'text-distinct-6',
      'text-distinct-7',
      'text-distinct-8',
      'text-distinct-9',
      'text-distinct-10',
      'text-distinct-11',
      'text-distinct-12',
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
export function stringToDistinctColorClass<TColorTokenKeys extends DistinctColorTokenKey[]>(
  str: string | undefined,
  options: {
    classTokens: TColorTokenKeys;
    defaultClassTokens?: { [K in DistinctColorTokenKey]?: string };
    forceDefaultClass?: boolean;
  }
) {
  const { classTokens, defaultClassTokens, forceDefaultClass } = options;

  const classArr = classTokens.map((key) => {
    const { colors, fallback: defaultFallback } = distinctColors[key];

    const fallback = defaultClassTokens?.[key] ?? defaultFallback;

    if (forceDefaultClass) {
      return fallback;
    }

    const element = stringToArrayElement(str, colors, fallback);

    console.log({ element });
    return element;
  });

  return classArr.join(' ');
}
