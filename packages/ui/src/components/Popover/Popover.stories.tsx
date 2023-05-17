import type { Meta, StoryObj } from '@storybook/react';

import { Button } from 'components/Button';
import { Popover } from 'components/Popover';

const meta = {
  args: {},
  title: 'Feedback/Popover',
  component: Popover.Root,
} satisfies Meta<typeof Popover.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: () => (
    <Popover.Root>
      <Popover.Trigger>
        <Button>Button</Button>
      </Popover.Trigger>
      <Popover.Content>Hello</Popover.Content>
    </Popover.Root>
  ),
};

export const KeepOpen: Story = {
  args: {},
  render: () => (
    <Popover.Root>
      <Popover.Trigger>
        <Button>Button</Button>
      </Popover.Trigger>
      <Popover.Content closeOnInteractOutside={false}>Persist</Popover.Content>
    </Popover.Root>
  ),
};
