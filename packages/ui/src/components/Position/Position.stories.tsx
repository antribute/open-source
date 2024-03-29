import type { Meta, StoryObj } from '@storybook/react';
import { Flex } from 'components/Flex';
import { Position } from 'components/Position/Position';
import type { PositionProp } from 'types/styles';

const meta = {
  args: {},
  title: 'Layout/Position',
  component: Position,
} satisfies Meta<typeof Position>;

export default meta;
type Story = StoryObj<typeof meta>;

const positionPropMap: Record<PositionProp, undefined> = {
  'top-center': undefined,
  'top-left': undefined,
  'top-right': undefined,
  'middle-center': undefined,
  'middle-left': undefined,
  'middle-right': undefined,
  'bottom-center': undefined,
  'bottom-left': undefined,
  'bottom-right': undefined,
};

const positions = Object.keys(positionPropMap) as PositionProp[];

export const Default: Story = {
  args: {},
  render: () => (
    <Flex centerAlign className="w-full h-screen pb-[20%]">
      <div className="h-400 w-400 bg-surface relative">
        {positions.map((position) => {
          return (
            <Position
              className="bg-surface-light text-content rounded-full p-px px-4 text-center text-xs"
              position={position}
            >
              {position}
            </Position>
          );
        })}
      </div>
    </Flex>
  ),
};
