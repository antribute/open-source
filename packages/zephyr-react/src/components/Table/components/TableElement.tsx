import { classed } from 'utils/classed';

const BaseTableElement = classed('table', 'table-fixed w-full border-spacing-0');

type TableElementProps = React.ComponentProps<typeof BaseTableElement>;

export const TableElement = (props: TableElementProps) => {
  return <BaseTableElement {...props} />;
};
