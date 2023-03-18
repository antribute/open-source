import { forwardRef } from 'react';
import { classed } from 'utils/classed';
import useDimensions from 'react-cool-dimensions';

const TableContainerElement = classed('div', 'h-full w-full overflow-auto');

type TableContainerElementProps = React.ComponentProps<typeof TableContainerElement>;

export const TableContainer = forwardRef<HTMLDivElement, TableContainerElementProps>(
  (props, forwardedRef) => {
    const { observe } = useDimensions();

    return (
      <div className="h-full w-full py-16" ref={observe}>
        <TableContainerElement {...props} ref={forwardedRef} className="h-400" />
      </div>
    );
  }
);
