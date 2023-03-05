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

export type ButtonVariant = 'contained' | 'soft' | 'text' | 'outlined';

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

const containedVariants = {
  primary: 'bg-primary text-content-inverse-intense',
  info: 'bg-info text-content-inverse-intense',
  positive: 'bg-positive text-content-inverse-intense',
  caution: 'bg-caution-500 text-content-inverse-intense',
  danger: 'bg-danger text-content-inverse-intense',
  neutral: `bg-neutral-600 text-content-inverse-intense hover:bg-neutral-700`,
  'neutral-light': `bg-neutral-400 text-content-inverse-intense hover:bg-neutral-500`,
  'neutral-dark': `bg-neutral-800 hover:bg-neutral-900 text-content-inverse-intense`,
  'surface-secondary': `bg-surface  text-content ${surfaceGroupColors['surface-secondary'].contained}`,
  'surface-primary': `bg-various-neutral-400 text-white ${surfaceGroupColors['surface-primary'].contained}`,
  'surface-tertiary': `bg-various-neutral-800 text-content-inverse-intense ${surfaceGroupColors['surface-tertiary'].contained}`,
  'surface-soft': `bg-various-neutral-800 text-content-inverse-intense ${surfaceGroupColors['surface-soft'].contained}`,
  inverse: `bg-surface-inverse text-content-inverse-intense dark:bg-surface dark:text-content-intense`,
};

const softVariants = {
  primary: 'bg-primary/10 text-primary',
  info: 'bg-info/10 text-info',
  positive: 'bg-positive/10 text-positive',
  caution: 'bg-caution-500/10 text-caution',
  danger: 'bg-danger/10 text-danger',
  neutral: `bg-neutral-600/10 text-neutral hover:bg-neutral-700`,
  'neutral-light': `bg-neutral-400 text-content-inverse-intense hover:bg-neutral-500`,
  'neutral-dark': `bg-neutral-800 hover:bg-neutral-900 text-content-inverse-intense`,
  'surface-secondary': `bg-surface  text-content ${surfaceGroupColors['surface-secondary'].soft}`,
  'surface-primary': `bg-various-neutral-400 text-white ${surfaceGroupColors['surface-primary'].soft}`,
  'surface-tertiary': `bg-various-neutral-800 text-content-inverse-intense ${surfaceGroupColors['surface-tertiary'].soft}`,
  inverse: `bg-surface-inverse text-content-inverse-intense dark:bg-surface dark:text-content-intense`,
};

const surfaceText = clsx(
  'group-surface-neutral:text-content-inverse-intense',
  'group-surface-neutral-light:text-content-inverse-intense',
  'group-surface-neutral-dark:text-content-inverse-intense',
  'group-surface:text-content-intense dark:group-surface:text-content-inverse-intense',
  'group-surface-light:text-content-intense dark:group-surface-light:text-content-inverse-intense',
  'group-surface-dark:text-content-intense dark:group-surface-dark:text-content-inverse-intense',
  'group-surface-inverse:text-content-inverse-intense dark:group-surface-inverse:text-content-intense'
);

export const ButtonElement = classed.button(
  'cursor-pointer inline-flex font-medium items-center justify-center select-none align-middle',
  'disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-default disabled:border-gray-200 relative',
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
        contained: '',
        outlined: 'ring-2 ring-inset',
        soft: '',
        text: '',
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
        neutral: '',
        'surface-primary': '',
        'surface-secondary': '',
        'surface-tertiary': '',
        'surface-soft': '',
        inverse: '',
        primary: '',
        info: '',
        positive: '',
        danger: '',
        caution: '',
      },
    },

    defaultVariants: {
      size: 'md',
      rounded: 'default',
      noWrap: true,
      fontWeight: 'medium',
      color: 'neutral',
      justify: 'center',
      variant: 'contained',
    },

    compoundVariants: [
      ...generateCompoundVariants({
        variant: 'contained',
        color: containedVariants,
      }),
      ...generateCompoundVariants({
        variant: 'soft',
        color: softVariants,
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
        variant: 'contained',
        className: clsx('border-none bg-gradient-to-br transition-all  hover:brightness-[1.15]'),
        color: mergeVariants([colorVariants.gradient, colorVariants.ring]),
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
