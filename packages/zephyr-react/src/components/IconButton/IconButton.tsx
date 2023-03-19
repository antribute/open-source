import { ButtonElement } from 'components/Button/Button.styles';
import { forwardRef } from 'react';
import { sizeVariants } from 'styles/size.variants';
import { classed, mergeVariants } from 'utils/classed';

const IconButtonElement = classed('button', ButtonElement, 'p-8 shrink-0', {
  variants: {
    size: mergeVariants([sizeVariants.width, sizeVariants.height]),
  },
});

export type IconButtonProps = React.ComponentProps<typeof IconButtonElement>;

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <IconButtonElement {...props} className={children ? className : undefined} ref={ref}>
        {children ?? <span className={className} />}
      </IconButtonElement>
    );
  }
);
