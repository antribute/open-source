import type { Meta, StoryObj } from '@storybook/react';
import { SimpleList } from 'components/SimpleList';
import { useState } from 'react';
import { Paper } from 'components/Paper';
import { ReactQueryBuilder } from 'components/QueryBuilder/ReactQueryBuilder';
import { Button } from 'components/Button';
import {
  QueryBuilder,
  QueryBuilderField,
  QueryBuilderProvider,
  QueryBuilderRuleGroupType,
  QueryBuilderRuleGroupTypeIC,
} from '.';

const meta = {
  args: {},
  title: 'Input/QueryBuilder',
} satisfies Meta<typeof SimpleList.Root>;

export default meta;

const fields: QueryBuilderField[] = [
  { name: 'firstName', label: 'First Name' },
  { name: 'lastName', label: 'Last Name' },
];

const initialQuery: QueryBuilderRuleGroupType = {
  combinator: 'AND',
  rules: [
    { field: 'firstName', operator: 'beginsWith', value: 'Stev' },
    { field: 'lastName', operator: 'in', value: 'Vai,Vaughan' },
  ],
};

type Story = StoryObj<typeof meta>;

// export const Default: Story = {
//   args: {},
//   render: function QueryBuilderExample() {
//     const [query, setQuery] = useState(initialQuery);

//     return (
//       <div>
//         <QueryBuilderProvider>
//           <Paper className="w-screen max-w-7xl" border shadow>
//             <QueryBuilder
//               fields={fields}
//               query={query}
//               // showCombinatorsBetweenRules
//               // independentCombinators
//               onQueryChange={(q) => setQuery(q)}
//             />
//           </Paper>
//         </QueryBuilderProvider>
//       </div>
//     );
//   },
// };

export const Default: Story = {
  args: {},
  render: function QueryBuilderExample() {
    const [update, setUpdate] = useState(0);
    return (
      <>
        {' '}
        <Button
          onClick={() => {
            console.log(`${update}`);
            setUpdate(update + 1);
          }}
        >
          Click
        </Button>
        <ReactQueryBuilder />
      </>
    );
  },
};
