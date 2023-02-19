import { classed } from 'utils/classed';

const TableBodyElement = classed('tbody', 'w-full h-full dark:divide-white/5');

type TableBodyElementProps = React.ComponentProps<typeof TableBodyElement>;

type TableBodyProps = {
  tablePadding?: {
    paddingTop: number;
    paddingBottom: number;
  };
} & Omit<TableBodyElementProps, 'as'>;

export const TableBody = ({ tablePadding, children, ...props }: TableBodyProps) => {
  const { paddingTop = 0, paddingBottom = 0 } = tablePadding ?? {};
  return (
    <TableBodyElement {...props}>
      {paddingTop > 0 && (
        <tr>
          <td style={{ height: `${paddingTop}px` }} />
        </tr>
      )}
      {children}
      {paddingBottom > 0 && (
        <tr>
          <td style={{ height: `${paddingBottom}px` }} />
        </tr>
      )}
    </TableBodyElement>
  );
};
