import { flexRender } from '@tanstack/react-table';
import { Cell, Header, ReactTable } from 'components/Table/Table.types';

export function renderCell(cell: Cell) {
  return flexRender(cell.column.columnDef.cell, cell.getContext());
}

export function renderHeader(header: Header) {
  return flexRender(header.column.columnDef.header, header.getContext());
}

export function renderFooter(header: Header) {
  return flexRender(header.column.columnDef.footer, header.getContext());
}

export function getTableMeta(table: ReactTable) {
  return table.options.meta;
}
