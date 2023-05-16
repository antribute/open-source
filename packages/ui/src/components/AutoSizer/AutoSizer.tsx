import { Slot } from '@radix-ui/react-slot';
import { ReactVirtualizedAutoSizerProps } from 'components/AutoSizer/AutoSizer.types';
import { omit, pick } from 'lodash-es';
import { useCallback, forwardRef } from 'react';
import ReactVirtualizedAutoSizer from 'react-virtualized-auto-sizer';
import { classed } from 'utils/classed';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';

interface SizeOption {
  width?: number;
  height?: number;
}

interface AutoSizerProps<TAsChild extends true | undefined>
  extends Omit<ReactVirtualizedAutoSizerProps, 'children'> {
  autoSizerClassName?: string;
  children: TAsChild extends true ? React.ReactNode : (size: SizeOption) => JSX.Element;
}

export const AutoSizer = <TAsChild extends true | undefined>({
  children,
  autoSizerClassName,
  ...props
}: AutoSizerProps<TAsChild>) => {
  const element = useCallback(
    ({ width, height }: SizeOption) => {
      if (typeof children === 'function') {
        return children({ height, width });
      }

      // eslint-disable-next-line react/prop-types
      const { style, ...rest } = props as { style?: React.CSSProperties };

      return (
        <Slot
          {...rest}
          style={{
            ...style,
            width,
            height,
          }}
        >
          {children}
        </Slot>
      );
    },
    [children, props]
  );

  return (
    <ReactVirtualizedAutoSizer className={autoSizerClassName}>
      {({ width, height }) => element({ width, height })}
    </ReactVirtualizedAutoSizer>
  );
};

const pickedScrollAreaProps = {
  scrollHideDelay: true,
  type: true,
  dir: true,
} satisfies Partial<Record<keyof ScrollAreaPrimitive.ScrollAreaProps, true>>;

type PickedScrollAreaProps = Pick<
  ScrollAreaPrimitive.ScrollAreaProps,
  keyof typeof pickedScrollAreaProps
>;

type ResponsiveScrollerContainerProps = React.ComponentProps<
  typeof ScrollerContainerElementWrapper
> &
  PickedScrollAreaProps;

const ScrollerContainerElementWrapper = classed('div', 'w-full', {
  variants: {
    grow: {
      true: 'grow',
    },
  },
});

const ScrollArea = forwardRef<HTMLDivElement, ResponsiveScrollerContainerProps>(
  ({ children, ...props }, forwardedRef) => {
    return (
      <ScrollerContainer {...props}>
        <ScrollAreaViewport ref={forwardedRef}>{children}</ScrollAreaViewport>
      </ScrollerContainer>
    );
  }
);

const ScrollerContainer = (props: ResponsiveScrollerContainerProps) => {
  const scrollAreaProps = pick(props, Object.keys(pickedScrollAreaProps)) as PickedScrollAreaProps;

  const { children, className, ...rest } = omit(props, Object.keys(pickedScrollAreaProps)) as Omit<
    ResponsiveScrollerContainerProps,
    keyof PickedScrollAreaProps
  >;

  return (
    <ScrollerContainerElementWrapper className={className} {...rest}>
      <AutoSizer>
        <ScrollerContainerElement {...scrollAreaProps}>{children}</ScrollerContainerElement>
      </AutoSizer>
    </ScrollerContainerElementWrapper>
  );
};

const ScrollAreaViewport = classed(ScrollAreaPrimitive.Viewport, 'w-full h-full');

const ScrollerContainerElement = classed(ScrollAreaPrimitive.Root, 'w-full bg-danger', {
  variants: {},
});

const Container = classed('div', 'grow flex flex-col');
const Header = classed('div', 'shrink-0');
const Footer = classed('div', 'shrink-0');

export { Container, Header, Footer, ScrollArea, ScrollAreaViewport, ScrollerContainer };
