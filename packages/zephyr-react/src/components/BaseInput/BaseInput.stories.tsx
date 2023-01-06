import { RenderColorVariants, RenderSizeVariants } from 'utils/storybook-utils';
import { BaseInput } from './BaseInput';

export const Default = () => {
  return <RenderSizeVariants Component={BaseInput} props={{ placeholder: 'Enter value' }} />;
};

export const Icon = () => {
  return (
    <div className="space-y-40">
      <RenderSizeVariants
        Component={BaseInput}
        props={{ placeholder: 'Enter value', leadingIcon: '🎉' }}
      />
      <RenderSizeVariants
        Component={BaseInput}
        props={{ placeholder: 'Enter value', leadingIcon: '🎉' }}
      />
    </div>
  );
};

export const InlineAddons = () => {
  return (
    <div className="space-y-40">
      <RenderSizeVariants
        Component={BaseInput}
        props={{
          placeholder: 'Enter value',
          inlineLeadingAddonSlot: [
            {
              content: <button className="bg-primary rounded-md ">Small</button>,
              pointerEvents: true,
            },
            { content: '🚀', pointerEvents: false },
            { content: '🚀', pointerEvents: false },
            { content: '✨', pointerEvents: false },
          ],
        }}
      />
      <RenderSizeVariants
        Component={BaseInput}
        props={{
          placeholder: 'Enter value',
          trailingIcon: '🎉',
          inlineTrailingAddonSlot: [
            { content: '✨', pointerEvents: false },
            { content: '✨', pointerEvents: false },
          ],
        }}
      />
    </div>
  );
};
