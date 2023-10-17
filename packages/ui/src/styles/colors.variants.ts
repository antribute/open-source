import clsx from 'clsx';

/**
 * Deprecating
 */
export const colorVariants = {
  textBgContrast: {
    primary: clsx('text-content-inverse-intense'),
    neutral: clsx('text-content-inverse-intense'),
    inverse: clsx('text-content-inverse-intense dark:text-surface-inverse-50'),
    success: clsx('text-content-inverse-intense'),
    danger: clsx('text-content-inverse-intense'),
    caution: clsx('text-content-inverse-intense'),
    surface: clsx('text-content-moderate dark:text-content-inverse-intense'),
    'various-blue': clsx('text-content-inverse-intense'),
    'various-emerald': clsx('text-content-inverse-intense'),
    'various-orange': clsx('text-content-inverse-intense'),
    'various-fuchsia': clsx('text-content-inverse-intense'),
    'various-yellow': clsx('text-content-inverse-intense'),
    'various-rose': clsx('text-content-inverse-intense'),
    'various-cyan': clsx('text-content-inverse-intense'),
    'various-violet': clsx('text-content-inverse-intense'),
    'various-teal': clsx('text-content-inverse-intense'),
    'various-pink': clsx('text-content-inverse-intense'),
    'various-lime': clsx('text-content-inverse-intense'),
    'various-gray': clsx('text-content-inverse-intense'),
  },
  bg: {
    primary: clsx('bg-primary'),
    neutral: clsx('bg-neutral-600'),
    success: clsx('bg-success'),
    danger: clsx('bg-danger'),
    caution: clsx('bg-caution'),
    inverse: clsx('bg-neutral-900', 'dark:bg-content-inverse-intense'),
    surface: clsx('bg-surface dark:bg-surface-inverse-100'),
    'surface-soft': clsx('bg-surface-soft', 'dark:bg-surface-inverse-soft'),
    'surface-light': clsx('bg-surface-light', 'dark:bg-surface-inverse-light'),
    'surface-dark': clsx('bg-surface-dark', 'dark:bg-surface-inverse-dark'),
    'various-blue': clsx('bg-palette-various-blue'),
    'various-emerald': clsx('bg-palette-various-emerald'),
    'various-orange': clsx('bg-palette-various-orange'),
    'various-fuchsia': clsx('bg-palette-various-fuchsia'),
    'various-yellow': clsx('bg-palette-various-yellow'),
    'various-rose': clsx('bg-palette-various-rose'),
    'various-cyan': clsx('bg-palette-various-cyan'),
    'various-violet': clsx('bg-palette-various-violet'),
    'various-teal': clsx('bg-palette-various-teal'),
    'various-pink': clsx('bg-palette-various-pink'),
    'various-lime': clsx('bg-palette-various-lime'),
    'various-gray': clsx('bg-palette-various-gray'),
  },
  bgHighlight: {
    primary: clsx('bg-primary-light/10'),
    neutral: clsx('bg-neutral-400/10'),
    success: clsx('bg-success-light/10'),
    danger: clsx('bg-danger-light/10'),
    caution: clsx('bg-caution-light/10'),
    'various-blue': clsx('bg-palette-various-blue-light/10'),
    'various-emerald': clsx('bg-palette-various-emerald-light/10'),
    'various-orange': clsx('bg-palette-various-orange-light/10'),
    'various-fuchsia': clsx('bg-palette-various-fuchsia-light/10'),
    'various-yellow': clsx('bg-palette-various-yellow-light/10'),
    'various-rose': clsx('bg-palette-various-rose-light/10'),
    'various-cyan': clsx('bg-palette-various-cyan-light/10'),
    'various-violet': clsx('bg-palette-various-violet-light/10'),
    'various-teal': clsx('bg-palette-various-teal-light/10'),
    'various-pink': clsx('bg-palette-various-pink-light/10'),
    'various-lime': clsx('bg-palette-various-lime-light/10'),
    'various-gray': clsx('bg-palette-various-gray-light/10'),
    inverse: clsx('bg-surface-inverse/10', 'dark:bg-surface/10'),
    surface: clsx('bg-surface/10', 'dark:bg-surface-inverse-50/30'),
  },
  bgHoverHighlightDark: {
    primary: clsx('hover:bg-primary-light/20'),
    neutral: clsx('hover:bg-neutral-400/20'),
    success: clsx('hover:bg-success-light/20'),
    danger: clsx('hover:bg-danger-light/20'),
    caution: clsx('hover:bg-caution-light/20'),
    'various-blue': clsx('hover:bg-palette-various-blue-light/20'),
    'various-emerald': clsx('hover:bg-palette-various-emerald-light/20'),
    'various-orange': clsx('hover:bg-palette-various-orange-light/20'),
    'various-fuchsia': clsx('hover:bg-palette-various-fuchsia-light/20'),
    'various-yellow': clsx('hover:bg-palette-various-yellow-light/20'),
    'various-rose': clsx('hover:bg-palette-various-rose-light/20'),
    'various-cyan': clsx('hover:bg-palette-various-cyan-light/20'),
    'various-violet': clsx('hover:bg-palette-various-violet-light/20'),
    'various-teal': clsx('hover:bg-palette-various-teal-light/20'),
    'various-pink': clsx('hover:bg-palette-various-pink-light/20'),
    'various-lime': clsx('hover:bg-palette-various-lime-light/20'),
    'various-gray': clsx('hover:bg-palette-various-gray-light/20'),
    inverse: clsx('hover:bg-surface-inverse/20', 'dark:hover:bg-surface/20'),
    surface: clsx('hover:bg-surface/20', 'dark:hover:bg-surface-inverse-soft/20'),
  },
  hoverDark: {
    primary: clsx('hover:bg-primary-dark'),
    neutral: clsx('hover:bg-neutral-600'),
    success: clsx('hover:bg-success-dark'),
    danger: clsx('hover:bg-danger-dark'),
    caution: clsx('hover:bg-caution-dark'),
    inverse: clsx('hover:bg-surface-inverse-dark dark:hover:bg-surface-dark'),
    surface: clsx('hover:bg-surface-100 hover:dark:bg-surface-inverse-400'),
    'surface-soft': clsx('hover:bg-surface-light', 'hover:dark:bg-surface-inverse-light'),
    'surface-light': clsx('hover:bg-surface-dark', 'hover:dark:bg-surface-inverse-dark'),
    'surface-dark': clsx('hover:bg-surface-900', 'hover:dark:bg-surface-inverse-900'),
    'various-blue': clsx('hover:bg-palette-various-blue-dark'),
    'various-emerald': clsx('hover:bg-palette-various-emerald-dark'),
    'various-orange': clsx('hover:bg-palette-various-orange-dark'),
    'various-fuchsia': clsx('hover:bg-palette-various-fuchsia-dark'),
    'various-yellow': clsx('hover:bg-palette-various-yellow-dark'),
    'various-rose': clsx('hover:bg-palette-various-rose-dark'),
    'various-cyan': clsx('hover:bg-palette-various-cyan-dark'),
    'various-violet': clsx('hover:bg-palette-various-violet-dark'),
    'various-teal': clsx('hover:bg-palette-various-teal-dark'),
    'various-pink': clsx('hover:bg-palette-various-pink-dark'),
    'various-lime': clsx('hover:bg-palette-various-lime-dark'),
    'various-gray': clsx('hover:bg-palette-various-gray-dark'),
  },
  border: {
    primary: clsx('border-primary'),
    neutral: clsx('border-neutral'),
    success: clsx('border-success'),
    danger: clsx('border-danger'),
    caution: clsx('border-caution'),
    surface: clsx('border-black/20 dark:border-white/20'),
    inverse: clsx('border-black/10 dark:border-white/60'),
    'various-blue': clsx('border-palette-various-blue'),
    'various-emerald': clsx('border-palette-various-emerald'),
    'various-orange': clsx('border-palette-various-orange'),
    'various-fuchsia': clsx('border-palette-various-fuchsia'),
    'various-yellow': clsx('border-palette-various-yellow'),
    'various-rose': clsx('border-palette-various-rose'),
    'various-cyan': clsx('border-palette-various-cyan'),
    'various-violet': clsx('border-palette-various-violet'),
    'various-teal': clsx('border-palette-various-teal'),
    'various-pink': clsx('border-palette-various-pink'),
    'various-lime': clsx('border-palette-various-lime'),
    'various-gray': clsx('border-palette-various-gray'),
  },
  focusBorder: {
    neutral: clsx('focus:border-neutral-light'),
    primary: clsx('focus:border-primary-light'),
    success: clsx('focus:border-success-light'),
    danger: clsx('focus:border-danger-light'),
    caution: clsx('focus:border-caution-light'),
    inverse: clsx('focus:border-surface-inverse dark:focus:border-surface'),
    surface: clsx(''),
    'various-blue': clsx('focus:border-palette-various-blue'),
    'various-emerald': clsx('focus:border-palette-various-emerald'),
    'various-orange': clsx('focus:border-palette-various-orange'),
    'various-fuchsia': clsx('focus:border-palette-various-fuchsia'),
    'various-yellow': clsx('focus:border-palette-various-yellow'),
    'various-rose': clsx('focus:border-palette-various-rose'),
    'various-cyan': clsx('focus:border-palette-various-cyan'),
    'various-violet': clsx('focus:border-palette-various-violet'),
    'various-teal': clsx('focus:border-palette-various-teal'),
    'various-pink': clsx('focus:border-palette-various-pink'),
    'various-lime': clsx('focus:border-palette-various-lime'),
    'various-gray': clsx('focus:border-palette-various-gray'),
  },
  focusRing: {
    neutral: clsx('focus:ring-neutral'),
    primary: clsx('focus:ring-primary'),
    success: clsx('focus:ring-success'),
    danger: clsx('focus:ring-danger'),
    caution: clsx('focus:ring-caution'),
    surface: clsx('focus:ring-black/10 dark:focus:ring-white/10'),
    inverse: clsx('focus:ring-surface-inverse dark:focus:ring-surface'),
    'various-blue': clsx('focus:ring-palette-various-blue'),
    'various-emerald': clsx('focus:ring-palette-various-emerald'),
    'various-orange': clsx('focus:ring-palette-various-orange'),
    'various-fuchsia': clsx('focus:ring-palette-various-fuchsia'),
    'various-yellow': clsx('focus:ring-palette-various-yellow'),
    'various-rose': clsx('focus:ring-palette-various-rose'),
    'various-cyan': clsx('focus:ring-palette-various-cyan'),
    'various-violet': clsx('focus:ring-palette-various-violet'),
    'various-teal': clsx('focus:ring-palette-various-teal'),
    'various-pink': clsx('focus:ring-palette-various-pink'),
    'various-lime': clsx('focus:ring-palette-various-lime'),
    'various-gray': clsx('focus:ring-palette-various-gray'),
  },
  ring: {
    neutral: clsx('ring-neutral-300 dark:ring-neutral-400'),
    primary: clsx('ring-primary'),
    success: clsx('ring-success'),
    danger: clsx('ring-danger'),
    caution: clsx('ring-caution'),
    surface: clsx('dark:ring-surface-inverse-200 ring-black/10'),
    inverse: clsx('ring-surface-inverse dark:ring-surface'),
    'various-blue': clsx('ring-palette-various-blue'),
    'various-emerald': clsx('ring-palette-various-emerald'),
    'various-orange': clsx('ring-palette-various-orange'),
    'various-fuchsia': clsx('ring-palette-various-fuchsia'),
    'various-yellow': clsx('ring-palette-various-yellow'),
    'various-rose': clsx('ring-palette-various-rose'),
    'various-cyan': clsx('ring-palette-various-cyan'),
    'various-violet': clsx('ring-palette-various-violet'),
    'various-teal': clsx('ring-palette-various-teal'),
    'various-pink': clsx('ring-palette-various-pink'),
    'various-lime': clsx('ring-palette-various-lime'),
    'various-gray': clsx('ring-palette-various-gray'),
  },
  fill: {
    primary: clsx('fill-primary'),
    neutral: clsx('fill-neutral'),
    'neutral-light': clsx('fill-neutral-light'),
    success: clsx('fill-success'),
    danger: clsx('fill-danger'),
    caution: clsx('fill-caution'),
    inverse: clsx('fill-surface-inverse', 'dark:fill-surface'),
    surface: clsx('fill-surface', 'dark:fill-surface-inverse-soft'),
    'surface-soft': clsx('fill-surface-soft', 'dark:fill-surface-inverse-soft'),
    'surface-light': clsx('fill-surface-light', 'dark:fill-surface-inverse-light'),
    'surface-dark': clsx('fill-surface-dark', 'dark:fill-surface-inverse-dark'),
    'various-blue': clsx('fill-palette-various-blue'),
    'various-emerald': clsx('fill-palette-various-emerald'),
    'various-orange': clsx('fill-palette-various-orange'),
    'various-fuchsia': clsx('fill-palette-various-fuchsia'),
    'various-yellow': clsx('fill-palette-various-yellow'),
    'various-rose': clsx('fill-palette-various-rose'),
    'various-cyan': clsx('fill-palette-various-cyan'),
    'various-violet': clsx('fill-palette-various-violet'),
    'various-teal': clsx('fill-palette-various-teal'),
    'various-pink': clsx('fill-palette-various-pink'),
    'various-lime': clsx('fill-palette-various-lime'),
    'various-gray': clsx('fill-palette-various-gray'),
    transparent: clsx('fill-transparent'),
  },
  shadow: {
    primary: clsx('shadow-primary/50', 'dark:shadow-primary-800/60'),
    neutral: clsx('shadow-neutral-500/50', 'dark:shadow-neutral-800/80'),
    success: clsx('shadow-success/50', 'dark:shadow-success-800/60'),
    danger: clsx('shadow-danger/50', 'dark:shadow-danger-800/60'),
    caution: clsx('shadow-caution/50', 'dark:shadow-caution-800/60'),
    inverse: clsx('shadow-surface-inverse/50', 'dark:shadow-surface-inverse-50/80'),
    surface: clsx('shadow-surface-800', 'dark:shadow-neutral-800/80'),
    'surface-soft': clsx('shadow-surface-soft/50', 'dark:shadow-surface-soft/60'),
    'surface-light': clsx('shadow-surface-light/50', 'dark:shadow-surface-light/60'),
    'surface-dark': clsx('shadow-surface-dark/50', 'dark:shadow-surface-dark/60'),
    'various-blue': clsx(
      'shadow-palette-various-blue/50',
      'dark:shadow-palette-various-blue-800/60'
    ),
    'various-emerald': clsx(
      'shadow-palette-various-emerald/50',
      'dark:shadow-palette-various-emerald-800/60'
    ),
    'various-orange': clsx(
      'shadow-palette-various-orange/50',
      'dark:shadow-palette-various-orange-800/60'
    ),
    'various-fuchsia': clsx(
      'shadow-palette-various-fuchsia/50',
      'dark:shadow-palette-various-fuchsia-800/60'
    ),
    'various-yellow': clsx(
      'shadow-palette-various-yellow/50',
      'dark:shadow-palette-various-yellow-800/60'
    ),
    'various-rose': clsx(
      'shadow-palette-various-rose/50',
      'dark:shadow-palette-various-rose-800/60'
    ),
    'various-cyan': clsx(
      'shadow-palette-various-cyan/50',
      'dark:shadow-palette-various-cyan-800/60'
    ),
    'various-violet': clsx(
      'shadow-palette-various-violet/50',
      'dark:shadow-palette-various-violet-800/60'
    ),
    'various-teal': clsx(
      'shadow-palette-various-teal/50',
      'dark:shadow-palette-various-teal-800/60'
    ),
    'various-pink': clsx(
      'shadow-palette-various-pink/50',
      'dark:shadow-palette-various-pink-800/60'
    ),
    'various-lime': clsx(
      'shadow-palette-various-lime/50',
      'dark:shadow-palette-various-lime-800/60'
    ),
    'various-gray': clsx(
      'shadow-palette-various-gray/50',
      'dark:shadow-palette-various-gray-800/60'
    ),
  },

  gradient: {
    primary: clsx('from-primary-300 via-primary-500  to-primary-700'),
    neutral: clsx(
      'from-neutral-300 via-neutral-400  to-neutral-700',
      'dark:to-surface-inverse dark:from-neutral-300  dark:via-neutral-600'
    ),
    success: clsx('from-success-300 via-success-500  to-success-700'),
    danger: clsx('from-danger-300 via-danger-500  to-danger-600'),
    caution: clsx('from-caution-300 via-caution-500  to-caution-600'),
    'various-blue': clsx(
      'from-palette-various-blue-300 via-palette-various-blue-500  to-palette-various-blue-600'
    ),
    'various-emerald': clsx(
      'from-palette-various-emerald-300 via-palette-various-emerald-500  to-palette-various-emerald-600'
    ),
    'various-orange': clsx(
      'from-palette-various-orange-300 via-palette-various-orange-500  to-palette-various-orange-600'
    ),
    'various-fuchsia': clsx(
      'from-palette-various-fuchsia-300 via-palette-various-fuchsia-500  to-palette-various-fuchsia-600'
    ),
    'various-yellow': clsx(
      'from-palette-various-yellow-300 via-palette-various-yellow-500  to-palette-various-yellow-600'
    ),
    'various-rose': clsx(
      'from-palette-various-rose-300 via-palette-various-rose-500  to-palette-various-rose-600'
    ),
    'various-cyan': clsx(
      'from-palette-various-cyan-300 via-palette-various-cyan-500  to-palette-various-cyan-600'
    ),
    'various-violet': clsx(
      'from-palette-various-violet-300 via-palette-various-violet-500  to-palette-various-violet-600'
    ),
    'various-teal': clsx(
      'from-palette-various-teal-300 via-palette-various-teal-500  to-palette-various-teal-600'
    ),
    'various-pink': clsx(
      'from-palette-various-pink-300 via-palette-various-pink-500  to-palette-various-pink-600'
    ),
    'various-lime': clsx(
      'from-palette-various-lime-300 via-palette-various-lime-500  to-palette-various-lime-600'
    ),
    'various-gray': clsx(
      'from-palette-various-gray-300 via-palette-various-gray-500  to-palette-various-gray-600'
    ),

    inverse: clsx(
      'to-surface-inverse from-neutral-300',
      'dark:from-surface-50  dark:to-neutral-400 '
    ),
    surface: clsx(
      'from-surface-50  via-surface-200 to-surface-900',
      'dark:via-surface-inverse-300 dark:to-surface-inverse-900 dark:from-neutral-500'
    ),
    'surface-soft': clsx(
      'from-surface-soft',
      'dark:from-surface-inverse-soft dark:to-surface-inverse-soft'
    ),
    'surface-light': clsx(
      'from-surface-light',
      'dark:from-surface-inverse-light dark:to-surface-inverse-light'
    ),
    'surface-dark': clsx(
      'from-surface-dark',
      'dark:from-surface-inverse-dark dark:to-surface-inverse-dark'
    ),
  },
};

