import { colorVariants } from 'styles/colors.variants';
import { generateCompoundVariants, mergeVariants } from 'utils/classed';

export const buttonVariants = {
  contained: generateCompoundVariants({
    variant: 'contained',
    color: mergeVariants([
      {
        surface: `ring-1 ring-inset ring-neutral-300/10 focus:ring-highlight`,
      },
      colorVariants.textBgContrast,
      colorVariants.bg,
      colorVariants.hoverDark,
    ]),
  }),
  outlined: generateCompoundVariants({
    variant: 'outlined',
    className: 'ring-2 ring-inset',
    color: mergeVariants([
      colorVariants.ring,
      colorVariants.focusRing,
      colorVariants.bgHoverHighlightDark,
    ]),
  }),
  soft: generateCompoundVariants({
    variant: 'soft',

    color: mergeVariants([
      colorVariants.bgHighlight,
      colorVariants.ring,
      colorVariants.bgHoverHighlightDark,
    ]),
  }),
  text: generateCompoundVariants({
    variant: 'text',
    color: mergeVariants([colorVariants.bgHoverHighlightDark]),
  }),
};
