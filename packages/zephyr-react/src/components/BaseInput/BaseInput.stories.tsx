import { RenderSizeVariants } from 'utils/storybook-utils';
import { Button } from 'components/Button/Button';
import { getRelativeSizeProp } from 'utils/getRelativeSizeProp';
import { SizeProp } from 'types/styles';
import { BaseInput } from './BaseInput';

export const Default = () => {
  return <RenderSizeVariants Component={BaseInput} props={{ placeholder: 'Enter value' }} />;
};

export const Icon = () => {
  return (
    <div className="space-y-40">
      <RenderSizeVariants
        orientation="vertical"
        Component={BaseInput}
        props={{ placeholder: 'Enter value', leadingIcon: '🎉' }}
      />
      <RenderSizeVariants
        orientation="vertical"
        Component={BaseInput}
        props={{ placeholder: 'Enter value', trailingIcon: '🎉' }}
      />
    </div>
  );
};

export const InlineAddons = () => {
  return (
    <div className="space-y-40">
      <RenderSizeVariants
        orientation="vertical"
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

      <RenderSizeVariants
        orientation="vertical"
        Component={BaseInput}
        getProps={(size) => {
          const relativeSize = getRelativeSizeProp(-1, {
            relativeSize: size as SizeProp,
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
    </div>
  );
};
