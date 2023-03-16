/* eslint-disable tailwindcss/no-custom-classname */
import clsx from 'clsx';
import { buttonVariants } from 'components/Button/buttonVariants';
import { colorVariants } from 'styles/colors.variants';
import { inputComponentVariants } from 'styles/input-component.variants';
import { sizeVariants } from 'styles/size.variants';
import { surfaceColors } from 'styles/surface-colors.variants';
import { textVariants } from 'styles/text.variants';
import {
  Classed,
  classTheme,
  classed,
  expandVariant,
  generateCompoundVariants,
  mergeVariants,
} from 'utils/classed';

export type ButtonVariant = 'filled' | 'glass' | 'ghost' | 'text' | 'outlined';

export type ButtonElementVariantProps = Classed.VariantProps<typeof ButtonElement>;

export type ButtonElementProps = React.ComponentProps<typeof ButtonElement>;

const surfaceGroupColors = {
  'surface-primary': {
    contained: expandVariant(
      clsx(
        // Neutral
        [
          'group-surface-neutral:(bg-various-slate-500,hover:bg-various-slate-600,text-content-inverse-intense)',
          'group-surface-neutral-light:(bg-various-slate-500,hover:bg-various-slate-600,text-content-inverse-intense)',
        ],
        // Surface
        [
          'group-surface:(bg-various-slate-800,hover:bg-various-slate-900,text-content-inverse-white)',
          'group-surface-light:(bg-various-slate-700,hover:bg-various-slate-800)',
          'dark:group-surface:(bg-various-slate-600,hover:bg-various-slate-700)',
          'dark:group-surface-light:(bg-various-slate-500,hover:bg-various-slate-600)',
          'dark:group-surface-dark:(bg-various-slate-500,hover:bg-various-slate-600)',
        ]
      )
    ),
    soft: expandVariant(
      clsx(
        // Neutral
        [
          'group-surface-neutral:(bg-various-slate-400/30,hover:bg-various-slate-400/30,text-content-inverse-moderate)',
        ],
        // Surface
        [
          'group-surface:(bg-various-slate-300/50,hover:bg-various-slate-300/50,text-content-moderate)',
          'dark:group-surface:(bg-various-slate-400/30,hover:bg-various-slate-300/50,text-content-inverse-moderate)',

          // 'group-surface:(bg-various-slate-800,hover:bg-various-slate-900,text-content-inverse-white)',
          // 'group-surface-light:(bg-various-slate-700,hover:bg-various-slate-800)',
          // 'dark:group-surface:(bg-various-slate-600,hover:bg-various-slate-700)',
          // 'dark:group-surface-light:(bg-various-slate-500,hover:bg-various-slate-600)',
          // 'dark:group-surface-dark:(bg-various-slate-500,hover:bg-various-slate-600)',
        ]
      )
    ),
  },
  'surface-secondary': {
    contained: expandVariant(
      clsx(
        // Neutral
        [
          'group-surface-neutral:(bg-various-slate-500,text-content-inverse-intense)',
          'group-surface-neutral-base:(bg-various-slate-600,hover:bg-various-slate-700)',
          'group-surface-neutral-light:(bg-various-slate-600,hover:bg-various-slate-700)',
          'group-surface-neutral-dark:(bg-various-slate-600,hover:bg-various-slate-700)',
        ],
        // Surface
        [
          'group-surface:(bg-various-slate-500,hover:bg-various-slate-600,text-content-inverse-intense)',
          'dark:group-surface:(bg-surface-inverse,hover:bg-surface-inverse)',
          'dark:group-surface-base:(bg-neutral,hover:bg-neutral)',
          'dark:group-surface-light:(bg-neutral-500,hover:bg-neutral-600)',
          'dark:group-surface-dark:(bg-various-slate-700,hover:bg-various-slate-800)',
        ]
      )
    ),
    soft: expandVariant(
      clsx(
        // Neutral
        [
          'group-surface-neutral:(bg-various-slate-300/10,hover:bg-various-slate-400/60,text-content-inverse-moderate)',
          // 'group-surface-neutral-base:(bg-various-slate-600,hover:bg-various-slate-700)',
          // 'group-surface-neutral-light:(bg-various-slate-600,hover:bg-various-slate-700)',
          // 'group-surface-neutral-dark:(bg-various-slate-600,hover:bg-various-slate-700)',
        ],
        // Surface
        [
          'group-surface:(bg-various-slate-200/50,hover:bg-various-slate-300/50,text-content-moderate,dark:text-content-inverse-moderate)',
          'dark:group-surface:(bg-various-slate-400/50,hover:bg-various-slate-500/50,text-content-moderate,dark:text-content-inverse-moderate)',
          // 'dark:group-surface:(bg-surface-inverse,hover:bg-surface-inverse)',
          // 'dark:group-surface-base:(bg-neutral,hover:bg-neutral)',
          // 'dark:group-surface-light:(bg-neutral-500,hover:bg-neutral-600)',
          // 'dark:group-surface-dark:(bg-various-slate-700,hover:bg-various-slate-800)',
        ]
      )
    ),
  },
  'surface-tertiary': {
    contained: expandVariant(
      clsx(
        // Neutral
        [
          'group-surface-neutral:(bg-various-slate-700,hover:bg-various-slate-800,text-content-inverse-intense)',
          'group-surface-neutral-light:(bg-various-slate-700,hover:bg-various-slate-800)',
          'group-surface-neutral-dark:(bg-neutral-500,hover:bg-neutral-600)',
        ],
        // Surface Dark
        [
          'group-surface:(bg-various-slate-400,hover:bg-various-slate-500,text-content-inverse-intense)',
          'dark:group-surface:(bg-various-gray-800,hover:bg-various-gray-900)',
          'dark:group-surface-base:(bg-various-gray-800,hover:bg-various-gray-900)',
          'dark:group-surface-light:(bg-neutral-800,hover:bg-neutral-800)',
          'dark:group-surface-dark:(bg-neutral-800,hover:bg-neutral-900)',
        ]
      )
    ),
    soft: expandVariant(
      clsx(
        // Neutral
        [
          'group-surface-neutral:(bg-various-slate-400/10,hover:bg-various-slate-500/30,text-content-inverse-moderate)',
        ],
        // Surface Dark
        [
          'group-surface:(bg-various-slate-600/50,hover:bg-various-slate-700/50,dark:text-content-inverse-moderate)',
          'group-surface-light:(bg-various-slate-400/50,hover:bg-various-slate-700/50,dark:text-content-inverse-moderate)',
          // 'dark:group-surface:(bg-various-gray-800,hover:bg-various-gray-900)',
          // 'dark:group-surface-base:(bg-various-gray-800,hover:bg-various-gray-900)',
          // 'dark:group-surface-light:(bg-neutral-800,hover:bg-neutral-800)',
          // 'dark:group-surface-dark:(bg-neutral-800,hover:bg-neutral-900)',
        ]
      )
    ),
  },
  'surface-soft': {
    contained: expandVariant(
      clsx(
        // Neutral
        [
          'group-surface-neutral:(bg-various-slate-700,hover:bg-various-slate-800,text-content-inverse-intense)',
          'group-surface-neutral-light:(bg-various-slate-700,hover:bg-various-slate-800)',
          'group-surface-neutral-dark:(bg-neutral-500,hover:bg-neutral-600)',
        ],
        // Surface
        [
          'group-surface:(bg-various-gray-300,hover:bg-various-gray-900,text-content-intense)',
          // 'group-surface-base:(bg-various-gray-800,hover:bg-various-gray-900)',
          // 'group-surface-light:(bg-neutral-800,hover:bg-neutral-800)',
          // 'group-surface-dark:(bg-neutral-800,hover:bg-neutral-900)',
          'dark:group-surface:(bg-various-gray-800,hover:bg-various-gray-900)',
          'dark:group-surface-base:(bg-various-gray-800,hover:bg-various-gray-900)',
          'dark:group-surface-light:(bg-neutral-800,hover:bg-neutral-800)',
          'dark:group-surface-dark:(bg-neutral-800,hover:bg-neutral-900)',
        ]
      )
    ),
  },
};

