import { createCtx } from 'utils/createContext';
import type { ReactTable } from './Table.types';

export interface TableContext {
  table: ReactTable;
}

export const { useContext: useTableContext, Provider: TableProvider } = createCtx<TableContext>();
