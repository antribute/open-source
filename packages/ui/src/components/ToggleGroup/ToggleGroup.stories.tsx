import type { Meta, StoryObj } from '@storybook/react';
import { RenderPaperContainers, RenderSizeVariants } from 'utils/storybook-utils';
import { generateMockOrganizationList } from 'mock/mock-data';
import { IconButton } from 'components/IconButton';
import type { ToggleGroupItemData } from './ToggleGroup';
import { ToggleGroup } from './ToggleGroup';

const meta = {
  args: {},
  title: 'Input/ToggleGroup',
  component: ToggleGroup,
} satisfies Meta<typeof ToggleGroup>;

export default meta;

function generateItems({ count = 3 }: { count: number }): ToggleGroupItemData[] {
  // New Array() is an amazing util for mock data, disabling the rule for this case
  // eslint-disable-next-line unicorn/no-new-array
  return new Array(count).fill(0).map((_, index) => {
    return {
      label: `Item ${index + 1}`,
      value: `${index}`,
    };
  });
}

export const Basic: StoryObj = {
  render: () => (
    <RenderSizeVariants
      orientation="vertical"
      // @ts-expect-error - fix this
      Component={ToggleGroup}
      renderPaperContainers
      props={{
        items: [
          { label: 'One', value: 'one' },
          { label: 'Two', value: 'two' },
          { label: 'Three', value: 'three' },
        ],
        color: 'neutral',
      }}
    />
  ),
};

export const BorderedVariant: StoryObj = {
  render: () => (
    <RenderSizeVariants
      orientation="vertical"
      // @ts-expect-error - fix this
      Component={ToggleGroup}
      renderPaperContainers
      props={{
        items: [
          { label: 'One', value: 'one' },
          { label: 'Two', value: 'two' },
          { label: 'Three', value: 'three' },
        ],
        color: 'neutral',
      }}
    />
  ),
};

export const FullWidth: StoryObj = {
  render: () => {
    const organizations = generateMockOrganizationList({ size: 8, uniqueBy: 'industry' });
    return (
      <RenderPaperContainers renderTransparentPaper>
        <ToggleGroup
          fullWidth
          items={organizations.map(({ industry, id }) => ({ label: industry, value: `${id}` }))}
        />
      </RenderPaperContainers>
    );
  },
};

export const Sizes: StoryObj = {
  render: () => (
    <RenderSizeVariants
      orientation="vertical"
      // @ts-expect-error - fix this
      Component={ToggleGroup}
      props={{
        items: generateItems({ count: 3 }),
        color: 'neutral',
      }}
    />
  ),
};

export const TwoItems: StoryObj = {
  render: () => (
    <RenderSizeVariants
      orientation="vertical"
      // @ts-expect-error - fix this
      Component={ToggleGroup}
      props={{
        items: [
          { label: 'Min', value: 'min' },
          { label: 'Max', value: 'max' },
        ],
        color: 'neutral',
      }}
    />
  ),
};

export const ManyItems: StoryObj = {
  args: {},
  render: () => (
    <RenderSizeVariants
      orientation="vertical"
      // @ts-expect-error - fix this
      Component={ToggleGroup}
      props={{
        items: generateItems({ count: 9 }),
        color: 'neutral',
      }}
    />
  ),
};

export const ToggleIcons: StoryObj = {
  render: () => (
    <div className="inline-flex  flex-col gap-16">
      <RenderPaperContainers
        hasContainer={false}
        className="flex flex-row items-center p-8"
        padding={false}
      >
        <ToggleGroup
          className=""
          items={[
            { label: <span className="i-heroicons-bars-3-bottom-left" />, value: '1' },
            { label: <span className="i-heroicons-bars-3" />, value: '2' },
            { label: <span className="i-heroicons-bars-3-bottom-right" />, value: '3' },
          ]}
        />
        <ToggleGroup
          items={[
            { label: <span className="i-heroicons-bars-3-bottom-left" />, value: '1' },
            { label: <span className="i-heroicons-bars-3" />, value: '2' },
            { label: <span className="i-heroicons-bars-3-bottom-right" />, value: '3' },
          ]}
        />
        <IconButton variant="glass" color="secondary" size="sm" className="!h-full">
          <span className="i-heroicons-bolt-solid" />
        </IconButton>
      </RenderPaperContainers>
    </div>
  ),
};
