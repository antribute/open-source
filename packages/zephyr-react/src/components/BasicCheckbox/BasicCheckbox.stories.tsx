import type { Meta, StoryObj } from '@storybook/react';
import { RenderSizeVariants } from 'utils/storybook-utils';

import { BasicCheckbox } from './BasicCheckbox';

const meta = {
  args: {},
  title: 'Input/BasicCheckbox',
  component: BasicCheckbox,
} satisfies Meta<typeof BasicCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: () => <RenderSizeVariants Component={BasicCheckbox} />,
};

export const Label: Story = {
  args: {},
  render: () => <RenderSizeVariants Component={BasicCheckbox} props={{ children: 'Label' }} />,
};
