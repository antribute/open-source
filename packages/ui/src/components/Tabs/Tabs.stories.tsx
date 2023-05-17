import type { Meta, StoryObj } from '@storybook/react';

import { Paper } from 'components/Paper';
import { generateMockVehicleList } from 'mock/mock-data';
import { RenderPaperContainers } from 'utils/storybook-utils';
import { Tabs } from '.';

const tabs2 = [
  { label: 'Account', value: 'account' },
  { label: 'Password', value: 'password' },
];
const tabs3 = [...tabs2, { label: 'Home', value: 'home' }];

const tabs4 = [...tabs3, { label: 'Projects', value: 'projects' }];

const tabs6 = [
  ...tabs4,
  { label: 'Password', value: 'passowrd' },
  { label: 'Billing', value: 'billing' },
];

const meta = {
  args: {},
  title: 'Navigation/Tabs',
  component: Tabs.Root,
} satisfies Meta<typeof Tabs.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: () => (
    <RenderPaperContainers border>
      <Tabs.Root defaultValue={tabs2[0]?.value}>
        <Tabs.List>
          {tabs2.map((e) => (
            <Tabs.Tab key={e.value} value={e.value}>
              {e.label}
            </Tabs.Tab>
          ))}
        </Tabs.List>

        <Tabs.ViewContainer>
          {tabs2.map((tab) => (
            <Tabs.View value={tab.value}>
              Tab View: <b>{tab.label}</b>
            </Tabs.View>
          ))}
        </Tabs.ViewContainer>
      </Tabs.Root>
    </RenderPaperContainers>
  ),
};

export const SixTabs: Story = {
  args: {},
  render: () => (
    <Paper border>
      <Tabs.Root defaultValue={tabs6[0]?.value}>
        <Tabs.List>
          {tabs6.map((e) => (
            <Tabs.Tab key={e.value} value={e.value}>
              {e.label}
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs.Root>
    </Paper>
  ),
};

export const DisabledTab: Story = {
  args: {},
  render: () => (
    <RenderPaperContainers>
      <Tabs.Root defaultValue={tabs6[0]?.value}>
        <Tabs.List>
          {tabs4.map((e, index, arr) => (
            <Tabs.Tab key={e.value} value={e.value} disabled={index === arr.length - 1}>
              {e.label}
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs.Root>
    </RenderPaperContainers>
  ),
};

export const Vertical: Story = {
  args: {},
  render: () => (
    <RenderPaperContainers containerClassName="grid grid-cols-3">
      <Tabs.Root orientation="vertical" defaultValue={tabs2[0]?.value}>
        <Tabs.List>
          {tabs2.map((e) => (
            <Tabs.Tab key={e.value} value={e.value}>
              {e.label}
            </Tabs.Tab>
          ))}
        </Tabs.List>
        <Tabs.ViewContainer>
          {tabs2.map((tab) => (
            <Tabs.View key={tab.value} value={tab.value}>
              Tab View: <b>{tab.label}</b>
            </Tabs.View>
          ))}
        </Tabs.ViewContainer>
      </Tabs.Root>
    </RenderPaperContainers>
  ),
};

const vehicles = generateMockVehicleList({ size: 20, uniqueBy: 'type' });

export const Overflow: Story = {
  args: {},
  render: () => (
    <Paper border className="max-w-screen-sm">
      <Tabs.Root>
        <Tabs.List>
          {vehicles.map(({ type }) => (
            <Tabs.Tab key={type} value={type}>
              {type}
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs.Root>
    </Paper>
  ),
};
