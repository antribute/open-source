import type { Meta, StoryObj } from '@storybook/react';
import { RenderSizeVariants } from 'utils/storybook-utils';

import { Checkbox } from './Checkbox';

const meta = {
  args: {},
  title: 'Input/Checkbox',
  component: Checkbox,
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: () => <RenderSizeVariants Component={Checkbox} />,
};

export const Label: Story = {
  args: {},
  render: () => <RenderSizeVariants Component={Checkbox} props={{ label: 'Available' }} />,
};
