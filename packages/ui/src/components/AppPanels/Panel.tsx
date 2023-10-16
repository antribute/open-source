import { classed } from 'utils/classed';
import type { ImperativePanelHandle } from 'react-resizable-panels';
import { Panel as PanelPrimitive } from 'react-resizable-panels';
import { Paper } from 'components/Paper';
import { useEffect, useRef } from 'react';

type PanelElementProps = React.ComponentProps<typeof PanelElement>;

const PanelElement = classed(PanelPrimitive, 'flex flex-col', {
  variants: {
    collapsed: {
      true: 'opacity-0',
    },
  },
});

const PanelContentElement = classed(Paper, 'w-full h-full overflow-hidden rounded-md');

export const DEFAULT_MIN_PANEL_SIZE = 10;

export const PanelContent = PanelContentElement;

export interface PanelProps extends PanelElementProps {
  id?: string;
  size?: number;
}

export const PanelGroupItem = (props: PanelProps) => {
  const panelRef = useRef<ImperativePanelHandle>(null);

  const { minSize = DEFAULT_MIN_PANEL_SIZE, maxSize, defaultSize } = props;

  useEffect(() => {
    panelRef.current?.resize(minSize);
  }, [minSize]);

  return (
    <>
      <PanelElement
        minSize={minSize}
        maxSize={maxSize}
        defaultSize={defaultSize}
        collapsible
        {...props}
        ref={panelRef as never}
      >
        {props.children}
      </PanelElement>
    </>
  );
};
