import { Slot } from '@radix-ui/react-slot';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { LiteralUnion } from 'type-fest';
import { ReactSvgProps } from 'types/react-types';

export interface SvgIconWrapperProps {
  asChild?: boolean;
  autoSize?: boolean;
  size?: string | number;
  viewbox?: '20' | '24';
  className?: string;
  strokeWidth?: '0' | '1' | '2' | '4';
  rounded?: boolean;
  children?: React.ReactNode;
  'aria-hidden'?: boolean;
}

export const SvgIconWrapper = ({
  children,
  asChild,
  autoSize = true,
  viewbox = '20',
  className,
  svgProps,
  strokeWidth,
  rounded,
  ...props
}: SvgIconWrapperProps & { svgProps?: ReactSvgProps }) => {
  const Svg = asChild ? Slot : 'svg';

  const size = autoSize ? '100%' : viewbox;

  const { className: roundedClassName, ...roundedProps } =
    (rounded
      ? ({
          className: 'rounded-full',
          strokeLinejoin: 'round',
          strokeLinecap: 'round',
        } satisfies ReactSvgProps)
      : undefined) ?? {};

  return (
    <Svg
      className={twMerge(roundedClassName, className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${viewbox} ${viewbox}`}
      height={size}
      width={size}
      fill="currentColor"
      stroke="currentColor"
      {...roundedProps}
      strokeWidth={strokeWidth}
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
