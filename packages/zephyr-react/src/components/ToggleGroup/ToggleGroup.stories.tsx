import {
  RenderColorVariants,
  RenderPaperContainers,
  RenderSizeVariants,
} from 'utils/storybook-utils';
import { StoryFn } from '@storybook/react';
import { generateMockOrganizationList } from 'mock/mock-data';
import { Paper } from 'components/Paper';
import { ToggleGroupItem, ToggleGroup } from './ToggleGroup';

function generateItems({ count = 3 }: { count: number }): ToggleGroupItem[] {
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
  const organizations = generateMockOrganizationList({ size: 4 });
  return (
    <RenderPaperContainers border>
      <ToggleGroup
        fullWidth
        items={organizations.map(({ name, id }) => ({ label: name, value: `${id}` }))}
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
