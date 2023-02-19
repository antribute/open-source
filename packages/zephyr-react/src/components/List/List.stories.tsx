import DashboardIcon from '@heroicons/react/24/outline/HomeIcon';
import ProfileIcon from '@heroicons/react/24/outline/UsersIcon';
import CalendarIcon from '@heroicons/react/24/outline/CalendarIcon';
import ProjectsIcon from '@heroicons/react/24/outline/Square2StackIcon';
import SettingsIcon from '@heroicons/react/24/outline/Cog6ToothIcon';
import BillingIcon from '@heroicons/react/24/outline/CreditCardIcon';
import AppearanceIcon from '@heroicons/react/24/outline/EyeIcon';
import MessagesIcon from '@heroicons/react/24/outline/ChatBubbleLeftIcon';
import DownloadIcon from '@heroicons/react/24/outline/FolderArrowDownIcon';
import { getStoryUrl } from 'utils/storybook-utils';
import { Paper } from 'components/Paper';
import { List } from '.';

export const Default = () => {
  const href = getStoryUrl();

  return (
    <Paper className="fixed left-0 top-0 h-full w-400">
      <List.Container roundedItems>
        <List.LinkItem href={href} label="Dashboard" startIcon={<DashboardIcon />} highlight />
        <List.CollapsibleItem
          label="Users"
          startIcon={<ProfileIcon />}
          aria-controls="dropdown-sales"
          data-collapse-toggle="dropdown-sales"
          containerProps={{ id: 'dropdown-sales' }}
          className="focus:outline-none focus:ring"
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
        <List.LinkItem href={href} label="Appearance" startIcon={<AppearanceIcon />} />
      </List.Container>
    </Paper>
  );
};

export const ListGroup = () => {
  return (
    <Paper padding="none" border>
      <List.Container divide>
        <List.LinkItem label="Profile" />
        <List.LinkItem label="Settings" />
        <List.LinkItem label="Messages" />
        <List.LinkItem label="Download" />
        <List.LinkItem label="Organization Page" showExternalLinkIcon />
      </List.Container>
    </Paper>
  );
};
export const ListGroupDescriptions = () => {
  return (
    <Paper padding="none" border>
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
          showExternalLinkIcon
          description="Magna eu aliquip consectetur tempor labore officia."
        />
      </List.Container>
    </Paper>
  );
};

export const ListGroupAlignDescriptionWithLabel = () => {
  return (
    <Paper padding="none" border>
      <List.Container divide>
        <List.LinkItem
          label="Profile"
          startIcon={<ProfileIcon />}
          startIconMarker
          description="Voluptate sunt sit eu occaecat non id magna ipsum ad in qui."
        />
        <List.LinkItem
          label="Settings"
          startIcon={<SettingsIcon />}
          startIconMarker
          description="Deserunt laborum sit nulla qui proident culpa tempor reprehenderit duis cillum exercitation ex exercitation exercitation."
        />
        <List.LinkItem
          label="Messages"
          startIcon={<MessagesIcon />}
          startIconMarker
          description="Reprehenderit mollit et elit ea ex laborum officia tempor consequat voluptate adipisicing cupidatat magna."
        />
        <List.LinkItem
          label="Download"
          startIcon={<DownloadIcon />}
          startIconMarker
          description="Anim consectetur fugiat enim occaecat ipsum cupidatat Lorem officia esse ut."
        />
      </List.Container>
    </Paper>
  );
};

export const ListGroupNoGutters = () => {
  return (
    <Paper border className="w-240 ">
      <List.Container divide removeItemGutters>
        <List.Item label="Profile" className="pt-0" />
        <List.Item label="Settings" />
        <List.Item label="Messages" />
        <List.Item label="Download" className="pb-0" />
      </List.Container>
    </Paper>
  );
};

export const ListGroupZebra = () => {
  return (
    <Paper padding="none" border>
      <List.Container zebraItems divide>
        <List.LinkItem label="Profile" />
        <List.LinkItem label="Settings" />
        <List.LinkItem label="Messages" />
        <List.LinkItem label="Download" />
        <List.LinkItem label="Organization Page" showExternalLinkIcon />
      </List.Container>
    </Paper>
  );
};

export const ListGroupIcons = () => {
  return (
    <Paper padding="none" border>
      <List.Container divide>
        <List.LinkItem label="Profile" startIcon={<ProfileIcon />} />
        <List.LinkItem label="Settings" startIcon={<SettingsIcon />} />
        <List.LinkItem label="Messages" startIcon={<MessagesIcon />} />
        <List.LinkItem label="Download" startIcon={<DownloadIcon />} />
      </List.Container>
    </Paper>
  );
};
