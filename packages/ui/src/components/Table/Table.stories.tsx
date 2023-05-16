/* eslint-disable no-console */
import type { Meta, StoryObj } from '@storybook/react';
import { UserMockData, generateMockUserList } from 'mock/mock-data';
import { useMemo } from 'react';
import { Paper } from 'components/Paper';
import { MockPageHeader } from 'storybook-utils/components/MockPageHeader';
import { Table } from './Table';
import { TableColumns } from './Table.types';

const meta = {
  args: {},
  title: 'Data/Table',
  component: Table,
} satisfies Meta<typeof Table>;

export default meta;

const users = generateMockUserList({ size: 300 });

export const Default: StoryObj = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const columns = useMemo<TableColumns<UserMockData>>(
      () => [
        // display({ id: 'placeholder-1', minSize: 10, maxSize: 10, size: 10 }),
        {
          accessorKey: 'id',
          size: 60,
          enableResizing: true,
          header: () => <div className="pl-80">ID</div>,
          cell: ({ getValue }) => <div className="pl-80">{getValue() as string}</div>,
        },
        {
          accessorKey: 'firstName',
          cell: (info) => info.getValue(),
          header: 'First Name',
        },
        {
          accessorFn: (row) => row.lastName,
          id: 'lastName',
          cell: (info) => info.getValue(),
          header: () => <span>Last Name</span>,
        },
        {
          accessorKey: 'role',
          header: () => <div className="pr-80">ID</div>,
          cell: ({ getValue }) => <div className="pr-80">{getValue() as string}</div>,
        },
      ],
      []
    );

    return (
      <div className="fixed left-0 top-0 flex flex-col h-screen  bg-surface">
        <MockPageHeader />

        <Table
          columns={columns}
          data={users}
          onRowClick={(data) => {
            console.log('data', data);
          }}
        />

        <Paper colorScheme="surface" className="shrink-0 noisy-surface-texture" rounded={false} />
      </div>
    );
  },
};
