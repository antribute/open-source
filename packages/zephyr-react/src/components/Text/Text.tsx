import { textVariants } from 'styles/text.variants';
import { classed } from 'utils/classed';

export const Text = classed('span', 'text-content dark:text-content-inverse', {
  variants: {
    size: textVariants.size,
    fontWeight: textVariants.fontWeight,
    color: {
      weak: 'text-content-weak dark:text-content-inverse-weak',
      moderate: 'text-content-moderate dark:text-content-inverse-moderate',
      high: 'text-content-high dark:text-content-inverse-high',
      strong: 'text-content-intense dark:text-content-inverse-intense',
    },
    block: {
      true: 'block',
    },
  },

  defaultVariants: {
    color: 'moderate',
  },
});
