import { textVariants } from 'styles/text.variants';
import { classed } from 'utils/classed';

export const Text = classed('span', 'text-content dark:text-content-inverse', {
  variants: {
    size: textVariants.size,
    fontWeight: textVariants.fontWeight,
    color: {
      weak: 'text-content-weak dark:text-content-inverse-weak',
      moderate: 'text-content-moderate dark:text-content-inverse-moderate',
      strong: 'text-content-strong dark:text-content-inverse-strong',
    },
  },

  defaultVariants: {
    color: 'moderate',
  },
});
