import DashboardIcon from '@heroicons/react/24/outline/HomeIcon';
import ProfileIcon from '@heroicons/react/24/outline/UsersIcon';
import CalendarIcon from '@heroicons/react/24/outline/CalendarIcon';
import ProjectsIcon from '@heroicons/react/24/outline/Square2StackIcon';
import SettingsIcon from '@heroicons/react/24/outline/Cog6ToothIcon';
import BillingIcon from '@heroicons/react/24/outline/CreditCardIcon';
import AppearanceIcon from '@heroicons/react/24/outline/EyeIcon';
import MessagesIcon from '@heroicons/react/24/outline/ChatBubbleLeftIcon';
import DownloadIcon from '@heroicons/react/24/outline/FolderArrowDownIcon';
import type { Meta, StoryObj } from '@storybook/react';

import { RenderPaperContainers, getStoryUrl } from 'utils/storybook-utils';
import { Paper } from 'components/Paper';
import { capitalCase } from 'change-case';
import { List } from '.';

const meta = {
  args: {},
  title: 'Surface/List',
  component: List.Container,
} satisfies Meta<typeof List.Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MockSidebar = ({ color }: { color: string }) => {
  const href = getStoryUrl();
  return (
    <List.Container roundedItems>
      <List.LinkItem href={href} label="Dashboard" startIcon={<DashboardIcon />} highlight />
      <List.CollapsibleItem
        label="Users"
        startIcon={<ProfileIcon />}
        aria-controls="dropdown-sales"
        data-collapse-toggle="dropdown-sales"
        containerProps={{ id: 'dropdown-sales' }}
        type="button"
      >
        <List.LinkItem href={href} label="Jacob B." />
        <List.LinkItem href={href} label="Ryan C." />
        <List.LinkItem href={href} label="Kara H." />
      </List.CollapsibleItem>
      <List.CollapsibleItem label="Projects" startIcon={<ProjectsIcon />}>
        <List.LinkItem href={href} label="Project 1" />
        <List.LinkItem href={href} label="Project 2" />
        <List.LinkItem href={href} label="Project 3" />
      </List.CollapsibleItem>
      <List.LinkItem href={href} label="Calendar" startIcon={<CalendarIcon />} />
      <List.Spacing />
      <List.SectionTitle>Settings</List.SectionTitle>
      <List.LinkItem href={href} label="Account Settings" startIcon={<SettingsIcon />} />
      <List.LinkItem href={href} label="Billing" startIcon={<BillingIcon />} />
      <List.LinkItem href={href} label={`Appearance (${color})`} startIcon={<AppearanceIcon />} />
    </List.Container>
  );
};

export const Default: Story = {
  args: {},
  render: () => (
    <div className="grid h-5/6 w-full grid-cols-6 flex-wrap  gap-16">
      <RenderPaperContainers hasContainer={false} className="col-span-1 min-h-[70vh]">
        {({ colorScheme: color }) => <MockSidebar color={capitalCase(color ?? '')} />}
      </RenderPaperContainers>
    </div>
  ),
};

export const ListGroup: Story = {
  args: {},
  render: () => (
    <Paper padding={false} border="thin">
      <List.Container divide>
        <List.LinkItem label="Profile" />
        <List.LinkItem label="Settings" />
        <List.LinkItem label="Messages" />
        <List.LinkItem label="Download" />
        <List.LinkItem label="Organization" isExternalLink />
      </List.Container>
    </Paper>
  ),
};

export const ListGroupDescriptions: Story = {
  args: {},
  render: () => (
    <RenderPaperContainers padding={false}>
      <List.Container divide>
        <List.LinkItem
          label="Profile"
          description="Voluptate sunt sit eu occaecat non id magna ipsum ad in qui."
        />
        <List.LinkItem
          label="Settings"
          description="Deserunt laborum sit nulla qui proident culpa tempor reprehenderit duis cillum exercitation ex exercitation exercitation."
        />
        <List.LinkItem
          label="Messages"
          description="Reprehenderit mollit et elit ea ex laborum officia tempor consequat voluptate adipisicing cupidatat magna."
        />
        <List.LinkItem
          label="Download"
          description="Anim consectetur fugiat enim occaecat ipsum cupidatat Lorem officia esse ut."
        />
        <List.LinkItem
          label="Organization Page"
          isExternalLink
          href="https://google.com"
          description="Magna eu aliquip consectetur tempor labore officia."
        />
      </List.Container>
    </RenderPaperContainers>
  ),
};

export const ListGroupAlignDescriptionWithLabel: Story = {
  args: {},
  render: () => (
    <RenderPaperContainers padding={false} border="thin">
      <List.Container divide>
        <List.LinkItem
          label="Profile"
          startIcon={<ProfileIcon />}
          description="Voluptate sunt sit eu occaecat non id magna ipsum ad in qui."
        />
        <List.LinkItem
          label="Settings"
          startIcon={<SettingsIcon />}
          description="Deserunt laborum sit nulla qui proident culpa tempor reprehenderit duis cillum exercitation ex exercitation exercitation."
        />
        <List.LinkItem
          label="Messages"
          startIcon={<MessagesIcon />}
          description="Reprehenderit mollit et elit ea ex laborum officia tempor consequat voluptate adipisicing cupidatat magna."
        />
        <List.LinkItem
          label="Download"
          startIcon={<DownloadIcon />}
          description="Anim consectetur fugiat enim occaecat ipsum cupidatat Lorem officia esse ut."
        />
      </List.Container>
    </RenderPaperContainers>
  ),
};

export const ListGroupNoGutters: Story = {
  args: {},
  render: () => (
    <List.Container divide noItemGutters className="w-240">
      <List.Item label="Profile" className="pt-0" />
      <List.Item label="Settings" />
      <List.Item label="Messages" />
      <List.Item label="Download" className="pb-0" />
    </List.Container>
  ),
};

export const ListGroupZebra: Story = {
  args: {},
  render: () => (
    <RenderPaperContainers padding={false} border="thin">
      <List.Container zebraItems divide>
        <List.LinkItem label="Profile" />
        <List.LinkItem label="Settings" />
        <List.LinkItem label="Messages" />
        <List.LinkItem label="Download" />
        <List.LinkItem label="Organization" isExternalLink href="https://www.google.com" />
      </List.Container>
    </RenderPaperContainers>
  ),
};

export const HrefIndicator: Story = {
  args: {},
  render: () => (
    <RenderPaperContainers padding={false} border="thin" className="w-304">
      <List.Container divide>
        <List.LinkItem isExternalLink label="Profile" href="https://example.com/profile" />
        <List.LinkItem isExternalLink label="Settings" href="https://example.com/settings" />
        <List.LinkItem isExternalLink label="Messages" href="https://example.com/messages" />
        <List.LinkItem isExternalLink label="Download" href="https://example.com/download" />
        <List.LinkItem isExternalLink label="Organization" href="https://example.com/org" />
      </List.Container>
    </RenderPaperContainers>
  ),
};

export const ListGroupIcons: Story = {
  args: {},
  render: () => (
    <RenderPaperContainers padding={false} border="thin">
      <List.Container divide>
        <List.LinkItem label="Profile" startIcon={<ProfileIcon />} />
        <List.LinkItem label="Settings" startIcon={<SettingsIcon />} />
        <List.LinkItem label="Messages" startIcon={<MessagesIcon />} />
        <List.LinkItem label="Download" startIcon={<DownloadIcon />} />
      </List.Container>
    </RenderPaperContainers>
  ),
};
