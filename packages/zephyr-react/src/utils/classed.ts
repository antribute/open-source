import { ClassedVariantMap } from 'types/styles';
import { twMerge } from 'tailwind-merge';
import { mergeWith } from 'lodash-es';
import { createClassed, deriveClassed } from '@tw-classed/react';
import type * as Classed from '@tw-classed/react';
import clsx, { ClassValue } from 'clsx';

export type { ClassedFunctionProxy, ClassedProxyFunctionType } from '@tw-classed/react';

type ElementType = any extends Classed.ClassedComponentType<infer G> ? G : never;

export type ClassedComponentTypeProps<
  TElementType extends ElementType,
  TProps extends object = object
> = Classed.ComponentProps<Classed.ClassedComponentType<TElementType, TProps>>;
const { classed } = createClassed({ merger: twMerge });

export { classed, deriveClassed, Classed };

export const classedVariantMap = <T extends ClassedVariantMap>(variantMap: T) => variantMap;

export function mergeVariants<T extends Record<string, string> = Record<string, string>>(
  variants: T[] | Record<string, T>
) {
  const variantArray = Array.isArray(variants) ? variants : Object.values(variants);

  const mergerFn = (objectValue: string, sourceValue: string) =>
    twMerge(`${objectValue}`, `${sourceValue}`);

  const mergedVariants = mergeWith({}, ...variantArray, mergerFn) as T;

  return mergedVariants;
}

export const classTheme = (props: { class?: ClassValue; light: ClassValue; dark: ClassValue }) => {
  return clsx(props.class, props.light, props.dark);
};
