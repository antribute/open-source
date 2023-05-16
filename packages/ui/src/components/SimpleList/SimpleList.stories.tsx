import type { Meta, StoryObj } from '@storybook/react';

import { SimpleList } from 'components/SimpleList';
import { generateMockUserList } from 'mock/mock-data';

const meta = {
  args: {},
  title: 'Display/SimpleList',
  component: SimpleList.Root,
} satisfies Meta<typeof SimpleList.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

const users = generateMockUserList({ size: 15 });

export const Default: Story = {
  args: {},
  render: () => (
    <SimpleList.Root>
      {users.map((user) => (
        <SimpleList.Item className="list-disc">{user.name}</SimpleList.Item>
      ))}
    </SimpleList.Root>
  ),
};

export const NumberList: Story = {
  args: {},
  render: () => (
    <SimpleList.Root variant="numbers">
      {users.map((user) => (
        <SimpleList.Item>{user.name}</SimpleList.Item>
      ))}
    </SimpleList.Root>
  ),
};
