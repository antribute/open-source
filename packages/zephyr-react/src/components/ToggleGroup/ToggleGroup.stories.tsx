import { RenderColorVariants, RenderSizeVariants } from 'utils/storybook-utils';
import { StoryFn } from '@storybook/react';
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
    <RenderColorVariants
      orientation="vertical"
      // @ts-expect-error - fix this
      Component={ToggleGroup}
      props={{
        items: generateItems({ count: 3 }),
      }}
    />
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
        color: 'primary',
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
        color: 'primary',
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
        color: 'primary',
      }}
    />
  );
};
