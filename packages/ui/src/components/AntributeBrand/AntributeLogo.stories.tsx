import type { Meta, StoryObj } from '@storybook/react';

import { AntributeLogo } from './AntributeLogo';

const meta = {
  args: {},
  title: 'Brand/Antribute Logo',
  component: AntributeLogo,
} satisfies Meta<typeof AntributeLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { height: '40vh' },
};
