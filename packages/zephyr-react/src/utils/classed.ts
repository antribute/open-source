import { ClassedVariantMap, SizeProp } from 'types/styles';
import { twMerge } from 'tailwind-merge';
import { mapValues, mergeWith, pick } from 'lodash-es';
import { createClassed, deriveClassed } from '@tw-classed/react';
import { createClassed as createClassedCore } from '@tw-classed/core';
import type * as Classed from '@tw-classed/react';
import clsx, { ClassValue } from 'clsx';
import { LiteralUnion } from 'type-fest';
import { getRelativeSizePropData } from 'utils/getRelativeSizeProp';

export type { ClassedFunctionProxy, ClassedProxyFunctionType } from '@tw-classed/react';

type ElementType = any extends Classed.ClassedComponentType<infer G> ? G : never;

export type ClassedComponentTypeProps<
  TElementType extends ElementType,
  TProps extends object = object
> = Classed.ComponentProps<Classed.ClassedComponentType<TElementType, TProps>>;
const { classed } = createClassed({ merger: twMerge });
const { classed: classedCore } = createClassedCore({ merger: twMerge });

export { classed, classedCore, deriveClassed, Classed };

export const classedVariantMap = <T extends ClassedVariantMap>(variantMap: T) => variantMap;

export function mergeVariants<T extends Record<string, string> = Record<string, string>>(
  variants: T[] | Record<string, T>,
  options?: { pick?: LiteralUnion<keyof T, string>[] }
) {
  const variantArray = Array.isArray(variants) ? variants : Object.values(variants);

  const mergerFn = (objectValue: string, sourceValue: string) =>
    twMerge(`${objectValue || ''}`, `${sourceValue}`);

  const mergedVariants = mergeWith({}, ...variantArray, mergerFn) as T;

  return options?.pick ? pick(mergedVariants, options.pick) : mergedVariants;
}

export const classTheme = (props: { class?: ClassValue; light: ClassValue; dark: ClassValue }) => {
  return clsx(props.class, props.light, props.dark);
};

export function relativeSizeVariants<T extends Record<SizeProp, string>>(options: {
  delta: number;
  variants: T;
  overrides?: T;
}) {
  const { delta, variants, overrides } = options;

  const relativeSizeVariants = mapValues(variants, (_, size) => {
    const { sizeProp: decreasedSize } = getRelativeSizePropData(delta, {
      relativeSize: size as SizeProp,
    });

    return variants[decreasedSize];
  });

  return { ...relativeSizeVariants, ...overrides } as T;
}
