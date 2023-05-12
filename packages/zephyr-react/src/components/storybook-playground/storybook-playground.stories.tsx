import type { StoryObj } from '@storybook/react';
import { StoryFn, Meta } from '@storybook/react';
import { Avatar } from 'components/Avatar';
import { Detail } from 'components/Detail';
import { Flex } from 'components/Flex';
import { Paper } from 'components/Paper';
import { generateMockUserList } from 'mock/mock-data';

const CenterStoryDecorator = (Story: StoryFn) => {
  return (
    <div className="pt-[20vh] w-screen fixed h-full">
      <Story />
    </div>
  );
};

const meta: Meta = {
  args: {},
  title: 'Storybook Playground',

  decorators: [CenterStoryDecorator],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: () => <Flex />,
};

export const ContainerQueries: Story = {
  args: {},
  render: () => (
    <div className="grid grid-cols-3 w-full  gap-x-16">
      {generateMockUserList({ size: 3 }).map(({ name, avatarUrl, aboutMe }) => (
        <Paper className=" w-full">
          {/* <div className="lg:opacity-50">{aboutMe}</div> */}
          <Detail
            startTitle={<Avatar size="md" src={avatarUrl} label={name} />}
            title={name}
            description={aboutMe}
          />
        </Paper>
      ))}
    </div>
  ),
};
