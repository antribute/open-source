import { generateMockUserList } from 'mock/mock-data';

import { Paper } from 'components/Paper';
import { Dialog } from 'components/Dialog';
import { Avatar } from 'components/Avatar/Avatar';
import { Text } from 'components/Text';
import { RenderSizeVariants, sizeKeys } from 'utils/storybook-utils';
import { AvatarGroup } from '.';

const users = generateMockUserList({ size: 30 });

export const Default = () => {
  return (
    <div className="flex flex-wrap items-center gap-16">
      <AvatarGroup.Root>
        {users.map(({ name }) => (
          <AvatarGroup.Avatar label={name} />
        ))}
      </AvatarGroup.Root>
    </div>
  );
};

export const Sizes = () => {
  return (
    // <div className="flex flex-wrap items-center gap-16">
    //   {sizeKeys().map(size => <AvatarGroup.Root key={size}>
    //     {users.map(({name})=><AvatarGroup.Avatar key={name} label={name} />)}
    //   </AvatarGroup.Root>)}
    // </div>
    <div className="space-y-32">
      {sizeKeys().map((size) => (
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
  );
};

export const ManualTotal = () => {
  return (
    <div className="flex flex-wrap items-center gap-16">
      <AvatarGroup.Root totalCount={200} stacked>
        {users.map(({ name }) => (
          <AvatarGroup.Avatar label={name} />
        ))}
      </AvatarGroup.Root>
    </div>
  );
};

export const AdditionalAvatarsDialog = () => {
  return (
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
        <Dialog.Body className="grid grid-cols-3 gap-y-18 gap-x-24">
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
        </Dialog.Body>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export const StackedAvatarGroup = () => {
  return (
    <div className="flex flex-wrap items-center gap-16">
      <AvatarGroup.Root stacked>
        {users.map(({ name }) => (
          <AvatarGroup.Avatar label={name} />
        ))}
      </AvatarGroup.Root>

      <Paper border>
        <AvatarGroup.Root stacked>
          {users.map(({ name, avatarUrl }) => (
            <AvatarGroup.Avatar src={avatarUrl} label={name} />
          ))}
        </AvatarGroup.Root>
      </Paper>
      <Paper color="neutral" border>
        <AvatarGroup.Root stacked border={false}>
          {users.map(({ name }) => (
            <AvatarGroup.Avatar label={name} />
          ))}
        </AvatarGroup.Root>
      </Paper>
    </div>
  );
};
