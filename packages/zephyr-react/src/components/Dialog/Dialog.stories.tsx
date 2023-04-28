import type { Meta, StoryObj } from '@storybook/react';
import { RenderPaperContainers } from 'utils/storybook-utils';

import { Dialog } from '.';

const meta = {
  args: {},
  title: 'Navigation/Dialog',
  component: Dialog.Root,
} satisfies Meta<typeof Dialog.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: () => (
    <RenderPaperContainers>
      <Dialog.Root>
        <Dialog.TriggerButton>Open</Dialog.TriggerButton>

        <Dialog.Content>
          <Dialog.TitleSection>
            <Dialog.Title>Dialog Title</Dialog.Title>
          </Dialog.TitleSection>
          <Dialog.BodySection>
            <Dialog.Description>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec placerat sem.
              Curabitur laoreet mattis odio eget posuere. Nam mauris urna, dapibus id tincidunt sed,
              tempus nec arcu. Etiam condimentum purus eget libero suscipit, ultrices elementum
              velit aliquam. Nunc in blandit dolor. Donec mauris mauris, pulvinar ut eros eget,
              consequat.
            </Dialog.Description>
          </Dialog.BodySection>
          <Dialog.FooterSection>
            <Dialog.CancelButton>Cancel</Dialog.CancelButton>
            <Dialog.Button>Confirm</Dialog.Button>
          </Dialog.FooterSection>
        </Dialog.Content>
      </Dialog.Root>
    </RenderPaperContainers>
  ),
};
