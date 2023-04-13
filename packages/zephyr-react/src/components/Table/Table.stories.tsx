/* eslint-disable no-console */
import type { Meta, StoryObj } from '@storybook/react';
import { UserMockData, generateMockUserList } from 'mock/mock-data';
import { useMemo } from 'react';
import { Paper } from 'components/Paper';
import { Table } from './Table';

import { TableColumns } from './Table.types';

const meta = {
  args: {},
  title: 'Data/Table',
  component: Table,
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const users = generateMockUserList({ size: 300 });

export const Default: Story = {
  args: {},
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const columns = useMemo<TableColumns<UserMockData>>(
      () => [
        {
          accessorKey: 'id',
          header: 'ID',
          size: 60,
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
          header: 'Role',
        },
      ],
      []
    );

    return (
      <Paper className="h-400" padding={false}>
        <Table
          columns={columns}
          data={users}
          onRowClick={(data) => {
            console.log('data', data);
          }}
        />
      </Paper>
    );
  },
};
