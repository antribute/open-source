import type { Meta, StoryObj } from '@storybook/react';
import { RenderColorVariants, RenderSizeVariants } from 'utils/storybook-utils';
import { useState } from 'react';

import { StatusBadge } from './StatusBadge';

const meta = {
  args: {},
  title: 'Input/StatusBadge',
  component: StatusBadge,
} satisfies Meta<typeof StatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: () => <RenderColorVariants Component={StatusBadge} props={{ children: 'Default' }} />,
};

export const Outlined: Story = {
  args: {},
  render: () => (
    <RenderColorVariants
      Component={StatusBadge}
      props={{ children: 'Default', variant: 'outlined' }}
    />
  ),
};

export const Discard: Story = {
  args: {},
  render: () => {
    const initialStatuses = ['Pending', 'Cleared', 'Archived', 'In Progress'];
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [statuses, setStatuses] = useState(initialStatuses);

    const canReset = statuses.length !== initialStatuses.length;

    return (
      <div className="space-x-8">
        <StatusBadge
          color="neutral"
          onClick={() => {
            setStatuses(initialStatuses);
          }}
          disabled={!canReset}
        >
          Reset
        </StatusBadge>
        {statuses.map((status) => (
          <StatusBadge
            key={status}
            onDiscard={() => {
              const filtered = statuses.filter((e) => e !== status);
              setStatuses(filtered);
            }}
          >
            {status}
          </StatusBadge>
        ))}
      </div>
    );
  },
};

export const Sizes: Story = {
  args: {},
  render: () => <RenderSizeVariants Component={StatusBadge} props={{ children: 'Default' }} />,
};
