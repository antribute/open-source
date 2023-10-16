import type { Meta, StoryObj } from '@storybook/react';
import type { UserMockData } from 'mock/mock-data';
import { generateMockUser, generateMockUserList } from 'mock/mock-data';

import { getAllSizeKeys } from 'utils/storybook-utils';
import { Paper } from 'components/Paper';
import { Flex } from 'components/Flex';
import { StatusBadge } from 'components/StatusBadge';
import { Detail } from 'components/Detail';
import { Button } from 'components/Button';
import { Avatar } from './Avatar';

const meta = {
  args: { label: '' },
  title: 'Display/Avatar',
  component: Avatar,
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

const users = generateMockUserList({ size: 300 });

export const Default: Story = {
  args: {},
  render: () => (
    <div className="flex items-center gap-16 flex-wrap">
      {users.map(({ avatarUrl, name }) => (
        <Avatar src={avatarUrl} label={name} tooltip={name} />
      ))}
    </div>
  ),
};

const MockAvatarDetailList = ({
  children,
  gap = 'md',
  size = 3,
}: {
  children: (options: UserMockData) => React.ReactNode;
  size?: number;
  gap?: string;
}) => {
  const users = generateMockUserList({ size });
  return (
    <Paper className="flex flex-col grow">
      <Flex gap={gap as never} dir="column" className="h-full justify-between" align="stretch">
        {users.map((data) => children(data))}
      </Flex>
    </Paper>
  );
};

export const AvatarWithDetails: Story = {
  args: {},
  render: () => {
    const user = generateMockUser({ seed: 1, id: 1 });
    return (
      <div className="grid grid-cols-3 gap-16 ">
        <MockAvatarDetailList size={4}>
          {({ name, avatarUrl }) => (
            <Avatar src={avatarUrl} size="inlineXs" label={name} details={{ title: name }} />
          )}
        </MockAvatarDetailList>
        <MockAvatarDetailList>
          {({ name }) => <Avatar label={name} details={{ title: name }} />}
        </MockAvatarDetailList>
        <MockAvatarDetailList>
          {({ name, avatarUrl, email }) => (
            <Avatar
              size="inlineXs"
              label={name}
              src={avatarUrl}
              details={{ avatarPositon: 'startTitle', title: name, description: email }}
            />
          )}
        </MockAvatarDetailList>
        <MockAvatarDetailList size={4}>
          {({ name, email }) => (
            <Avatar
              size="xs"
              label={name}
              details={{ avatarPositon: 'end', title: name, description: email }}
            />
          )}
        </MockAvatarDetailList>
        <MockAvatarDetailList gap="xl">
          {({ name, avatarUrl, sexType, role }) => (
            <Avatar
              size="inlineXs"
              label={name}
              src={avatarUrl}
              details={{
                avatarPositon: 'startTitle',
                title: name,
                subtitle: role,
                overline: role,
                endTitle: (
                  <StatusBadge size="xs" className="whitespace-nowrap">
                    {sexType}
                  </StatusBadge>
                ),
              }}
            />
          )}
        </MockAvatarDetailList>
        <MockAvatarDetailList gap="xl">
          {({ name, sexType, aboutMe }) => (
            <Avatar
              size="xs"
              label={name}
              details={{
                avatarPositon: 'startTitle',
                title: name,
                description: aboutMe,
                endTitle: (
                  <StatusBadge size="xs" className="whitespace-nowrap">
                    {sexType}
                  </StatusBadge>
                ),
              }}
            />
          )}
        </MockAvatarDetailList>

        <Paper>
          <Detail
            subheading={user.name}
            description="Reprehenderit et tempor sunt ex amet velit minim pariatur pariatur esse in. Consectetur laboris nisi labore nulla esse proident duis tempor adipisicing commodo sit veniam minim exercitation."
            // endSubheading={
            //   <Button variant="glass" size="xs" color="danger">
            //     View
            //   </Button>
            // }
            startOverline={
              <Button variant="glass" size="xs">
                Save
              </Button>
            }
            start={
              <Button variant="glass" size="xs">
                View
              </Button>
            }
            gapY="md"
            gapX="lg"
            overline={
              <Avatar
                size="xs"
                label={user.email}
                details={{
                  avatarPositon: 'end',

                  // className: 'whitespace-nowrap',
                  subtitle: user.role,
                  // description: user.aboutMe,
                  overline: (
                    <StatusBadge size="xs" className="whitespace-nowrap">
                      {user.sexType}
                    </StatusBadge>
                  ),
                }}
              />
            }
          />
        </Paper>
      </div>
    );
  },
};

export const LongLabel: Story = {
  args: {},
  render: () => {
    const { name } = generateMockUser({ id: 1 });
    return (
      <div className="flex items-center gap-16 flex-wrap">
        <Avatar label={name} truncateLabel={false} />
      </div>
    );
  },
};

export const Initials: Story = {
  args: {},
  render: () => (
    <div className="flex items-center gap-16">
      {users.map(({ name }) => (
        <Avatar label={name} />
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  args: {},
  render: () => (
    <div className="flex items-center gap-16 flex-wrap">
      {getAllSizeKeys().map((size) => (
        <Avatar label="Jared" size={size} />
      ))}
    </div>
  ),
};
