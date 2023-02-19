import { useTableContext } from 'components/Table/Table.context';
import { classed } from 'utils/classed';
import { Header } from '../Table.types';
import { renderHeader } from '../helpers';
import { BaseCellElement } from './BaseCellElement';

interface HeaderCellProps {
  header: Header;
}

const HeaderElement = classed(
  'th',
  BaseCellElement,
  'text-left py-8',
  'first:rounded-tl-lg last:rounded-tr-lg',
  'text-content-inverse-weak font-medium',
  {
    variants: {
      headerBackground: {
        true: 'dark:bg-surface-inverse-light',
      },
    },
    defaultVariants: {
      headerBackground: true,
    },
  }
);

export const HeaderCell = ({ header }: HeaderCellProps) => {
  const { table } = useTableContext();

  return (
    <HeaderElement colSpan={header.colSpan} style={{ width: header.getSize() }}>
      {renderHeader(header)}
    </HeaderElement>
  );
};
