import { List } from 'components/List';
import { Avatar } from 'components/Avatar';
import { Detail } from 'components/Detail';
import { Flex } from 'components/Flex';
import { Text } from 'components/Text';
import { ListItemLinkProps } from 'components/List/ListItem/ListItemLink';
import { OptionalExceptFor } from 'types/typeUtilities';
import { capitalCase } from 'change-case';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { AntributeWordmark } from 'components/AntributeBrand/AntributeWordmark';
import { ThemeSwitcher } from 'components/ThemeSwitcher';
import { AppShell } from 'components/AppShell/AppShell';
import { StatusDot } from 'components/StatusDot';
import { appShellMockData } from 'components/AppShell/app-shell-mock-data';

export const MockAppShellDesktopSidebar = () => {
  return (
    <AppShell.DesktopSidebarArea>
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <AppShell.Sidebar>
        <AppShell.SidebarHeader>
          {/* <SidebarBrandImage /> */}
          <AntributeWordmark
            className="flex justify-center w-full xl:justify-start"
            wordmarkClassName="lg:hidden xl:block"
          />
        </AppShell.SidebarHeader>
        <AppShell.SidebarNavigation>
          {/* <SidebarList role="list"></SidebarList> */}
          <MockStaticSideBar />
        </AppShell.SidebarNavigation>
      </AppShell.Sidebar>
    </AppShell.DesktopSidebarArea>
  );
};

export const NavBarMock = () => {
  return (
    <AppShell.StickyNavBar>
      <Flex gap justify="between" align="center" className="w-full px-8">
        <div className="max-w-344 w-full">
          <Input
            leadingIcon={
              <AppShell.Icon className="i-heroicons-magnifying-glass-20-solid h-16 w-16" />
            }
            placeholder="Search"
            roundedFull
            fullWidth
            className="border-highlight"
            size="sm"
          />
        </div>
        <ThemeSwitcher size="sm" />
      </Flex>
    </AppShell.StickyNavBar>
  );
};

export const MainMock = () => {
  return (
    <AppShell.Main>
      <AppShell.Header>
        <Text.Subheading className="pl-40">Deployments</Text.Subheading>
      </AppShell.Header>
      <DeploymentsList />
    </AppShell.Main>
  );
};

export const ActivityFeedMock = () => {
  return (
    <AppShell.ActivityFeed>
      <AppShell.Header>
        <Text.Subheading>Activity</Text.Subheading>
      </AppShell.Header>
    </AppShell.ActivityFeed>
  );
};

// function MockAppExample() {
//   return (
//     <>
//       <div>
//         <AppShell.PageBackgroundColor />
//         {/* <PageBackgroundBottom>

//         </PageBackgroundBottom> */}

//         <AppShell.Frame />
//         {/* Static sidebar for desktop */}

//         <MockAppShellDesktopSidebar />
//         <AppShell.Container className="pt-16">
//           {/* Sticky search header */}
//           <NavBarMock />

//           <MainMock />

//           <ActivityFeedMock />
//         </AppShell.Container>
//       </div>
//     </>
//   );
// }

export const ResponsiveSidebarItem = ({
  startIcon,
  label,
  responsiveTooltip,
  ...props
}: { responsiveTooltip?: React.ReactNode } & OptionalExceptFor<ListItemLinkProps, 'label'>) => {
  return (
    <>
      <List.LinkItem {...props} className="hidden lg:hidden xl:block">
        <Flex gap className="gap-x-10" align="center">
          <div>{startIcon}</div>
          <div className="leading-none">{label}</div>
        </Flex>
      </List.LinkItem>

      <List.LinkItem
        tooltip={responsiveTooltip ?? label}
        tooltipProps={{ side: 'right', delayDuration: 0, sideOffset: 3 }}
        {...props}
        className="hidden lg:block lg:!rounded-none xl:hidden"
      >
        <Flex gap className="justify-center">
          {startIcon}
        </Flex>
      </List.LinkItem>
    </>
  );
};

export const MockStaticSideBar = () => {
  return (
    <List.Container roundedItems>
      {appShellMockData.navigation.map((item) => (
        <ResponsiveSidebarItem
          startIcon={
            <Avatar
              className="text-current bg-transparent"
              avatarNode={<item.icon />}
              label={item.name}
              color="default"
              size="inlineMd"
            />
          }
          label={item.name}
          highlight={item.current}
          inactive={!item.current}
        />
      ))}
      <List.Spacing />
      <List.SectionTitle className="opacity-0 xl:opacity-100 whitespace-nowrap">
        Your Teams
      </List.SectionTitle>
      {appShellMockData.teams.map((item) => (
        <ResponsiveSidebarItem
          startIcon={
            <Avatar
              // className="text-current"
              label={item.name}
              size="xs"
              rounded={false}
              // color="alternate"
              border="thin"
            />
          }
          label={item.name}
          highlight={item.current}
          inactive={!item.current}
          responsiveTooltip={
            <div>
              <Text.Overline size="xs" leading="xs">
                Team
              </Text.Overline>
              <div>{item.name}</div>
            </div>
          }
        />
      ))}
    </List.Container>
  );
};

const DeploymentsList = () => {
  return (
    <List.Container role="list" divide>
      {appShellMockData.deployments.map(
        ({ teamName, environment, projectName, description, deploymentTime, status, href, id }) => {
          const statusColor = appShellMockData.statuses[status].color;
          return (
            <List.LinkItem key={id} href={href}>
              <Detail
                startTitle={<StatusDot color={statusColor} />}
                title={
                  <Flex gap as="span" className="flex gap-x-10">
                    <Text> {teamName}</Text> <Text color="subtle">/</Text>
                    <Text color="moderate"> {projectName}</Text>
                  </Flex>
                }
                end={
                  <Button fullWidth rounded variant="glass" color={statusColor} size="sm">
                    {capitalCase(environment)}
                  </Button>
                }
                description={
                  <Flex gap as="span" align="center">
                    <Text>{description}</Text>
                    <Text.Dot size="sm" />
                    <Text>Deployed {deploymentTime}</Text>
                  </Flex>
                }
              />
            </List.LinkItem>
          );
        }
      )}
    </List.Container>
  );
};