export const colorToTWTokenMap = {
  primary: 'primary',
  danger: 'danger',
  success: 'success',
  caution: 'caution',
  inverse: 'inverse',
  surface: 'surface',
  neutral: 'neutral',
  blue: 'various-blue',
  green: 'various-emerald',
  red: 'various-red',
  yellow: 'various-yellow',
  orange: 'various-orange',
  fuchsia: 'various-fuchsia',
  rose: 'various-rose',
  cyan: 'various-cyan',
  violet: 'various-violet',
  teal: 'various-teal',
  pink: 'various-pink',
  lime: 'various-lime',
  gray: 'various-gray',
};

export const filledAccents = {
  primary: 'filled-accent-primary',
  secondary: 'filled-accent-secondary',
  inverse: 'filled-accent-inverse',
  heart: 'filled-accent-heart',
  info: 'filled-accent-info',
  success: 'filled-accent-success',
  danger: 'filled-accent-danger',
  caution: 'filled-accent-caution',
  surface: 'filled-accent-surface',
  blue: clsx('filled-accent-palette-various-blue'),
  neutral: clsx('filled-accent-palette-various-neutral'),
  green: clsx('filled-accent-palette-various-green'),
  red: clsx('filled-accent-palette-various-red'),
  yellow: clsx('filled-accent-palette-various-yellow'),
  orange: clsx('filled-accent-palette-various-orange'),
  fuchsia: clsx('filled-accent-palette-various-fuchsia'),
  rose: clsx('filled-accent-palette-various-rose'),
  cyan: clsx('filled-accent-palette-various-cyan'),
  violet: clsx('filled-accent-palette-various-violet'),
  teal: clsx('filled-accent-palette-various-teal'),
  pink: clsx('filled-accent-palette-various-pink'),
  lime: clsx('filled-accent-palette-various-lime'),
  gray: clsx('filled-accent-palette-various-gray'),
};
