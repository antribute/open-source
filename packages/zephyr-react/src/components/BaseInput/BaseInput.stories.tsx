import { RenderSizeVariants } from 'utils/storybook-utils';
import { Button } from 'components/Button/Button';
import { getRelativeSizeProp } from 'utils/getRelativeSizeProp';
import { SizeProp } from 'types/styles';
import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon';
import CurrencyDollarIcon from '@heroicons/react/24/outline/CurrencyDollarIcon';
import { InfoTooltipIcon } from 'components/Tooltip';
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
        props={{ placeholder: 'Enter value', leadingIcon: <CurrencyDollarIcon /> }}
      />
      <RenderSizeVariants
        orientation="vertical"
        Component={BaseInput}
        props={{ placeholder: 'Enter value', trailingIcon: <CurrencyDollarIcon /> }}
      />
    </div>
  );
};

export const InlineAddons = () => {
  return (
    <div className="space-y-40">
      {/* <RenderSizeVariants
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
      /> */}

      <RenderSizeVariants
        orientation="vertical"
        sizes={['md']}
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
              // {
              //   content: (
              //     <Button {...props} color="primary">
              //       A
              //     </Button>
              //   ),
              //   pointerEvents: true,
              // },
              // {
              //   content: <ChevronDownIcon height={24} width={24} className="h-24 w-24" />,
              // },
            ],
            inlineTrailingAddonSlot: [
              {
                focusInputOnClick: false,
                content: (
                  <InfoTooltipIcon tooltip="Ad nostrud dolore culpa cupidatat quis tempor commodo dolore Lorem sint reprehenderit laborum quis." />
                ),
              },
              <ChevronDownIcon />,
            ],
          };
        }}
      />
    </div>
  );
};
