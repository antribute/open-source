import { ButtonElement } from 'components/Button/Button.styles';
import { sizeVariants } from 'styles/size.variants';
import { classed, mergeVariants } from 'utils/classed';

const IconButtonElement = classed('button', ButtonElement, 'p-4', {
  variants: {
    size: mergeVariants([sizeVariants.width, sizeVariants.height]),
  },
});

export type IconButtonProps = React.ComponentProps<typeof IconButtonElement>;

export const IconButton = (props: IconButtonProps) => {
  return <IconButtonElement {...props} />;
};
