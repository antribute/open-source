import clsx from 'clsx';

export const highlightBackdropContrastClass = clsx(
  'group-[.is-surface]:backdrop-contrast-100',
  'group-[.is-surface-dark]:backdrop-contrast-75 dark:group-[.is-surface-dark]:backdrop-contrast-100',
  'group-[.is-surface-neutral]:backdrop-contrast-150'
);
