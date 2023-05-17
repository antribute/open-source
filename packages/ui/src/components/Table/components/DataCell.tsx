import { classed } from 'utils/classed';
import React, { ComponentProps } from 'react';
import { Cell } from '../Table.types';
import { renderCell } from '../helpers';
import { BaseCellElement } from './BaseCellElement';

const DataCellElement = classed('td', 'relative text-sm font-regular font-body', BaseCellElement);

interface DataCellProps extends ComponentProps<typeof DataCellElement> {
  cell: Cell;
  className?: string;
}

export const DataCell = React.memo(
  ({ cell, children, height = '64px', ...props }: DataCellProps) => {
    return (
      <DataCellElement height={height} {...props}>
        {children}
        {renderCell(cell)}
      </DataCellElement>
    );
  }
);
