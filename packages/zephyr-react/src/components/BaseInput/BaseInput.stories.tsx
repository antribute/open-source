import { RenderSizeVariants, getSizeKeys } from 'utils/storybook-utils';
import { Button } from 'components/Button/Button';
import { getRelativeSizeProp } from 'utils/getRelativeSizeProp';
import { SizeProp } from 'types/styles';
import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon';
import CurrencyDollarIcon from '@heroicons/react/24/outline/CurrencyDollarIcon';
import { InfoTooltipIcon } from 'components/Tooltip';
import { PrimitiveBaseInput } from 'components/BaseInput/PrimitiveBaseInput';
import { Paper } from 'components/Paper';
import { BaseInput } from './BaseInput';

export const Default = () => {
  return <RenderSizeVariants Component={BaseInput} props={{ placeholder: 'Enter value' }} />;
};

export const PrimitiveBaseInputComponent = () => {
  return (
    <div className="flex items-center gap-8">
      {getSizeKeys().map((size) => (
        <div className="bg-highlight flex">
          <PrimitiveBaseInput size={size} placeholder="Enter value" />
        </div>
      ))}
    </div>
  );
};

export const Icon = () => {
  return (
    <div className="space-y-40">
      <RenderSizeVariants
        orientation="horizontal"
        Component={BaseInput}
        props={{ placeholder: 'Enter value', leadingIcon: <CurrencyDollarIcon /> }}
      />
      <RenderSizeVariants
        orientation="horizontal"
        Component={BaseInput}
        props={{ placeholder: 'Enter value', trailingIcon: <CurrencyDollarIcon /> }}
      />
    </div>
  );
};

export const InlineAddons = () => {
  return (
    <div className="space-y-40">
      <RenderSizeVariants
        orientation="vertical"
        sizes={['md']}
        noChildren
        Component={BaseInput}
        getProps={(size) => {
          return {
            placeholder: 'Enter value',

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

export const Loading = () => {
  return (
    <div className="space-y-40">
      <RenderSizeVariants
        noChildren
        Component={BaseInput}
        props={{ loading: true, placeholder: 'Enter value' }}
      />
    </div>
  );
};
