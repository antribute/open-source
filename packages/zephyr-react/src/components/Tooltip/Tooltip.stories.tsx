import type { Meta, StoryObj } from '@storybook/react';

import { Button } from 'components/Button';
import { Tooltip } from './Tooltip';

const meta = {
  args: {},
  title: 'Feedback/Tooltip',
  component: Tooltip,
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: <Button>Hover Me</Button>, tooltip: 'Hello' },
};
