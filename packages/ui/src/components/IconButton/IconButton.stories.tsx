import BoltIcon from '@heroicons/react/24/solid/BoltIcon';
import type { Meta, StoryObj } from '@storybook/react';

import { PresetButtonStoryVariants } from 'components/Button/preset-button-story-variants';
import { IconButton, IconButtonProps } from 'components/IconButton/IconButton';

const meta = {
  args: {},
  title: 'Input/IconButton',
  component: IconButton,
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

const variants = PresetButtonStoryVariants<IconButtonProps>(IconButton, {
  props: { children: <BoltIcon className="text-current" /> },
  noDefaultChildren: true,
});

export const Default: Story = {
  args: {},
  render: variants.Default,
};

export const Contained: Story = {
  args: {},
  render: variants.ContainedVariant,
};

export const Outlined: Story = {
  args: {},
  render: variants.OutlinedVariant,
};

export const OutlinedRounded: Story = {
  args: {},
  render: variants.OutlinedRoundedVariant,
};

export const Glass: Story = {
  args: {},
  render: variants.GlassVariant,
};

export const Text: Story = {
  args: {},
  render: variants.TextVariant,
};

export const Size: Story = {
  args: {},
  render: variants.SizeVariant,
};

export const Rounded: Story = {
  args: {},
  render: variants.RoundedVariant,
};

export const ContainedGradient: Story = {
  args: {},
  render: variants.ContainedGradientVariant,
};

export const RoundedSize: Story = {
  args: {},
  render: variants.RoundedSize,
};

export const Ghost: Story = {
  args: {},
  render: variants.GhostVariant,
};
