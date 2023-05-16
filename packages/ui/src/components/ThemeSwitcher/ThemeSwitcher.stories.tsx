import type { Meta, StoryObj } from '@storybook/react';

import { ThemeSwitcher } from 'components/ThemeSwitcher/ThemeSwitcher';

const meta = {
  args: {},
  title: 'Layout/Theme Switcher',
  component: ThemeSwitcher,
} satisfies Meta<typeof ThemeSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: () => <ThemeSwitcher />,
};
