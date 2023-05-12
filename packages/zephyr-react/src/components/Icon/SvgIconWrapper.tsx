import { Slot } from '@radix-ui/react-slot';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ReactSvgProps } from 'types/react-types';

interface SvgIconWrapperProps extends ReactSvgProps {
  asChild?: boolean;
  autoSize?: boolean;
}

export const SvgIconWrapper = ({
  children,
  asChild,
  autoSize,
  className,
  ...props
}: SvgIconWrapperProps) => {
  const Svg = asChild ? Slot : 'svg';

  return (
    <Svg
      className={twMerge(clsx({ 'h-22 w-22': !autoSize, 'h-full w-full': autoSize }), className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      {...(props as object)}
    >
      {children}
    </Svg>
  );
};

export const svgIcon = (
  svg: React.ReactElement<ReactSvgProps>,
  defaultProps?: Omit<SvgIconWrapperProps, 'asChild'>
) => {
  const SvgIcon: React.ComponentType<SvgIconWrapperProps> = (props) => (
    <SvgIconWrapper {...props} {...defaultProps} asChild>
      {svg}
    </SvgIconWrapper>
  );

  return SvgIcon;
};
