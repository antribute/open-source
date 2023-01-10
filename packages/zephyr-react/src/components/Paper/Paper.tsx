import { PaperElement, PaperElementVariantProps } from 'components/Paper/Paper.styles';

type PaperProps = PaperElementVariantProps & {
  children?: React.ReactNode;
  className?: string;
};

export const Paper = (props: PaperProps) => {
  return <PaperElement {...props} />;
};
