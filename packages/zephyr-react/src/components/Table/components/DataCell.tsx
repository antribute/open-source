import { classed } from 'utils/classed';
import { Cell } from '../Table.types';
import { renderCell } from '../helpers';
import { BaseCellElement } from './BaseCellElement';

const DataCellElement = classed('td', BaseCellElement);

interface DataCellProps {
  cell: Cell;
}

export const DataCell = ({ cell }: DataCellProps) => {
  return <DataCellElement height="64px">{renderCell(cell)}</DataCellElement>;
};
