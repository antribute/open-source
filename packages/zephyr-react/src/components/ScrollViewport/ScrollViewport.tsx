import { forwardRef } from 'react';
import { classed } from 'utils/classed';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { ScrollAreaContainer, ScrollAreaContainerProps } from './ScrollAreaContainer';

const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaContainerProps>(
  ({ children, ...props }, forwardedRef) => {
    return (
      <ScrollAreaContainer {...props}>
        <ScrollAreaViewport ref={forwardedRef}>{children}</ScrollAreaViewport>
      </ScrollAreaContainer>
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
