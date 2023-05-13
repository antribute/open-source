import { mergeWith } from 'lodash-es';
import { twMerge } from 'tailwind-merge';

export function mergeVariants<T extends Record<string, string> = Record<string, string>>(
  variants: T[] | Record<string, T>,
  overrides?: Partial<Record<keyof T, string>>
) {
  const variantArray = Array.isArray(variants) ? variants : Object.values(variants);

  const mergerFn = (objectValue: string, sourceValue: string) =>
    twMerge(`${objectValue || ''}`, `${sourceValue}`);

  const mergedVariants = mergeWith({}, ...[...variantArray, overrides], mergerFn) as T;

  return mergedVariants;
}
