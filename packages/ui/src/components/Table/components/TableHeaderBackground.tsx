import { classed } from 'utils/classed';
import { useEffect } from 'react';
import useDimensions from 'react-cool-dimensions';

export interface TableHeaderBackgroundProps extends TableHeaderBackgroundElementProps {
  headerElementRef: React.RefObject<HTMLTableSectionElement>;
}

/**
 * TableHeaderBackground
 *
 * Used to add a background for the table's header.
 * The header's background is a separate component so that we can:
 *
 * - Inherit the root table element's background color.
 *
 * - Add a bottom border below the table. The table header is sticky positioned so its
 *   bottom border vanished when when scrolling.
 *
 */
export const TableHeaderBackground = ({
  headerElementRef,
  ...props
}: TableHeaderBackgroundProps) => {
  const { observe, height } = useDimensions();

  useEffect(() => {
    observe(headerElementRef.current);
  }, [headerElementRef, observe]);

  return <TableHeaderBackgroundElement {...props} style={{ height }} />;
};

type TableHeaderBackgroundElementProps = React.ComponentProps<typeof TableHeaderBackgroundElement>;

const TableHeaderBackgroundElement = classed(
  'div',
  'absolute -top-px w-full z-20  border-b border-highlight bg-inherit',
  {
    variants: {
      filledHeaderBackground: {
        true: 'before-absolute-content before:bg-palette-various-gray-500/10',
      },
    },
  }
);
