import clsx from 'clsx';
import { inputComponentVariants } from 'styles/input-component.variants';
import { fontWeightMap } from 'styles/tailwind-token-maps';
import { ColorProp } from 'types/styles';
import { Classed, classed, mergeVariants } from 'utils/classed';

export type ButtonVariant = 'contained' | 'soft' | 'text' | 'outlined' | 'outlined-filled';

export const ButtonElement = classed(
  'button',
  'cursor-pointer inline-flex items-center select-none align-middle',
  'disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-default disabled:border-gray-200 relative',
  {
    variants: {
      loading: {
        true: 'cursor-default',
      },
      size: mergeVariants(inputComponentVariants.size),
      fontWeight: fontWeightMap,
      noWrap: {
        true: 'whitespace-nowrap',
      },
      fullWidth: {
        true: 'w-full',
      },
      variant: {
        contained: clsx('border border-solid border-transparent'),
        soft: clsx('border bg-transparent'),
        outlined: clsx('border bg-white'),
        'outlined-filled': clsx('border bg-white'),
        text: clsx('border border-transparent'),
      } satisfies Record<ButtonVariant, string>,
      rounded: {
        sm: clsx('rounded'),
        default: clsx('rounded-md'),
        full: clsx('rounded-full'),
      },
      color: {
        primary: clsx('border-primary bg-primary text-primary  hover:bg-primary-dark'),
        secondary: clsx('border-secondary bg-secondary text-secondary hover:bg-secondary-dark'),
        positive: clsx('border-positive bg-positive text-positive hover:bg-positive-dark'),
        danger: clsx('border-danger bg-danger text-danger hover:bg-danger-dark'),
        caution: clsx('border-caution bg-caution text-caution hover:bg-caution-dark'),
      } satisfies Record<ColorProp, string>,
    },

    defaultVariants: {
      size: 'md',
      rounded: 'default',
      noWrap: true,
      fontWeight: 'medium',
      color: 'primary',
      variant: 'contained',
    },
    // compoundVariants: [
    //   { variant: 'contained', color: 'primary', className: 'opacity-0' },
    //   // { variant: 'contained', color: 'primary', class: 'opacity-0' },
    // ],

    compoundVariants: [
      // Contained Variant

      { variant: 'contained', class: 'text-white' },
      // --- Colors ---
      {
        variant: 'contained',
        color: 'primary',
        class: clsx('bg-primary hover:border-primary-dark hover:bg-primary-dark'),
      },
      {
        variant: 'contained',
        color: 'secondary',
        class: clsx('bg-secondary hover:border-secondary-dark hover:bg-secondary-dark'),
      },
      {
        variant: 'contained',
        color: 'positive',
        class: clsx('bg-positive hover:border-positive-dark hover:bg-positive-dark '),
      },
      {
        variant: 'contained',
        color: 'danger',
        class: clsx('bg-danger hover:border-danger-dark hover:bg-danger-dark'),
      },
      {
        variant: 'contained',
        color: 'caution',
        class: clsx('bg-caution hover:border-caution hover:bg-caution-dark'),
      },

      // Text Variant
      {
        variant: 'text',
        class: clsx('border-transparent bg-transparent'),
      },
      // --- Colors ---
      {
        variant: 'text',
        color: 'primary',
        class: clsx('hover:bg-primary-soft  text-primary'),
      },
      {
        variant: 'text',
        color: 'secondary',
        class: clsx('hover:bg-primary-soft  text-primary'),
      },
      {
        variant: 'text',
        color: 'positive',
        class: clsx('hover:bg-positive-soft  text-positive'),
      },
      {
        variant: 'text',
        color: 'danger',
        class: clsx('hover:bg-danger-soft  text-danger'),
      },
      {
        variant: 'text',
        color: 'caution',
        class: clsx('hover:bg-caution-soft  text-caution'),
      },

      // Outlined Variant
      {
        variant: 'outlined',
        class: clsx('border'),
      },
      // --- Colors ---
      {
        variant: 'outlined',
        class: 'bg-white',
      },
      {
        variant: 'outlined',
        color: 'primary',
        class: clsx('hover:bg-primary-soft text-primary'),
      },
      {
        variant: 'outlined',
        color: 'secondary',
        class: clsx('hover:bg-primary-soft text-primary'),
      },
      {
        variant: 'outlined',
        color: 'positive',
        class: clsx('hover:bg-positive-soft text-positive'),
      },
      {
        variant: 'outlined',
        color: 'danger',
        class: clsx('hover:bg-danger-soft text-danger'),
      },
      {
        variant: 'outlined',
        color: 'caution',
        class: clsx('hover:bg-caution-soft text-caution'),
      },

      // Outlined-Filled Variant
      {
        variant: 'outlined-filled',
        class: clsx('border text-white'),
      },
      // --- Colors ---
      {
        variant: 'outlined-filled',
        color: 'primary',
        class: clsx('bg-primary-soft hover:bg-primary-soft  text-primary'),
      },
      {
        variant: 'outlined-filled',
        color: 'secondary',
        class: clsx('bg-primary-soft hover:bg-primary-soft  text-primary'),
      },
      {
        variant: 'outlined-filled',
        color: 'positive',
        class: clsx('bg-positive-soft hover:bg-positive-soft  text-positive'),
      },
      {
        variant: 'outlined-filled',
        color: 'danger',
        class: clsx('bg-danger-soft hover:bg-danger-soft  text-danger'),
      },
      {
        variant: 'outlined-filled',
        color: 'caution',
        class: clsx('bg-caution-soft hover:bg-caution-soft  text-caution'),
      },
      // soft Variant
      {
        variant: 'soft',
        class: clsx('hover border-transparent'),
      },
      // --- Colors ---
      {
        variant: 'soft',
        color: 'primary',
        class: clsx('bg-primary-soft hover:bg-primary-soft  text-primary'),
      },
      {
        variant: 'soft',
        color: 'secondary',
        class: clsx('bg-primary-soft hover:bg-primary-soft  text-primary'),
      },
      {
        variant: 'soft',
        color: 'positive',
        class: clsx('bg-positive-soft hover:bg-positive-soft  text-positive'),
      },
      {
        variant: 'soft',
        color: 'danger',
        class: clsx('bg-danger-soft hover:bg-danger-soft  text-danger'),
      },
      {
        variant: 'soft',
        color: 'caution',
        class: clsx('bg-caution-soft hover:bg-caution-soft  text-caution'),
      },
    ],
  }
);

export type ButtonElementVariants = Classed.VariantProps<typeof ButtonElement>;

export type ButtonElementProps = React.ComponentProps<typeof ButtonElement>; //
