import { useTableContext } from 'components/Table/Table.context';
import { getTableMeta } from 'components/Table/helpers';
import { classed } from 'utils/classed';
import React from 'react';
import { Row } from '../Table.types';

const DataRowElement = classed('tr', {
  variants: {
    clickable: {
      true: 'cursor-pointer dark:hover:bg-surface-inverse-soft',
    },
  },
});

type DataRowProps = {
  row: Row;
} & React.ComponentProps<typeof DataRowElement>;

export const DataRow = React.memo(({ row, ...props }: DataRowProps) => {
  const { table } = useTableContext();
  const { onRowClick } = getTableMeta(table) ?? {};

  const data = row.original;

  function handleRowClick() {
    onRowClick?.(data);
  }

  return (
    <DataRowElement
      clickable={Boolean(onRowClick)}
      onClick={() => {
        handleRowClick();
      }}
      {...props}
    />
  );
});
