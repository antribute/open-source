import clsx from 'clsx';
import { classed, deriveClassed } from 'utils/classed';

const panelColor = clsx('bg-surface');

const frameColor = clsx('!bg-surface-dark noisy-surface-texture before:opacity-[0.0095]');

const PageBackgroundColor = classed(
  'div',
  '-z-50 fixed top-0 w-full h-screen bg-surface',
  frameColor
);

const DesktopSidebarArea = classed(
  'div',
  'hidden',
  'lg:w-narrowbar xl:w-sidebar',
  'lg:fixed lg:inset-y-0 lg:z-30 lg:flex lg:flex-col'
);

// Define Sidebar component
const Sidebar = classed(
  'div',
  'flex grow flex-col gap-y-5 overflow-y-auto  dark:bg-surface-soft  shadow-border-r',
  `shadow-none ${frameColor} pt-16 !bg-transparent` //
);

// Define Navigation component
const SidebarNavigation = classed('nav', 'flex flex-1 flex-col xl:px-12', 'mt-8');

// Define List component
const SidebarList = classed('ul', 'flex flex-1 flex-col gap-y-7');

// Define StickyNavBar component
const StickyNavBar = classed(
  'div',
  'h-navbar',
  'bg-surface',
  'shadow shadow-palette-various-gray-500/5 dark:shadow-palette-black/5',
  'sticky top-0 z-40',
  'flex shrink-0 items-center',
  'gap-x-12 px-8 sm:px-12 lg:px-8',
  'border-b border-highlight-subtle',
  'top-16 bg-transparent mr-8' // test
);

// Define Main component
const Main = classed('main', 'lg:pr-aside');

// Define Header component
const Header = classed(
  'header',
  'flex items-center justify-between border-b h-pageheader border-highlight-subtle px-8 py-8 sm:px-12 sm:py-12 lg:px-8'
);

// Define DeploymentList component
const DeploymentList = classed('ul', 'divide-y divide-white/5');

// Define ActivityFeed component
const ActivityFeed = classed(
  'aside',
  'bg-surface-soft lg:fixed lg:bottom-0 lg:right-0 lg:top-navbar lg:w-aside lg:overflow-y-auto lg:border-l lg:border-highlight-subtle',
  '!right-16 !bg-transparent mb-16 !top-80 rounded-br-lg' // test
);

const Container = classed(
  'div',
  'lg:pl-narrowbar xl:pl-sidebar'
  // 'bg-surface'
);

const IconElement = classed('svg', 'h-22 w-22 shrink-0');

const Icon = deriveClassed<typeof IconElement, React.ComponentProps<typeof IconElement>>(
  (props) => {
    return <IconElement aria-hidden="true" {...props} />;
  }
);

const SidebarHeader = classed(
  'div',
  'flex h-navbar shrink-0 items-center border-b-highlight-ghost border-b',
  'xl:px-28',
  'border-none' // test
);

const Frame = () => {
  return (
    <div className="fixed mx-auto -z-50 w-full h-full max-h-screen flex flex-col justify-between py-8 pl-16 lg:pl-narrowbar xl:pl-sidebar pr-8">
      <div
        className={clsx(
          'w-full h-full rounded-lg shadow-xl shadow-palette-black/5 ring-1 ring-inset ring-highlight-ghost',
          panelColor
        )}
      />
      {/* <div className="w-full bg-info h-120 rounded-b-[20px]" /> */}
    </div>
  );
};

const AppShellContainer = classed('div');

export const AppShell = Object.assign(AppShellContainer, {
  PageBackgroundColor,
  DesktopSidebarArea,
  Sidebar,
  SidebarNavigation,
  SidebarList,
  StickyNavBar,
  Main,
  Header,
  DeploymentList,
  ActivityFeed,
  Container,
  IconElement,
  Icon,
  SidebarHeader,
  Frame,
});
