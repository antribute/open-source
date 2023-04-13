import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon';
import CurrencyDollarIcon from '@heroicons/react/24/outline/CurrencyDollarIcon';
import type { Meta, StoryObj } from '@storybook/react';

import { InfoTooltipIcon } from 'components/Tooltip';
import { PrimitiveBaseInput } from 'components/BaseInput/PrimitiveBaseInput';
import { RenderSizeVariants, getSizeKeys } from 'utils/storybook-utils';

import { BaseInput } from './BaseInput';

const meta = {
  args: {},
  title: 'Inputs/Base Input',
  component: BaseInput,
} satisfies Meta<typeof BaseInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: () => <RenderSizeVariants Component={BaseInput} props={{ placeholder: 'Enter value' }} />,
};

export const PrimitiveBaseInputComponent: Story = {
  args: {},
  render: () => (
    <div className="flex items-center gap-8">
      {getSizeKeys().map((size) => (
        <div className="bg-highlight flex">
          <PrimitiveBaseInput size={size} placeholder="Enter value" />
        </div>
      ))}
    </div>
  ),
};

export const Icon: Story = {
  args: {},
  render: () => (
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
  ),
};

export const InlineAddons: Story = {
  args: {},
  render: () => (
    <div className="space-y-40">
      <RenderSizeVariants
        orientation="vertical"
        sizes={['md']}
        noChildren
        Component={BaseInput}
        getProps={() => {
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
  ),
};

export const Loading: Story = {
  args: {},
  render: () => (
    <div className="space-y-40">
      <RenderSizeVariants
        noChildren
        Component={BaseInput}
        props={{ loading: true, placeholder: 'Enter value' }}
      />
    </div>
  ),
};
