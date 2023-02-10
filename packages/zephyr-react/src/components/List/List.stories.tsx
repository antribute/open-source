import HomeIcon from '@heroicons/react/24/outline/HomeIcon';
import UsersIcon from '@heroicons/react/24/outline/UsersIcon';
import CalendarIcon from '@heroicons/react/24/outline/CalendarIcon';
import Square2StackIcon from '@heroicons/react/24/outline/Square2StackIcon';
import Cog6ToothIcon from '@heroicons/react/24/outline/Cog6ToothIcon';
import CreditCardIcon from '@heroicons/react/24/outline/CreditCardIcon';
import EyeIcon from '@heroicons/react/24/outline/EyeIcon';
import { NavMenuExample } from 'components/NavigationMenu/NavigationMenu.stories';
import { getStoryUrl } from 'utils/storybook-utils';
import { List } from '.';

export const Default = () => {
  const href = getStoryUrl();

  return (
    <>
      <NavMenuExample />

      <List.Container className="fixed left-0 top-0 h-full w-400" as="aside">
        <List.LinkItem href={href} label="Dashboard" startIcon={<HomeIcon />} highlight />
        <List.CollapsibleItem label="Users" startIcon={<UsersIcon />}>
          <List.LinkItem href={href} label="Jacob B." />
          <List.LinkItem href={href} label="Ryan C." />
          <List.LinkItem href={href} label="Kara H." />
        </List.CollapsibleItem>
        <List.CollapsibleItem label="Projects" startIcon={<Square2StackIcon />}>
          <List.LinkItem href={href} label="Project 1" />
          <List.LinkItem href={href} label="Project 2" />
          <List.LinkItem href={href} label="Project 3" />
        </List.CollapsibleItem>
        <List.LinkItem href={href} label="Calendar" startIcon={<CalendarIcon />} />
        <List.Spacing />
        <List.SectionTitle>Settings</List.SectionTitle>
        <List.LinkItem href={href} label="Account Settings" startIcon={<Cog6ToothIcon />} />
        <List.LinkItem href={href} label="Billing" startIcon={<CreditCardIcon />} />
        <List.LinkItem href={href} label="Appearance" startIcon={<EyeIcon />} />
      </List.Container>
    </>
  );
};
