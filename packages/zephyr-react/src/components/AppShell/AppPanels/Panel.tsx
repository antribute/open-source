import { classed } from 'utils/classed';
import { Panel as PanelPrimitive, ImperativePanelHandle } from 'react-resizable-panels';
import { Paper } from 'components/Paper';
import { useEffect, useRef } from 'react';

type PanelElementProps = React.ComponentProps<typeof PanelElement>;

const PanelElement = classed(PanelPrimitive, 'flex flex-col');

const PanelContentElement = classed(Paper, 'w-full h-full overflow-hidden rounded-md');

export interface PanelProps extends PanelElementProps {
  id?: string;
}

const usePanelResizeSync = ({
  sizeProp,
  panelRef,
  minSize,
  maxSize,
}: {
  sizeProp: number | undefined | null;
  panelRef: React.MutableRefObject<ImperativePanelHandle | undefined>;
  currentSize?: number;
  minSize?: number;
  maxSize?: number;
}) => {
  panelRef.current?.getSize();
  useEffect(() => {
    panelRef.current?.collapse();
    // if (sizeProp === null) {
    //   panelRef.current?.collapse();
    // } else if (sizeProp !== undefined) {
    //   panelRef.current?.resize(sizeProp);
    // }
    // if (currentSize !== sizeProp && sizeProp !== null && sizeProp !== undefined) {
    //   const size = clamp(sizeProp, minSize ?? sizeProp, maxSize ?? sizeProp);

    //   console.log('SIZE', size);
    //   panelRef.current?.resize(size);
    // }
  }, [minSize, maxSize, sizeProp, panelRef]);
};

const Panel = ({ children, defaultSize, minSize, maxSize, ...props }: PanelProps) => {
  const panelRef = useRef<ImperativePanelHandle>();

  const currentSize = panelRef.current?.getSize();

  usePanelResizeSync({ sizeProp: defaultSize, minSize, maxSize, panelRef, currentSize });

  return (
    <PanelElement
      {...props}
      defaultSize={defaultSize}
      minSize={minSize}
      maxSize={maxSize}
      ref={panelRef as never}
    >
      {children}{' '}
    </PanelElement>
  );
};

const PanelContent = PanelContentElement;

export { Panel, PanelContent };
