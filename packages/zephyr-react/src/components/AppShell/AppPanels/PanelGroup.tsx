import { classed } from 'utils/classed';
import { PanelGroup as PanelGroupPrimitive } from 'react-resizable-panels';
import React from 'react';
import { forwardRef } from 'react';

type PanelGroupElementProps = React.ComponentProps<typeof PanelGroupElement>;

const PanelGroupElement = classed(PanelGroupPrimitive, '');

export interface PanelGroupProps extends PanelGroupElementProps {}

export const PanelGroup = forwardRef<HTMLElement, PanelGroupProps>(
  ({ children, direction, ...props }) => {
    return (
      <PanelGroupElement direction={direction} {...props}>
        {children}
      </PanelGroupElement>
    );
  }
);
