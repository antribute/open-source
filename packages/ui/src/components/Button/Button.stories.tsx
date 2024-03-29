import type { Meta, StoryObj } from '@storybook/react';
import { ButtonComponent } from 'components/Button/Button';
import { PresetButtonStoryVariants } from './preset-button-story-variants';
import type { ButtonProps } from '.';
import { Button } from '.';

const meta = {
  args: {},
  title: 'Input/Button',
  component: ButtonComponent,
} as Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

const variants = PresetButtonStoryVariants<ButtonProps>(Button);

export const Default: Story = {
  args: {},
  render: variants.Default,
};

export const Sizes: Story = {
  args: {},
  render: variants.SizeVariant,
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

export const Rounded: Story = {
  args: {},
  render: variants.RoundedVariant,
};

export const RoundedSize: Story = {
  args: {},
  render: variants.RoundedSize,
};

export const ContainedGradient: Story = {
  args: {},
  render: variants.ContainedGradientVariant,
};

export const Ghost: Story = {
  args: {},
  render: variants.GhostVariant,
};

export const ButtonIcon: Story = {
  args: {},
  render: () => {
    return (
      <Button fullWidth startIcon={<span className="i-fa6-brands-google" />}>
        Continue with Google
      </Button>
    );
  },
};
