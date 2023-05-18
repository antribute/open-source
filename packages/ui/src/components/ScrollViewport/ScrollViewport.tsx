import { forwardRef } from 'react';
import { classed } from 'utils/classed';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { ScrollBar } from 'components/ScrollViewport/ScrollBar';
import { ScrollAreaContainer, ScrollAreaContainerProps } from './ScrollAreaContainer';

const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaContainerProps>(
  ({ children, ...props }, forwardedRef) => {
    return (
      <ScrollAreaPrimitive.Root {...props} className="overflow-hidden grow">
        <ScrollAreaPrimitive.Viewport className="h-full w-full" ref={forwardedRef}>
          {children}
        </ScrollAreaPrimitive.Viewport>
        <ScrollBar />
      </ScrollAreaPrimitive.Root>
    );
  }
);

const ScrollAreaViewport = classed(ScrollAreaPrimitive.Viewport, 'w-full h-full');
const Container = classed('div', 'grow flex flex-col');
const HeaderSection = classed('div', 'shrink-0');
const FooterSection = classed('div', 'shrink-0');

export {
  Container,
  HeaderSection,
  FooterSection,
  ScrollArea,
  ScrollAreaViewport,
  ScrollAreaContainer,
};
