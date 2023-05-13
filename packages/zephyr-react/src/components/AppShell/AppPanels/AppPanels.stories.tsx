import { StoryObj, Meta } from '@storybook/react';
import { Paper } from 'components/Paper';
import { MockStaticSideBar } from 'components/AppShell/app-shell-mocks';
import { BreakpointKey, useBreakpoints } from 'hooks';
import { objectMap } from 'utils';
import { Panels } from './AppPanels';

const meta = {
  args: {},
  title: 'Layout/AppPanels',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<Record<string, never>>;

export default meta;

type Story = StoryObj<Record<string, never>>;

export const Default: Story = {
  args: {},
  render: () => {
    return <AppPanelsExample />;
  },
};

type PanelName = 'sidebar';

const panelSizeMap = {
  sidebar: {
    $lg: 5,
    $xl: 20,
  },
};

const usePanelSizes = () => {
  const breakpointMap = useBreakpoints();

  return objectMap(panelSizeMap, ({ key, value }) => {
    if (typeof value === 'number') {
      return [key, value];
    }

    const enabledSizeBreakpoints = Object.entries(value)
      .reverse()
      .filter((entry) => {
        const sizeBreakpoint = entry[0] as BreakpointKey;
        const enabled = breakpointMap[sizeBreakpoint];
        return enabled;
      }) as [BreakpointKey, number][];

    const firstEnabledBreakpoint = enabledSizeBreakpoints[0];

    const breakpointSize = firstEnabledBreakpoint?.[1];

    return [key, breakpointSize];
  }) as Record<PanelName, number | undefined>;
};

const SidebarPanel = (props: Record<string, never>) => {
  const panelSize = usePanelSizes();

  return (
    <Panels.Panel className="p-16" defaultSize={panelSize.sidebar} {...props}>
      <MockStaticSideBar />
    </Panels.Panel>
  );
};

const MainPanel = () => {
  return (
    <Panels.Panel>
      <Paper fullHeight>
        <Panels.PanelGroup direction="horizontal">
          <Panels.Panel>
            <Panels.PanelContent>Hello</Panels.PanelContent>
          </Panels.Panel>
          <Panels.Panel>
            <Panels.PanelContent>Hello</Panels.PanelContent>
          </Panels.Panel>
        </Panels.PanelGroup>
      </Paper>
    </Panels.Panel>
  );
};

const AppPanelsExample = () => {
  // const panelSize = usePanelSizes();
  return (
    <Panels className="w-full h-screen">
      <Panels.Flex direction="horizontal">
        <SidebarPanel />
        <MainPanel />
        {/* <Panels.Panel className="p-16" defaultSize={panelSize.sidebar} id="sidebar">
          <Paper fullHeight>
            <Panels.Flex direction="horizontal" resizeable>
              <Panels.Panel>
                <Panels.PanelContent>Hello</Panels.PanelContent>
              </Panels.Panel>
              <Panels.Panel>
                <Panels.PanelContent>Hello</Panels.PanelContent>
              </Panels.Panel>
            </Panels.Flex>
          </Paper>
        </Panels.Panel> */}
      </Panels.Flex>
    </Panels>
  );
};
