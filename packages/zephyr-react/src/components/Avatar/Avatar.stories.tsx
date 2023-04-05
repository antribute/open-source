import type { Meta, StoryObj } from '@storybook/react';
import { generateMockUserList } from 'mock/mock-data';

import { Avatar } from './Avatar';

const meta = {
  args: { label: '' },
  title: 'Display/Avatar',
  component: Avatar,
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

const users = generateMockUserList({ size: 300 });

export const Default: Story = {
  args: {},
  render: () => (
    <div className="flex items-center gap-16">
      {users.map(({ avatarUrl, name }) => (
        <Avatar src={avatarUrl} label={name} />
      ))}
    </div>
  ),
};

export const Initials: Story = {
  args: {},
  render: () => (
    <div className="flex items-center gap-16">
      {users.map(({ name }) => (
        <Avatar label={name} />
      ))}
    </div>
  ),
};
