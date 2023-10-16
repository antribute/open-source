'use client';

import * as React from 'react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { classed } from 'utils/classed';

const ScrollBarElement = classed(
  ScrollAreaPrimitive.ScrollAreaScrollbar,
  'flex touch-none select-none transition-colors relative z-30',
  {
    variants: {
      orientation: {
        vertical: 'h-full w-12 border-l border-l-transparent p-[1.5px] animate-slide-left-fade',
        horizontal: 'h-8 border-t border-t-transparent p-[1.5px] animate-slide-up-fade',
      },
    },

    defaultVariants: {
      orientation: 'vertical',
    },
  }
);

const ScrolllBarThumbElement = classed(
  ScrollAreaPrimitive.ScrollAreaThumb,
  'bg-content-ghost relative flex-1 rounded-full overflow-hidden backdrop-contrast-100 min-h-[44px] transition-[height] will-change-[height]'
);

export const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollBarElement>
>(({ orientation = 'vertical', ...props }, ref) => (
  <ScrollBarElement ref={ref} orientation={orientation} {...props}>
    <ScrolllBarThumbElement />
  </ScrollBarElement>
));

ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;
