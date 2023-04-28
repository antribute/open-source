import type { Meta, StoryObj } from '@storybook/react';

import { Dialog } from 'components/Dialog';
import { Avatar } from 'components/Avatar/Avatar';
import { Text } from 'components/Text';
import { generateMockUserList } from 'mock/mock-data';
import { RenderPaperContainers, getSizeKeys } from 'utils/storybook-utils';

import { AvatarGroup } from '.';

const meta = {
  args: {},
  title: 'Display/Avatar Group',
  component: AvatarGroup.Root,
} satisfies Meta<typeof AvatarGroup.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

const users = generateMockUserList({ size: 30 });

export const Default: Story = {
  args: {},
  render: () => (
    <div className="flex flex-wrap items-center gap-16">
      <AvatarGroup.Root>
        {users.map(({ name }) => (
          <AvatarGroup.Avatar label={name} />
        ))}
      </AvatarGroup.Root>
    </div>
  ),
};

export const Sizes: Story = {
  args: {},
  render: () => (
    <div className="space-y-32">
      {getSizeKeys().map((size) => (
        <div className="space-y-8">
          <Text color="moderate" size="sm">
            {size}
          </Text>
          <AvatarGroup.Root size={size} stacked>
            {users.map(({ name }) => (
              <AvatarGroup.Avatar label={name} />
            ))}
          </AvatarGroup.Root>
        </div>
      ))}
    </div>
  ),
};

export const Stacked: Story = {
  args: {},
  render: () => (
    <div className="flex flex-wrap items-center gap-16">
      <RenderPaperContainers className="flex items-center" renderTransparentPaper>
        <AvatarGroup.Root stacked>
          {users.map(({ name }) => (
            <AvatarGroup.Avatar label={name} />
          ))}
        </AvatarGroup.Root>
      </RenderPaperContainers>
    </div>
  ),
};

export const ManualTotal: Story = {
  args: {},
  render: () => (
    <div className="flex flex-wrap items-center gap-16">
      <AvatarGroup.Root totalCount={200} stacked>
        {users.map(({ name }) => (
          <AvatarGroup.Avatar label={name} />
        ))}
      </AvatarGroup.Root>
    </div>
  ),
};

export const WithDialog: Story = {
  args: {},
  render: () => (
    <Dialog.Root>
      <AvatarGroup.Root
        stacked
        additionalAvatarsIndicatorWrap={(children) => (
          <Dialog.Trigger className="rounded-full" asChild={false}>
            {children}
          </Dialog.Trigger>
        )}
      >
        {users.map(({ name }) => (
          <AvatarGroup.Avatar label={name} />
        ))}
      </AvatarGroup.Root>

      <Dialog.Content>
        <Dialog.Title>Members</Dialog.Title>
        <Dialog.BodySection className="gap-y-18 grid grid-cols-3 gap-x-24">
          {users.map(({ name, email }) => (
            <div className="flex shrink-0 items-center gap-8">
              <Avatar label={name} enableTooltip={false} />
              <div className=" ">
                <Text size="sm" as="div" color="high">
                  {name}
                </Text>
                <Text as="div" size="sm" color="weak">
                  {email}
                </Text>
              </div>
            </div>
          ))}
        </Dialog.BodySection>
      </Dialog.Content>
    </Dialog.Root>
  ),
};
