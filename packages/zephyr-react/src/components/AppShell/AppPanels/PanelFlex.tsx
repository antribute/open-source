import { PanelResizeHandle } from 'components/AppShell/AppPanels/PanelResizeHandler';
import React from 'react';
import { PanelGroup, PanelGroupProps as PrimitivePanelGroupProps } from 'react-resizable-panels';

interface PanelFlexProps extends PrimitivePanelGroupProps {
  resizeable?: boolean;
}

export const PanelFlex = ({ children, resizeable, direction, ...props }: PanelFlexProps) => {
  const row = React.Children.toArray(children).flatMap((child, index, arr) => {
    if (resizeable && index !== arr.length - 1) {
      return [child, <PanelResizeHandle direction={direction} />];
    }
    return child;
  });

  return (
    <PanelGroup direction={direction} {...props}>
      {row}
    </PanelGroup>
  );
};
