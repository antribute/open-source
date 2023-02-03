import clsx from 'clsx';

export const colorVariants = {
  text: {
    primary: clsx('text-primary'),
    secondary: clsx('text-secondary'),
    positive: clsx('text-positive'),
    danger: clsx('text-danger'),
    caution: clsx('text-caution'),
    weak: clsx('text-content dark:text-content-inverse'),
    moderate: clsx('text-content-weak dark:text-content-inverse-weak'),
    strong: clsx('text-content-strong dark:text-content-inverse-strong'),
  },
  bg: {
    primary: clsx('bg-primary'),
    secondary: clsx('bg-secondary'),
    positive: clsx('bg-positive'),
    danger: clsx('bg-danger'),
    caution: clsx('bg-caution'),
  },
  hoverDark: {
    primary: clsx('hover:bg-primary-dark'),
    secondary: clsx('hover:bg-secondary-dark'),
    positive: clsx('hover:bg-positive-dark'),
    danger: clsx('hover:bg-danger-dark'),
    caution: clsx('hover:bg-caution-dark'),
  },
  border: {
    primary: clsx('border-primary'),
    secondary: clsx('border-secondary'),
    positive: clsx('border-positive'),
    danger: clsx('border-danger'),
    caution: clsx('border-caution'),
  },
};
