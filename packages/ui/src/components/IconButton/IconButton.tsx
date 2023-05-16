import { ButtonElement } from 'components/Button/Button.styles';
import { forwardRef } from 'react';
import { sizeVariants } from 'styles/size.variants';
import { classed, mergeVariants } from 'utils/classed';

const IconButtonElement = classed('button', ButtonElement, 'p-8 shrink-0', {
  variants: {
    size: mergeVariants([sizeVariants.width, sizeVariants.height]),
  },
});

export type IconButtonProps = Omit<
  React.ComponentProps<typeof IconButtonElement>,
  'extraRoundedPadding'
>;

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <IconButtonElement {...props} className={className} ref={ref} extraRoundedPadding={false}>
        {/* {children ?? <span className={className} />} */}
        {children}
      </IconButtonElement>
    );
  }
);
