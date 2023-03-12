'use client';

/* eslint-disable react/prop-types */

import * as React from 'react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { classed, expandVariant } from 'utils/classed';
import { useImmer } from 'use-immer';
import { useRef } from 'react';
import { mergeRefs } from 'react-merge-refs';
import { interpolate, easeInOut } from 'framer-motion';

type ScrollAreaRootElementProps = React.ComponentProps<typeof ScrollAreaPrimitive.Root>;
const ScrollAreaRootElement = classed(
  ScrollAreaPrimitive.Root,
  'relative transition-all',
  'rounded-sm',
  'px-4',
  {
    variants: {
      maskGradientTop: {
        true: 'shadow-mask-gradient-top',
        false: '',
      },
      maskGradientBottom: {
        true: 'shadow-mask-gradient-bottom ring-',
        false: '',
      },
      offsetRim: {
        true: 'ring-1 ring-highlight-tint !shadow-[rgba(0,0,0,0.07)]',
      },
      hasOffset: {
        true: ' shadow-palette-black/5',
      },
      shadow: {
        true: '',
      },
    },
  },
  {
    defaultVariants: {
      shadow: true,
    },
  }
);

export type ScrollAreaProps = ScrollAreaRootElementProps;

interface ScrollData {
  scrollTop: number;
  scrollHeight: number;
  clientHeight: number;
}

const ScrollAreaViewportElement = classed(
  ScrollAreaPrimitive.Viewport,
  'h-full w-full rounded-[inherit]',
  {
    variants: {
      hasOffset: {
        true: 'shadow-mask-gradient-top-bottom',
      },
    },
  }
);

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaRootElement>,
  ScrollAreaProps
>(({ className, children, ...props }, forwardRef) => {
  const [scrollData, setScrollData] = useImmer<ScrollData | undefined>(undefined);

  const containerRef = useRef<HTMLDivElement>();
  const ref = mergeRefs([forwardRef, containerRef]);

  function updateScrollData(element: HTMLDivElement) {
    const { scrollTop, scrollHeight, clientHeight } = element;

    setScrollData(() => {
      return { scrollTop, scrollHeight, clientHeight };
    });
  }

  const { clientHeight = NaN, scrollHeight = NaN } = scrollData ?? {};

  const hasOffset = scrollHeight > clientHeight;

  const [scrollState, setScrollState] = useImmer<{ isBottom: boolean }>({ isBottom: false });

  function handleOnScroll(event: React.UIEvent<HTMLDivElement>) {
    const { currentTarget } = event;

    updateScrollData(currentTarget);
  }
  const scrollViewportRef = useRef<HTMLDivElement>(null);

  function getScrollOffset(): {
    isOffsetFromTop: boolean;
    isOffsetFromBottom: boolean;
    isBottom: boolean;
  } {
    if (!scrollData) {
      return { isOffsetFromTop: false, isOffsetFromBottom: false, isBottom: false };
    }

    const { clientHeight, scrollHeight, scrollTop } = scrollData;

    const maxThreshold = 15;

    const bottomDifference = scrollHeight - scrollTop;

    const scrollBottom = bottomDifference - clientHeight;

    const isBottom = clientHeight >= bottomDifference - 0.5;

    const isTop = scrollTop === 0;

    const isBetween = scrollTop > 0 && clientHeight < bottomDifference;

    const interpolated = interpolate([0, maxThreshold], [0, maxThreshold], {
      ease: easeInOut,
    });

    if (scrollState.isBottom !== isBottom) {
      setScrollState((draft) => {
        draft.isBottom = isBottom;
      });
    }

    const topVar = `${interpolated(scrollTop)}%`;
    const bottomVar = `${interpolated(scrollBottom)}%`;

    if (containerRef.current) {
      containerRef.current.style.setProperty('--shadow-threshold-top', topVar);
      containerRef.current.style.setProperty('--shadow-threshold-bottom', bottomVar);
    }

    return {
      isOffsetFromTop: hasOffset && (isBottom || isBetween) && !(isTop && isBottom),
      isOffsetFromBottom: hasOffset && (isTop || isBetween) && !(isTop && isBottom),
      isBottom,
    };
  }

  const { isOffsetFromTop, isOffsetFromBottom } = getScrollOffset();

  return (
    <ScrollAreaRootElement
      ref={ref}
      className={className}
      hasOffset={isOffsetFromTop}
      offsetRim={isOffsetFromTop && !scrollState.isBottom}
      {...props}
    >
      <ScrollAreaViewportElement
        hasOffset={isOffsetFromTop || isOffsetFromBottom}
        onScroll={(e) => handleOnScroll(e)}
        ref={scrollViewportRef}
      >
        {children}
      </ScrollAreaViewportElement>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaRootElement>
  );
});

ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

const ScrollBarElement = classed(
  ScrollAreaPrimitive.ScrollAreaScrollbar,
  'flex touch-none select-none transition-colors',
  {
    variants: {
      orientation: {
        vertical: 'h-full w-12 border-l border-l-transparent p-[1px]',
        horizontal: 'h-8 border-t border-t-transparent p-[1px]',
      },
    },
  }
);

const ScrolllBarThumbElement = classed(
  ScrollAreaPrimitive.ScrollAreaThumb,
  'bg-content-ghost relative flex-1 rounded-full overflow-hidden backdrop-contrast-100'
);

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollBarElement>
>(({ className, orientation = 'vertical', ...props }, ref) => (
  <ScrollBarElement ref={ref} orientation={orientation} {...props}>
    <ScrolllBarThumbElement />
  </ScrollBarElement>
));

ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };
