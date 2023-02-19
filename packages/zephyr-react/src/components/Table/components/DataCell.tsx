import { useTableContext } from 'components/Table/Table.context';
import { classed } from 'utils/classed';
import { Cell, Header } from '../Table.types';
import { renderCell, renderHeader } from '../helpers';
import { BaseCellElement } from './BaseCellElement';

const DataCellElement = classed('td', BaseCellElement);

interface DataCellProps {
  cell: Cell;
}

export const DataCell = ({ cell }: DataCellProps) => {
  const { table } = useTableContext();

  return <DataCellElement height="64px">{renderCell(cell)}</DataCellElement>;
};
