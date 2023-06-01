import type { StoryObj } from '@storybook/react';
import { FullPage } from './Page';

const meta = {
  title: 'Layout/Page',
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: () => (
    <FullPage>
      <FullPage.HeaderSection>
        <FullPage.Heading>Dashboard</FullPage.Heading>
      </FullPage.HeaderSection>
    </FullPage>
  ),
};
