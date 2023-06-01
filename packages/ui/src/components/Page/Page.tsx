import { Text } from 'components/Text';
import { classed } from 'utils/classed';

// WIP

// Sub Components

const PageHeaderSectionEleemnt = classed('div', 'md:flex md:items-center md:justify-between');

const PageHeading = ({ children, ...props }: React.ComponentProps<typeof Text.Heading>) => (
  <div className="min-w-0 flex-1">
    <Text.Heading size="h3" {...props}>
      {children}
    </Text.Heading>
  </div>
);

const PageSubComponents = {
  HeaderSection: PageHeaderSectionEleemnt,
  Heading: PageHeading,
};

<div className="md:flex md:items-center md:justify-between">
  <div className="min-w-0 flex-1">
    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
      Back End Developer
    </h2>
  </div>
  <div className="mt-4 flex md:ml-4 md:mt-0">
    <button
      type="button"
      className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
    >
      Edit
    </button>
    <button
      type="button"
      className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      Publish
    </button>
  </div>
</div>;

//  Page Components - Page

const PageContainer = classed('div');

const Page = Object.assign(PageContainer, PageSubComponents);

//  Page Components - FullPage

const FullPageContainerElement = classed('div', 'mx-auto max-w-7xl px-4 sm:px-12 lg:px-16');

const FullPageContainerInnerElement = classed('div', 'mx-auto max-w-3xl');

const FullPageContainer = ({
  children,
  ...props
}: React.ComponentProps<typeof FullPageContainerElement>) => (
  <FullPageContainerElement {...props}>
    <FullPageContainerInnerElement>{children}</FullPageContainerInnerElement>
  </FullPageContainerElement>
);

const FullPage = Object.assign(FullPageContainer, PageSubComponents);

export { Page, FullPage };
