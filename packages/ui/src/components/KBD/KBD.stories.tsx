import type { StoryObj } from '@storybook/react';
import { getSizeKeys } from 'utils/storybook-utils';
import { Flex } from 'components/Flex';
import { KBD } from './KBD';

const meta = {
  title: 'Misc/KBD',
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: () => (
    <Flex gap align="center">
      {getSizeKeys().map((size) => (
        <KBD size={size} keys={['⌘', 'S']} />
      ))}
    </Flex>
  ),
};
