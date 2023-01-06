import { RenderColorVariants, RenderSizeVariants } from 'utils/storybook-utils';
import { BaseInput } from './BaseInput';
import { Button } from 'components/Button/Button';
import { getRelativeSizeProp } from 'utils/getRelativeSizeProp';

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
        getProps={(size) => {
          const relativeSize = getRelativeSizeProp(-1, {
            relativeSize: size as any,
            maxSize: 'md',
          });

          const props = {
            size: relativeSize,
            className: 'h-3/4',
          };

          return {
            placeholder: 'Enter value',
            inlineLeadingAddonSlot: [
              {
                content: (
                  <Button {...props} color="primary">
                    A
                  </Button>
                ),
                pointerEvents: true,
              },
              {
                content: (
                  <Button {...props} color="secondary">
                    B
                  </Button>
                ),
                pointerEvents: true,
              },
            ],
            inlineTrailingAddonSlot: [
              {
                content: (
                  <Button {...props} color="positive">
                    C
                  </Button>
                ),
                pointerEvents: true,
              },
            ],
          };
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