export const ButtonElement = classed.button(
  'cursor-pointer inline-flex font-medium items-center justify-center select-none align-middle',
  'disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-default disabled:border-gray-200 relative',
  'transition-colors duration-100',
  'shrink-0',
  {
    variants: {
      loading: {
        true: 'cursor-default',
      },
      size: mergeVariants([
        inputComponentVariants.size.lineHeight,
        inputComponentVariants.size.paddingX,
        inputComponentVariants.size.paddingY,
        inputComponentVariants.size.textSize,
      ]),
      fontWeight: textVariants.fontWeight,
      noWrap: {
        true: 'whitespace-nowrap',
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
    },

    defaultVariants: {
      size: 'md',
      rounded: 'default',
      noWrap: true,
      fontWeight: 'medium',
      color: 'primary',
      justify: 'center',
      variant: 'filled',
    },

    compoundVariants: [
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
        hoverBackgroundColor: {
          primary: 'hover:bg-primary',
          secondary: 'hover:bg-secondary',
          inverse: 'hover:bg-inverse',
          heart: 'hover:bg-heart',
          info: 'hover:bg-info',
          success: 'hover:bg-success',
          danger: 'hover:bg-danger',
          caution: 'hover:bg-caution',
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
        className: 'overflow-hidden relative z-0 ',
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
        className: 'overflow-hidden bg-transparent relative z-0 ',
        color: {
          primary: 'glass-accent-primary text-primary',
          secondary: 'glass-accent-secondary text-secondary',
          inverse: 'glass-accent-inverse text-inverse',
          heart: 'glass-accent-heart',
          info: 'glass-accent-info',
          success: 'glass-accent-success',
          danger: 'glass-accent-danger',
          caution: 'glass-accent-caution',
        },
      }),

      ...generateCompoundVariants({
        variant: 'outlined',
        className: 'overflow-hidden relative z-0',
        color: {
          primary: 'outlined-accent-primary',
          secondary: 'outlined-accent-secondary',
          inverse: 'outlined-accent-inverse',
          heart: 'outlined-accent-heart',
          info: 'outlined-accent-info',
          success: 'outlined-accent-success',
          danger: 'outlined-accent-danger',
          caution: 'outlined-accent-caution',
        },
      }),

      // Colored Shadow
      ...generateCompoundVariants({
        coloredShadow: true,
        className: clsx('shadow-lg'),
        color: colorVariants.shadow,
      }),

      // Gradient
      ...generateCompoundVariants({
        gradient: true,
        variant: 'filled',
        className: clsx('border-none bg-gradient-to-tr transition-all  hover:brightness-[1.05]'),
        color: {
          primary: 'gradient-primary',
          secondary: 'gradient-secondary',
          inverse: 'gradient-inverse',
          heart: 'gradient-heart',
          info: 'gradient-info',
          success: 'gradient-success',
          danger: 'gradient-danger',
          caution: 'gradient-caution',
        },
      }),

      // Extra Padding X
      ...generateCompoundVariants({
        rounded: true,
        extraRoundedPadding: true,
        size: sizeVariants.extraPaddingX,
      }),
    ],
  }
);
