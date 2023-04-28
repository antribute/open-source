import type { Meta, StoryObj } from '@storybook/react';

import { Spinner } from 'components/Spinner/Spinner';
import { RenderColorVariants, RenderSizeVariants } from 'utils/storybook-utils';

const meta = {
  args: {},
  title: 'Display/Spinner',
  component: Spinner,
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: () => <RenderColorVariants Component={Spinner} />,
};

export const Sizes: Story = {
  args: {},
  render: () => <RenderSizeVariants Component={Spinner} />,
};
