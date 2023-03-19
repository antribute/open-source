import { lazy } from 'react';
import { textVariants } from 'styles/text.variants';
import { Classed, classed } from 'utils/classed';

const Balancer = lazy(() => import('react-wrap-balancer'));

export const TextElement = classed('span', 'text-content dark:text-content-inverse', {
  variants: {
    size: textVariants.size,
    fontWeight: textVariants.fontWeight,
    color: textVariants.color,
    block: {
      true: 'block',
    },
  },
  defaultVariants: {
    color: 'moderate',
  },
});

type TextProps = {
  className?: string;
  children?: React.ReactNode;
  balancer?: boolean;
  balancerRatio?: number;
  as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
} & Classed.VariantProps<typeof TextElement>;

export const Text = ({ children, className, balancerRatio, balancer, as, ...props }: TextProps) => {
  const showBalancer = balancer ?? typeof balancerRatio === 'number';
  return (
    <TextElement className={className} as={as as any} {...props}>
      {showBalancer ? <Balancer ratio={balancerRatio}>{children}</Balancer> : children}
    </TextElement>
  );
};
