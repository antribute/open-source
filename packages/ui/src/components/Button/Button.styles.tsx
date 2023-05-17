/* eslint-disable tailwindcss/no-custom-classname */
import clsx from 'clsx';
import { inputComponentVariants } from 'styles/input-component.variants';
import { sizeVariants } from 'styles/size.variants';
import { textVariants } from 'styles/text.variants';
import { Classed, classed, generateCompoundVariants, mergeVariants } from 'utils/classed';

export type ButtonVariant = 'filled' | 'glass' | 'ghost' | 'text' | 'outlined';

export type ButtonElementVariantProps = Classed.VariantProps<typeof ButtonElement>;

export type ButtonElementProps = React.ComponentProps<typeof ButtonElement>;

export const buttonVariants = {
  variants: {
    loading: {
      true: 'cursor-default',
    },
    cursorPointer: {
      false: 'cursor-auto',
    },
    size: mergeVariants(
      [inputComponentVariants.size.paddingX, inputComponentVariants.size.paddingY],
      {
        xs: 'text-xs px-6',
        sm: 'text-sm',
        md: 'text-sm',
        lg: 'text-sm',
      }
    ),

    fontWeight: textVariants.fontWeight,
    noWrap: {
      true: 'whitespace-nowrap',
    },
    inline: {
      true: 'inline',
    },
    justify: {
      center: 'justify-center',
      start: 'justify-start',
      end: 'justify-end',
    },
    fullWidth: {
      true: 'w-full',
    },

    variant: {
      filled: '',
      outlined: 'ring-[1.35px] ring-inset',
      glass: '',
      text: '',
      ghost: '',
    } satisfies Record<ButtonVariant, string>,
    rounded: {
      sm: clsx('rounded '),
      default: clsx('rounded'),
      true: 'rounded-full',
    },
    gradient: {
      true: '',
    },
    coloredShadow: {
      true: '',
    },
    extraRoundedPadding: {
      true: '',
    },
    color: {
      primary: '',
      secondary: '',
      surface: '',
      inverse: '',
      info: '',
      success: '',
      danger: '',
      caution: '',
      heart: '',
    },
    hoverBackgroundColor: {
      primary: '',
      secondary: '',
      inverse: '',
      info: '',
      success: '',
      danger: '',
      caution: '',
      heart: '',
    },
    backgroundNoise: {
      true: 'noisy-surface-texture',
    },
    gap: {
      true: '',
    },
  },

  compoundVariants: [
    ...generateCompoundVariants({
      gap: true,
      size: {
        xs: clsx('gap-4'),
        sm: clsx('gap-6'),
        md: clsx('gap-6'),
        lg: clsx('gap-6'),
      },
    }),
    ...generateCompoundVariants({
      variant: 'filled',
      color: {
        primary: 'filled-accent-primary filled-hover-accent-primary',
        secondary: 'filled-accent-secondary filled-hover-accent-secondary',
        inverse: 'filled-accent-inverse filled-hover-accent-inverse',
        heart: 'filled-accent-heart filled-hover-accent-heart',
        info: 'filled-accent-info filled-hover-accent-info',
        success: 'filled-accent-success filled-hover-accent-success',
        danger: 'filled-accent-danger filled-hover-accent-danger',
        caution: 'filled-accent-caution filled-hover-accent-caution',
      },
    }),
    ...generateCompoundVariants({
      variant: 'filled',
      color: {
        primary: 'filled-hover-accent-primary',
        secondary: 'filled-hover-accent-secondary',
        inverse: 'filled-hover-accent-inverse',
        heart: 'filled-hover-accent-heart',
        info: 'filled-hover-accent-info',
        success: 'filled-hover-accent-success',
        danger: 'filled-hover-accent-danger',
        caution: 'filled-hover-accent-caution',
      },
    }),
    ...generateCompoundVariants({
      variant: 'filled',
      hoverBackgroundColor: {
        primary: 'filled-hover-accent-primary',
        secondary: 'filled-hover-accent-secondary',
        inverse: 'filled-hover-accent-inverse',
        heart: 'filled-hover-accent-heart',
        info: 'filled-hover-accent-info',
        success: 'filled-hover-accent-success',
        danger: 'filled-hover-accent-danger',
        caution: 'filled-hover-accent-caution',
      },
    }),
    ...generateCompoundVariants({
      variant: 'glass',
      hoverBackgroundColor: {
        primary: 'hover:glass-accent-primary',
        secondary: 'hover:glass-accent-secondary',
        inverse: 'hover:glass-accent-inverse',
        heart: 'hover:glass-accent-heart',
        info: 'hover:glass-accent-info',
        success: 'hover:glass-accent-success',
        danger: 'hover:glass-accent-danger',
        caution: 'hover:glass-accent-caution',
      },
    }),

    ...generateCompoundVariants({
      variant: 'glass',
      className: 'overflow-hidden',
      color: {
        primary: 'glass-accent-primary',
        secondary: 'glass-accent-secondary',
        inverse: 'glass-accent-inverse',
        heart: 'glass-accent-heart',
        info: 'glass-accent-info',
        success: 'glass-accent-success',
        danger: 'glass-accent-danger',
        caution: 'glass-accent-caution',
      },
    }),

    ...generateCompoundVariants({
      variant: 'ghost',
      className: 'overflow-hidden bg-transparent',
      color: {
        primary: 'ghost-accent-primary',
        secondary: 'ghost-accent-secondary',
        inverse: 'ghost-accent-inverse',
        heart: 'ghost-accent-heart',
        info: 'ghost-accent-info',
        success: 'ghost-accent-success',
        danger: 'ghost-accent-danger',
        caution: 'ghost-accent-caution',
      },
    }),

    ...generateCompoundVariants({
      variant: 'outlined',
      className: 'overflow-hidden z-0 bg-surface-soft',
      color: {
        primary: 'ring-boundary-weak',
        secondary: 'ring-boundary-weak',
        inverse: 'text-inverse ring-inverse',
        heart: 'text-heart ring-heart',
        info: 'text-info ring-info',
        success: 'text-success ring-success',
        danger: 'text-danger ring-danger',
        caution: 'text-caution ring-caution',
      },
    }),

    // Colored Shadow
    ...generateCompoundVariants({
      coloredShadow: true,
      className: clsx('shadow-lg '),
      color: {
        primary: 'shadow-primary/70',
        secondary: 'shadow-secondary/70',
        inverse: 'shadow-inverse/70',
        heart: 'shadow-heart/70',
        info: 'shadow-info/70',
        success: 'shadow-success/70',
        danger: 'shadow-danger/70',
        caution: 'shadow-caution/70',
      },
    }),

    // Gradient
    ...generateCompoundVariants({
      gradient: true,
      variant: 'filled',
      className: clsx('border-none transition-all hover:brightness-[1.05]'),
      color: {
        primary: clsx('bg-gradient-primary-dark-to-light-tr'),
        secondary: clsx('bg-gradient-secondary-dark-to-light-tr'),
        inverse: clsx('bg-gradient-inverse-dark-to-light-tr'),
        heart: clsx('bg-gradient-heart-dark-to-light-tr'),
        info: clsx('bg-gradient-info-dark-to-light-tr'),
        success: clsx('bg-gradient-success-dark-to-light-tr'),
        danger: clsx('bg-gradient-danger-dark-to-light-tr'),
        caution: clsx('bg-gradient-caution-dark-to-light-tr'),
      },
    }),

    // Extra Padding X
    ...generateCompoundVariants({
      rounded: true,
      extraRoundedPadding: true,
      size: sizeVariants.extraPaddingX,
    }),
  ],
};

export const ButtonElement = classed.button(
  'inline-flex font-medium items-center justify-center select-none align-middle',
  'disabled:text-content-tint disabled:cursor-default disabled:pointer-events-none relative',
  'transition-colors duration-100',
  'box-border',
  'shrink-0',

  {
    defaultVariants: {
      size: 'md',
      rounded: 'default',
      noWrap: true,
      fontWeight: 'medium',
      color: 'primary',
      justify: 'center',
      variant: 'filled',
      extraRoundedPadding: true,
      gap: true,
    },
    variants: buttonVariants.variants,
    compoundVariants: buttonVariants.compoundVariants,
  }
);
