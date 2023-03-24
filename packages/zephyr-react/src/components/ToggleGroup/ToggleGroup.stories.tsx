import { RenderPaperContainers, RenderSizeVariants } from 'utils/storybook-utils';
import { StoryFn } from '@storybook/react';
import { generateMockOrganizationList } from 'mock/mock-data';
import { ToggleGroupItemData, ToggleGroup } from './ToggleGroup';

function generateItems({ count = 3 }: { count: number }): ToggleGroupItemData[] {
  return new Array(count).fill(0).map((_, index) => {
    return {
      label: `Item ${index + 1}`,
      value: `${index}`,
    };
  });
}

export const Basic: StoryFn = () => {
  return (
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
  );
};

export const FullWidth: StoryFn = () => {
  const organizations = generateMockOrganizationList({ size: 8, uniqueBy: 'industry' });
  return (
    <RenderPaperContainers renderTransparentPaper>
      <ToggleGroup
        fullWidth
        items={organizations.map(({ industry, id }) => ({ label: industry, value: `${id}` }))}
      />
    </RenderPaperContainers>
  );
};

export const Sizes: StoryFn = () => {
  return (
    <RenderSizeVariants
      orientation="vertical"
      // @ts-expect-error - fix this
      Component={ToggleGroup}
      props={{
        items: generateItems({ count: 3 }),
        color: 'neutral',
      }}
    />
  );
};

export const TwoItems: StoryFn = () => {
  return (
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
  );
};

export const ManyItems: StoryFn = () => {
  return (
    <RenderSizeVariants
      orientation="vertical"
      // @ts-expect-error - fix this
      Component={ToggleGroup}
      props={{
        items: generateItems({ count: 9 }),
        color: 'neutral',
      }}
    />
  );
};
