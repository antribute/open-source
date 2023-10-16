import { classed } from 'utils/classed';
import type { Header } from '../Table.types';
import { renderHeader } from '../helpers';
import { BaseCellElement } from './BaseCellElement';

interface HeaderCellProps extends React.ComponentProps<typeof HeaderElement> {
  header: Header;
}

const HeaderElement = classed(
  'th',
  BaseCellElement,
  'text-left py-8 pb-14',
  'first:rounded-tl-lg last:rounded-tr-lg',
  'text-sm font-medium  font-body text-content-weak  tracking-wide',
  'relative',

  {
    variants: {},
    defaultVariants: {
      headerBackground: true,
    },
  }
);

export const HeaderCell = ({ header, style, ...props }: HeaderCellProps) => {
  return (
    <HeaderElement
      colSpan={header.colSpan}
      {...props}
      style={{ width: header.getSize(), ...style }}
    >
      {header.isPlaceholder ? null : renderHeader(header)}
    </HeaderElement>
  );
};
