/* eslint-disable @typescript-eslint/no-explicit-any */
import { StoryObj, Meta } from '@storybook/react';
import { Paper } from 'components/Paper';
import { MockStaticSideBar } from 'components/AppShell/app-shell-mocks';
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

const AppPanelsExample = () => {
  // const panelSize = usePanelSizes();
  return (
    <Panels className="w-full h-screen">
      <Panels.Group
        direction="horizontal"
        breakpoints={{
          sidebar: {
            $xs: 0,
            $md: 5,
            $xl: 20,
          },
        }}
      >
        {({ sizes }) => (
          <>
            <Panels.Item className="p-16" {...sizes.sidebar}>
              <MockStaticSideBar />
            </Panels.Item>
            <Panels.Item>
              <Paper fullHeight>
                <Panels.Group direction="horizontal">
                  <Panels.Item>
                    <Panels.PanelContent>Hello</Panels.PanelContent>
                  </Panels.Item>
                  <Panels.Item>
                    <Panels.PanelContent>Hello</Panels.PanelContent>
                  </Panels.Item>
                </Panels.Group>
              </Paper>
            </Panels.Item>
          </>
        )}

        {/* <Panels.Item className="p-16" defaultSize={panelSize.sidebar} id="sidebar">
          <Paper fullHeight>
            <Panels.Group direction="horizontal" resizeable>
              <Panels.Item>
                <Panels.Item.Content>Hello</Panels.Item.Content>
              </Panels.Panel>
              <Panels.Item>
                <Panels.Item.Content>Hello</Panels.Item.Content>
              </Panels.Panel>
            </Panels.Group>
          </Paper>
        </Panels.Panel> */}
      </Panels.Group>
    </Panels>
  );
};

const PanelCard = ({ name }: { name: string }) => {
  return <div className=" w-full h-full bg-surface-soft rounded-lg font-bold">{name}</div>;
};

export const PanelGroupExample = () => {
  // const {} = usePanelSizeBreakpoints({panelSizeMap: {
  //   panel1: {
  //     $lg: 300,
  //   }
  // }})
  return (
    <div className="fixed h-full w-full bg-base p-56">
      <Panels className="h-full">
        <Panels.Group
          direction="horizontal"
          resizeable
          breakpoints={{
            panel1: {
              $xs: 0.00001 as any,
              $sm: 10,
              $lg: 50,
            },
          }}
        >
          {({ sizes }) => {
            return (
              <>
                <Panels.Item {...sizes.panel1}>
                  <PanelCard name="Panel 1" />
                </Panels.Item>
                <Panels.Item>
                  <PanelCard name="Panel 2" />
                </Panels.Item>
              </>
            );
          }}
        </Panels.Group>
      </Panels>
    </div>
  );
};
