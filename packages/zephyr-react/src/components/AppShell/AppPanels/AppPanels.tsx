import { IClassedComponent, classed, deriveClassed } from 'utils/classed';
import { PanelResizeHandle } from './PanelResizeHandler';
import { Panel, PanelContent } from './Panel';
import { PanelGroup } from './PanelGroup';
import { PanelFlex } from './PanelFlex';

// const containerClass = classed('div', 'w-full h-full flex flex-col gap-1');

// const topRowClass = classed('div', 'flex-0 text-center');

// const bottomRowClass = classed('div', 'flex-1');

// const panelClass = classed('div', 'flex flex-col');

// const panelContentClass = classed(
//   'div',
//   'w-full h-full bg-panel-background flex flex-row items-center justify-center overflow-hidden rounded-md'
// );

// const linkClass = classed('a', 'block text-link mb-2');

// const iconClass = classed(
//   'span',
//   'w-4 h-4 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2'
// );

type AppPanelContainerElementProps = IClassedComponent<typeof AppPanelContainerElement>;
const AppPanelContainerElement = classed('div', '');

const AppPanelsRoot = deriveClassed<
  typeof AppPanelContainerElement,
  AppPanelContainerElementProps['ComponentProps']
>((props, ref) => <AppPanelContainerElement {...props} ref={ref} />);

// Create a strongly typed typescript react component that can inject Props into its `Panel` children.
// Keep in mind that the

const SubComponents = {
  Panel,
  PanelGroup,
  PanelContent,
  ResizeHandle: PanelResizeHandle,
  Flex: PanelFlex,
};

const Panels = Object.assign(AppPanelsRoot, SubComponents);

export { Panels };
