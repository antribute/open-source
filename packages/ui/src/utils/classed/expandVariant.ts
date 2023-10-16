import type { ClassValue } from 'clsx';
import clsx from 'clsx';
import createVariatGroupTransfomer from 'tailwind-group-variant';
import { twMerge } from 'tailwind-merge';
import { notEmpty } from 'utils/notEmpty';

type ClassNameId = 'className' | '@';

type ExpandVariantId = `${string}:`;

export const expandVariant = createVariatGroupTransfomer({});

export const expandVariantMap = (variantMaps: [ExpandVariantId | ClassNameId, ClassValue][]) => {
  const variantGroupString = (variant: string, str: string) =>
    `${variant}${variant.startsWith(':') ? ':' : ''}(${str})`;

  const { expandEntries, classNameEntries } = variantMaps.reduce<{
    expandEntries: [ExpandVariantId, ClassValue][];
    classNameEntries: [ClassNameId, ClassValue][];
  }>(
    (acc, entry) => {
      const [k, v] = entry;
      if (['className', '@'].find((e) => e === k)) {
        acc.classNameEntries.push([k as ClassNameId, v]);
        return acc;
      }

      acc.expandEntries.push([k as ExpandVariantId, v]);

      return acc;
    },
    { expandEntries: [], classNameEntries: [] }
  );

  const expandedVariants = expandEntries
    .map(([variant, str]) => {
      const classString = clsx(str);

      const className = classString
        .split(' ')
        .map((e) => {
          const str = e.trim();
          return str || undefined;
        })
        .filter(notEmpty)
        .join(',');

      const variantString = variantGroupString(variant, className);

      return expandVariant(variantString);
    })
    .filter(notEmpty);

  const expandedVariantClassName = expandedVariants.join(' ').trim();

  const className = classNameEntries.map((e) => clsx(e[1])).join(' ');

  return twMerge(className, expandedVariantClassName);
};
