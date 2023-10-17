import { omit } from 'lodash-es';
import { classed } from 'utils/classed';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import AutoSizer from 'react-virtualized-auto-sizer';
import type { ReactVirtualizedAutoSizerProps } from 'components/AutoSizer/AutoSizer.types';
import { twMerge } from 'tailwind-merge';
import { pickProps } from 'utils/pickProps';
import { ScrollBar } from './ScrollBar';

const ScrollAreaContainerElement = classed('div', 'w-full  bg-inherit', {
  variants: {
    grow: {
      true: '!grow',
      false: '!grow',
    },
  },
  defaultVariants: {
    grow: true,
  },
});

type PickedScrollAreaProps = Pick<
  ScrollAreaPrimitive.ScrollAreaProps,
  keyof typeof pickedScrollAreaProps
>;

const pickedScrollAreaProps = {
  asChild: true,
  scrollHideDelay: true,
  type: true,
  dir: true,
} satisfies Partial<Record<keyof ScrollAreaPrimitive.ScrollAreaProps, true>>;

type PickedAutoSizerProps = Pick<
  ReactVirtualizedAutoSizerProps & { autoSizerClassName?: string },
  keyof typeof pickedAutoSizerProps
>;

const pickedAutoSizerProps = {
  defaultHeight: true,
  defaultWidth: true,
  disableHeight: true,
  disableWidth: true,
} satisfies Partial<Record<keyof ReactVirtualizedAutoSizerProps, true>>;

export type ScrollAreaContainerProps = {
  autoSizerClassName?: string;
  scrollAreaClassName?: string;
} & React.ComponentProps<typeof ScrollAreaContainerElement> &
  PickedScrollAreaProps &
  PickedAutoSizerProps;

export const ScrollAreaContainer = ({
  scrollAreaClassName,
  autoSizerClassName,
  ...props
}: ScrollAreaContainerProps) => {
  const scrollAreaProps = pickProps<PickedScrollAreaProps>(props, {
    asChild: '_pick_',
    dir: '_pick_',
    scrollHideDelay: '_pick_',
    type: '_pick_',
  });

  const autoSizerProps = pickProps<PickedAutoSizerProps>(props, {
    defaultHeight: '_pick_',
    defaultWidth: '_pick_',
    disableHeight: '_pick_',
    disableWidth: '_pick_',
  });

  const { children, className, ...rest } = omit(props, [
    ...Object.keys(scrollAreaProps),
    ...Object.keys(autoSizerProps),
  ]) as Omit<ScrollAreaContainerProps, keyof PickedScrollAreaProps>;

  return (
    <ScrollAreaContainerElement className={className} {...rest}>
      <AutoSizer
        className={twMerge(
          'bg-inherit rounded-[inherit] rounded-b-[inherit] rounded-t-[inherit]',
          autoSizerClassName
        )}
        {...autoSizerProps}
      >
        {({ width, height }) => (
          <ScrollAreaPrimitive.Root
            className={twMerge('bg-inherit', scrollAreaClassName)}
            {...scrollAreaProps}
            style={{ width, height, overflow: 'hidden' }}
          >
            {children}
            <ScrollBar />
            <ScrollAreaPrimitive.Corner />
          </ScrollAreaPrimitive.Root>
        )}
      </AutoSizer>
    </ScrollAreaContainerElement>
  );
};
