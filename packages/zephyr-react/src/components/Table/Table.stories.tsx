/* eslint-disable no-console */
import { UserMockData, generateMockUserList } from 'mock/mock-data';
import { useMemo } from 'react';
import { Paper } from 'components/Paper';
import { Table } from './Table';

import { TableColumns } from './Table.types';

const users = generateMockUserList({ size: 300 });

export const Default = () => {
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
};
