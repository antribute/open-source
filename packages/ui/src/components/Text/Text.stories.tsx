import type { Meta, StoryObj } from '@storybook/react';

import { Text } from 'components/Text/Text';

const meta = {
  args: {},
  title: 'Display/Text',
  component: Text,
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: () => (
    <div className="flex flex-col gap-16">
      <Text>Text.Default</Text>
      <Text size="xs">Size: xs</Text>
      <Text size="sm">Size: sm</Text>
      <Text size="md">Size: md</Text>
      <Text size="lg">Size: lg</Text>

      <Text.H6>Text.H6</Text.H6>
      <Text.H5>Text.H5</Text.H5>
      <Text.H4>Text.H4</Text.H4>
      <Text.H3>Text.H3</Text.H3>
      <Text.H2>Text.H2</Text.H2>
      <Text.H1>Text.H1</Text.H1>

      <Text color="tint">Color: tint</Text>
      <Text color="ghost">Color: ghost</Text>
      <Text color="subtle">Color: subtle</Text>
      <Text color="weak">Color: weak</Text>
      <Text color="moderate">Color: moderate</Text>
      <Text color="high">Color: high</Text>
      <Text color="strong">Color: strong</Text>
      <Text color="intense">Color: intense</Text>

      <Text bold size="lg">
        Text.Bold
      </Text>
      <Text italic size="lg">
        Text.Italics
      </Text>
    </div>
  ),
};
