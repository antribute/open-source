import { classed } from 'utils/classed';
import { PanelGroup as PanelGroupPrimitive } from 'react-resizable-panels';
import React, { forwardRef } from 'react';

type PanelGroupElementProps = React.ComponentProps<typeof PanelGroupElement>;

const PanelGroupElement = classed(PanelGroupPrimitive, '');

export type PanelGroupProps = PanelGroupElementProps;

export const PanelGroup = forwardRef<HTMLElement, PanelGroupProps>(
  ({ children, direction, ...props }) => {
    return (
      <PanelGroupElement direction={direction} {...props}>
        {children}
      </PanelGroupElement>
    );
  }
);
