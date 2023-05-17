/* eslint-disable @typescript-eslint/no-explicit-any */
import { ClassedVariantMap, SizeProp } from 'types/styles';
import { extendTailwindMerge } from 'tailwind-merge';
import { map, mapValues, transform } from 'lodash-es';
import { createClassed, deriveClassed } from '@tw-classed/react';
import { createClassed as createClassedCore } from '@tw-classed/core';
import type * as Classed from '@tw-classed/react';
import clsx, { ClassValue } from 'clsx';
import { getRelativeSizePropData } from 'utils/getRelativeSizeProp';

export { makeStrict } from '@tw-classed/react';

export type { ClassedFunctionProxy, ClassedProxyFunctionType } from '@tw-classed/react';

type ElementType = any extends Classed.ClassedComponentType<infer G> ? G : never;

export type ClassedComponentTypeProps<
  TElementType extends ElementType,
  TProps extends object = object
> = Classed.ComponentProps<Classed.ClassedComponentType<TElementType, TProps>>;

type InferableClassedType = any extends Classed.VariantProps<infer P> ? P : never;

export interface IClassedComponent<TClassedComponent extends InferableClassedType> {
  ComponentProps: Classed.ComponentProps<TClassedComponent>;
  VariantProps: Classed.VariantProps<TClassedComponent>;
}

const twMerge = extendTailwindMerge({
  classGroups: {
    'font-size': [
      {
        // Fixes incorect merging of text size
        text: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      },
    ],
  },
});

const { classed } = createClassed({ merger: twMerge });

const { classed: classedCore } = createClassedCore({ merger: twMerge });

export { classed, classedCore, deriveClassed, Classed };

export const classedVariantMap = <T extends ClassedVariantMap>(variantMap: T) => variantMap;

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

export function generateCompoundVariants<
  TCompountVariantPropMap extends Partial<{
    [x: string]: string | boolean | Record<string, string>;
    className: string;
  }>
>(compoundVariantPropMap: TCompountVariantPropMap) {
  const { commonVariantProps, compoundVariantMapLists } = transform(
    compoundVariantPropMap,
    (result, value, key) => {
      if (typeof value === 'boolean' || typeof value === 'string') {
        result.commonVariantProps[key] = value;
        return result;
      }

      const compoundVariantMapList = map(value, (className, variantMapKey) => ({
        [key]: variantMapKey,
        class: className,
      }));

      result.compoundVariantMapLists.push(compoundVariantMapList);

      return result;
    },

    {
      commonVariantProps: {} as Record<string, boolean | string>,
      compoundVariantMapLists: [] as {
        [x: string]: string;
        class: string;
      }[][],
    }
  );

  return compoundVariantMapLists.flat().map(({ class: cls, ...props }) => {
    return {
      ...commonVariantProps,
      class: twMerge(cls, compoundVariantPropMap.className),
      ...props,
    };
  });
}

export type ToClassedVariants<T extends object> = {
  [K in keyof T]?: Partial<
    Record<T[K] extends boolean ? 'true' | 'false' : Extract<T[K], string>, string>
  >;
} & Record<string, Record<string, string>>;
