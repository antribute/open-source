import { forwardRef, useRef } from 'react';
import { classed } from 'utils/classed';
import useDimensions from 'react-cool-dimensions';
import { mergeRefs } from 'react-merge-refs';

const TableContainerElement = classed('div', 'h-full w-full overflow-auto');
const BaseTableElement = classed('table', '');

type TableContainerElementProps = React.ComponentProps<typeof TableContainerElement>;

export const TableContainer = forwardRef<HTMLDivElement, TableContainerElementProps>(
  (props, forwardedRef) => {
    const { observe, width, height } = useDimensions();

    const localRef = useRef<HTMLDivElement>();

    console.log('HEIGHT', height);
    return (
      <div className="h-full w-full" ref={observe}>
        <TableContainerElement {...props} ref={forwardedRef} style={{ height }} />
      </div>
    );
  }
);
