import { PaperElement, PaperElementVariantProps } from 'components/Paper/Paper.styles';

type PaperProps = PaperElementVariantProps & {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export const Paper = ({ onClick, ...props }: PaperProps) => {
  const as = onClick ? 'button' : 'div';

  return <PaperElement as={as} onClick={onClick} {...props} />;
};
