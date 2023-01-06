import { RenderColorVariants, RenderSizeVariants } from 'utils/storybook-utils';
import { ToggleGroupItem } from './ToggleGroup';
import { ToggleGroup, ToggleGroupProps } from './ToggleGroup';
import { StoryFn } from '@storybook/react';

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
      Component={ToggleGroup as any}
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
      Component={ToggleGroup as any}
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
      Component={ToggleGroup as any}
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
      Component={ToggleGroup as any}
      props={{
        items: generateItems({ count: 9 }),
        color: 'primary',
      }}
    />
  );
};
