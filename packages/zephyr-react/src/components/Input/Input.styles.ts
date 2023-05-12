import clsx from 'clsx';

import { SizeProp } from 'types/styles';
import { generatePropPickerFn, objectMap } from 'utils';
import { ClassedVariantProps, classed, classedCore, generateCompoundVariants } from 'utils/classed';

export type InputSurfaceVariants = ClassedVariantProps<typeof inputSurfaceClassName>;

export const inputSurfaceClassName = classed(
  'div',
  'group relative rounded-[5px] text-boundary-weak',
  {
    defaultVariants: {
      filled: true,
      border: true,
    },
    variants: {
      border: {
        true: 'ring-1 ring-boundary-weak ring-inset focus:ring-1 focus:ring-boundary-weak focus:ring-inset',
        false: '',
      },
      filled: {
        true: 'bg-surface-soft shadow-sm',
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
  lg: { width: clsx('w-328'), minWidth: clsx('min-w-[328px]'), maxWidth: clsx('max-w-[328px]') },
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
    // fixedWidth: true,
    fullWidth: false,
    maxWidth: false,
    minWidth: false,
    size: 'md',
  },
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-md',
      lg: 'text-lg',
    },
    fixedWidth: {
      true: '',
    },
    autoWidth: {
      true: '!w-auto',
    },
    fullWidth: {
      true: '!w-full',
    },

    minWidth: {
      false: 'min-w-0',
      ...inputWidthPropSizes.minWidth,
    },
    maxWidth: {
      // false: 'max-w-none',
      // true: '',
      // sm: '',
      // xs: '',
      // md: '',
      // lg: '',
      ...inputWidthPropSizes.minWidth,
    },
  },

  compoundVariants: [
    // Fixed Width Sizes
    ...generateCompoundVariants({
      // fixedWidth: true,
      // fullWidth: false,
      // size: inputWidthPropSizes.width,
    }),

    // Max Width Sizes
    ...generateCompoundVariants({
      // maxWidth: true,
      // fullWidth: true,
      className: '!w-auto',
      maxWidth: inputWidthPropSizes.maxWidth,
    }),
  ],
});

export const pickInputSizeVariantProps = generatePropPickerFn<InputSizeVariants>({
  fixedWidth: '_pick_',
  fullWidth: '_pick_',
  minWidth: '_pick_',
  size: '_pick_',
  autoWidth: '_pick_',
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
    defaultVariants: {
      size: 'md',
    },
  }
);

export const pickInputGroupElementVariantProps =
  generatePropPickerFn<InputGroupElementVariantProps>({
    ...pickInputSizeVariantProps.pickedRecord,
    ...pickInputSurfaceVariantProps.pickedRecord,
  });
