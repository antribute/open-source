import clsx from 'clsx';
import { flexGapVariants } from 'components/Flex';

import type { SizeProp } from 'types/styles';
import { generatePropPickerFn, objectMap } from 'utils';
import type { ClassedVariantProps } from 'utils/classed';
import { classed, classedCore, generateCompoundVariants, mergeVariants } from 'utils/classed';

export type InputSurfaceVariants = ClassedVariantProps<typeof inputSurfaceClassName>;

const borderRing = clsx('ring-1 ring-inset focus:ring-1 focus:ring-inset');

export const inputSurfaceClassName = classed(
  'div',
  'group relative rounded-[5px] text-boundary-weak',
  {
    defaultVariants: {
      filled: true,
      border: true,
      shadow: 'sm',
    },
    variants: {
      cursor: {
        pointer: 'cursor-pointer',
      },
      border: {
        // true: 'ring-1 ring-boundary-weak ring-inset focus:ring-1 focus:ring-boundary-weak focus:ring-inset',
        true: clsx(borderRing, 'ring-boundary-weak focus:ring-boundary-weak'),
        subtle: clsx(borderRing, 'ring-highlight-subtle focus:ring-highlight-subtle'),
        false: '',
      },
      shadow: {
        false: '',
        true: 'shadow-sm',
        sm: 'shadow-sm',
      },
      filled: {
        true: 'bg-surface-soft',
        tint: clsx('bg-highlight-tint'),
        subtle: clsx('bg-highlight-ghost'),
      },
      roundedFull: {
        true: 'rounded-full',
      },
    },
  }
);

export const pickInputSurfaceVariantProps = generatePropPickerFn<InputSurfaceVariants>({
  filled: '_pick_',
  border: '_pick_',
  roundedFull: '_pick_',
  cursor: '_pick_',
  shadow: '_pick_',
});

export const primitiveInputClassName = classedCore(
  'p-0',
  'bg-transparent',
  'border-none',
  'focus:ring-0 ring-0',
  'focus:outline-none outline-none',
  'placeholder:text-content-ghost',
  'selection:bg-content-ghost',
  'w-full'
);

type WidthProperty = 'width' | 'minWidth' | 'maxWidth';

const inputComponentWidths = {
  xs: { width: clsx('w-80'), minWidth: clsx('min-w-[80px]'), maxWidth: clsx('max-w-[80px]') },
  sm: { width: clsx('w-152'), minWidth: clsx('min-w-[152px]'), maxWidth: clsx('max-w-[152px]') },
  md: { width: clsx('w-216'), minWidth: clsx('min-w-[216px]'), maxWidth: clsx('max-w-[216px]') },
  lg: { width: clsx('w-264'), minWidth: clsx('min-w-[264px]'), maxWidth: clsx('max-w-[264px]') },
} satisfies Record<SizeProp, Record<WidthProperty, string>>;

const inputWidthPropSizes = objectMap(['width', 'minWidth', 'maxWidth'], ({ value: widthKey }) => {
  const variants = objectMap(inputComponentWidths, ({ key, value }) => {
    return [key, value[widthKey]];
  });

  return [widthKey, { true: variants.md, ...variants }];
});

export type InputSizeVariants = ClassedVariantProps<typeof inputSizeClassName>;

export const inputSizeClassName = classedCore('div', 'w-auto', {
  defaultVariants: {
    fullWidth: false,
    size: 'md',
    width: 'fixed',
  },
  variants: {
    size: mergeVariants([
      {
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-md',
        lg: 'text-lg',
      },
      // inputWidthPropSizes.width,
    ]),
    fullWidth: {
      true: '!w-full',
    },

    width: {
      fixed: '',
      auto: 'w-auto',
      ...inputWidthPropSizes.width,
    },
    minWidth: inputWidthPropSizes.minWidth,
    maxWidth: inputWidthPropSizes.maxWidth,
  },
  compoundVariants: [
    ...generateCompoundVariants({
      width: 'fixed',
      size: inputWidthPropSizes.width,
    }),
  ],
});

export const pickInputSizeVariantProps = generatePropPickerFn<InputSizeVariants>({
  fullWidth: '_pick_',
  minWidth: '_pick_',
  size: '_pick_',
  width: '_pick_',
  maxWidth: '_pick_',
});

export type InputGroupElementVariantProps = ClassedVariantProps<typeof InputGroupElement>;

export const InputGroupElement = classed(
  'div',
  'flex items-stretch',
  'flex-grow focus-within:z-10',
  inputSurfaceClassName,
  inputSizeClassName,
  {
    variants: {
      inputAddonsGap: flexGapVariants,
    },
    defaultVariants: {
      size: 'md',
      inputAddonsGap: 'sm',
    } as never,
  }
);

export const pickInputGroupElementVariantProps =
  generatePropPickerFn<InputGroupElementVariantProps>({
    ...pickInputSizeVariantProps.pickedRecord,
    ...pickInputSurfaceVariantProps.pickedRecord,
    inputAddonsGap: '_pick_',
  });
