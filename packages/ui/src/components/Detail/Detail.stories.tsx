// @tyler please fix the underlying typings and remove the following comments
// eslint-disable-next-line ts/ban-ts-comment
// @ts-nocheck

import type { Meta, StoryObj } from '@storybook/react';
import { Flex } from 'components/Flex';
import { Paper } from 'components/Paper';
import { IconButton } from 'components/IconButton';
import { StatusBadge } from 'components/StatusBadge';
import { Button } from 'components/Button';
import { objectMap, pickProps } from 'utils';
import {
  endSlotIds,
  labelSlotIds,
  mainSlotIds,
  startSlotIds,
} from 'components/Detail/Detail.types';
import type { InputType } from '@storybook/types';
import { Masonry } from 'react-plock';
import { Text } from 'components/Text';
import { useMemo, useState } from 'react';
import clsx from 'clsx';
import { Combobox } from 'components/Combobox';
import type { CenterDetailSlots } from 'components/Detail/Detail.old';
import type { DetailProps } from '.';
import { Detail } from '.';

const meta = {
  args: {},
  title: 'Display/Detail',
  component: Detail,
} as Meta<typeof Detail>;

type Story = StoryObj<typeof Detail>;

export default meta;

const args = {
  overline: 'Overline',
  title: 'Title',
  subtitle: 'Subtitle',
  body: 'Officia non aliqua veniam ullamco consequat in.',
  heading: 'Heading',
  subheading: 'Subheading',
  description: 'Consequat ullamco id non id proident officia pariatur labore nulla.',
  caption: 'Recently Updated',
  ...objectMap(labelSlotIds, ({ value }) => {
    return [value, 'Label'];
  }),
  ...objectMap(startSlotIds, ({ value }) => {
    return [
      value,
      <StatusBadge size="xs" color="success">
        Start
      </StatusBadge>,
    ];
  }),
  ...objectMap(endSlotIds, ({ value }) => {
    return [
      value,
      <StatusBadge size="xs" color="orange">
        End
      </StatusBadge>,
    ];
  }),
  startCaption: '2/05',
  endCaption: { value: '3 hours ago', noWrap: true },

  start: <IconButton className="i-heroicons-bolt-solid" size="sm" />,
  end: <IconButton className="i-heroicons-bolt-solid" size="sm" />,
} satisfies DetailProps;

const detailSlotProps = () => {
  const argTypes: Story['argTypes'] = objectMap(args, ({ key }) => {
    const inputType: InputType = { type: 'string' };
    return [key, inputType];
  });

  return { argTypes };
};

const { argTypes } = detailSlotProps();

const MockDetailExample = (props: DetailProps) => (
  <Paper border className="max-w-300 w-full ">
    <Detail {...props} />
  </Paper>
);

const MockDetailExample3 = (props: DetailProps) => {
  return (
    <Flex gap>
      {Array.from({ length: 3 })
        .fill(0)
        .map((_, index) => (
          <MockDetailExample {...props} key={index} />
        ))}
    </Flex>
  );
};

export const Default: Story = {
  argTypes,

  render: () => {
    const storedKeys = JSON.parse(localStorage.getItem('isolated-keys') ?? '[]') as string[];

    const [isolated, setIsolated] = useState<string[]>(storedKeys);
    const [filterIsolated, setFilterIsolated] = useState(false);

    const mainPropIdsState = useState(mainSlotIds);
    const startPropIdsState = useState<typeof startSlotIds>([]);
    const endPropIdsState = useState<typeof endSlotIds>([]);
    const labelPropIdsState = useState<typeof labelSlotIds>([]);
    const startEndPropIdsState = useState<(keyof CenterDetailSlots)[]>([]);

    const [mainPropIds] = mainPropIdsState;
    const [startPropIds] = startPropIdsState;
    const [endPropIds] = endPropIdsState;
    const [startEndPropIds] = startEndPropIdsState;
    const [labelPropIds] = labelPropIdsState;

    const propCombinations = useMemo((): DetailProps[] => {
      return Array.from({ length: 3 })
        .fill(0)
        .map(() => {
          const props = Object.fromEntries(
            [
              ...mainPropIds,
              ...startEndPropIds,
              ...startPropIds,
              ...labelPropIds,
              ...endPropIds,
            ].map((key) => [key, args[key]])
          ) as DetailProps;
          return props;
        });
    }, [mainPropIds, startPropIds, endPropIds, startEndPropIds, labelPropIds]);

    const hasIsolated = storedKeys.length > 0;

    return (
      <div className="overflow-y-auto max-h-screen">
        <div className="w-full flex justify-end space-x-16 mb-8 sticky top-0 z-10">
          {hasIsolated && (
            <Button
              onClick={() => {
                setFilterIsolated(!filterIsolated);
              }}
            >
              Filter Isolated
            </Button>
          )}
        </div>
        <Flex gap="md">
          {[
            { label: 'Main Slots', options: mainSlotIds, state: mainPropIdsState },
            { label: 'Start Slots', options: startSlotIds, state: startPropIdsState },
            { label: 'End Slots', options: endSlotIds, state: endPropIdsState },
            { label: 'Label Slots', options: labelSlotIds, state: labelPropIdsState },
            { label: 'Start / End Slots', options: ['start', 'end'], state: startEndPropIdsState },
          ].map(({ label, options, state: [state, setState] }, i) => (
            <Combobox
              label={label}
              key={i}
              isMultiSelect
              getOptionLabel={(e) => e}
              options={options}
              value={state}
              toggleViewAllSelectedOnPopoverUnmount={false}
              onValueChange={(e) => {
                setState(e);
              }}
              renderOption={(e) => {
                return <Detail className="w-full" subtitle={{ value: e }} />;
              }}
            />
          ))}
        </Flex>
        <Masonry
          items={propCombinations.filter((e) => {
            if (filterIsolated) {
              const keys = Object.keys(e).join(', ');
              return isolated.includes(keys);
            }
            return true;
          })}
          config={{ columns: 3, gap: 24 }}
          render={(props) => {
            const keys = Object.keys(props).join(', ');

            const isIsolated = isolated.includes(keys);
            return (
              <div className="space-y-4 group">
                <div
                  className={clsx(
                    'border-2 border-transparent rounded p-8',
                    isIsolated && !filterIsolated && 'border-info bg-info/5'
                  )}
                >
                  <Flex gap="sm" align="center" justify="between" className="mb-6">
                    <Text size="xs" color="subtle">
                      {keys}
                    </Text>

                    <Flex gap="sm" className="opacity-0 group-hover:opacity-100">
                      {!isIsolated && (
                        <IconButton
                          className="i-heroicons-plus"
                          size="xs"
                          onClick={() => {
                            const newKeys = [...isolated, keys];
                            setIsolated(newKeys);
                            localStorage.setItem('isolated-keys', JSON.stringify(newKeys));
                          }}
                        />
                      )}
                      {isIsolated && (
                        <IconButton
                          size="xs"
                          color="danger"
                          variant="outlined"
                          className="i-heroicons-minus"
                          onClick={() => {
                            const filtered = isolated.filter((e) => e !== keys);
                            localStorage.setItem('isolated-keys', JSON.stringify(filtered));
                            setIsolated(filtered);
                          }}
                        />
                      )}
                    </Flex>
                  </Flex>
                  <MockDetailExample className="border-info" {...props} />
                </div>
              </div>
            );
          }}
        />
      </div>
      // <div className="grid grid-cols-3 gap-8">
      //   {propCombinations.map((props) => (
      //     <div className="flex flex-col col-span-1">
      //       <Masonry {...props} className="col-span-1" />
      //     </div>
      //   ))}
      // </div>
    );
  },
};

export const DetailExample1: Story = {
  args: pickProps(args, {
    title: '_pick_',
  }),
  argTypes: {
    description: { type: 'string', defaultValue: 'Hello' },
    overline: { type: 'string' },
    subtitle: { type: 'string' },
    caption: { type: 'string' },
    title: { type: 'string' },
    end: { type: 'string' },
  },
  render: MockDetailExample3,
};

export const DetailExample1A: Story = {
  args: pickProps(args, {
    subtitle: '_pick_',
  }),
  argTypes: {
    description: { type: 'string', defaultValue: 'Hello' },
    overline: { type: 'string' },
    subtitle: { type: 'string' },
    caption: { type: 'string' },
    title: { type: 'string' },
    end: { type: 'string' },
  },
  render: MockDetailExample3,
};

export const DetailExample2: Story = {
  args: pickProps(args, {
    title: '_pick_',
    start: '_pick_',
  }),
  argTypes,
  render: (args) => {
    return <MockDetailExample3 {...args} />;
  },
};

export const DetailExample3: Story = {
  args: pickProps(args, {
    title: '_pick_',
    subtitle: '_pick_',
    start: '_pick_',
  }),
  argTypes,
  render: (args) => {
    return <MockDetailExample3 {...args} />;
  },
};

export const DetailExample4: Story = {
  args: pickProps(args, {
    title: '_pick_',
    subtitle: '_pick_',
    start: '_pick_',
    end: '_pick_',
  }),
  argTypes,
  render: (args) => {
    return <MockDetailExample3 {...args} />;
  },
};

export const DetailExample5: Story = {
  args: pickProps(args, {
    overline: '_pick_',
    title: '_pick_',
    subtitle: '_pick_',
    start: '_pick_',
    end: '_pick_',
  }),
  argTypes,
  render: (args) => {
    return <MockDetailExample3 {...args} />;
  },
};

export const DetailExample6: Story = {
  args: pickProps(args, {
    startOverline: '_pick_',
    title: '_pick_',
    subtitle: '_pick_',
    start: '_pick_',
    end: '_pick_',
  }),
  argTypes,
  render: (args) => {
    return <MockDetailExample3 {...args} />;
  },
};

export const DetailExample7: Story = {
  args: pickProps(args, {
    endOverline: '_pick_',
    startOverline: '_pick_',
    title: '_pick_',
    subtitle: '_pick_',
    start: '_pick_',
    end: '_pick_',
  }),
  argTypes,
  render: (args) => {
    return <MockDetailExample3 {...args} />;
  },
};

export const DetailExample8: Story = {
  args: pickProps(args, {
    endOverline: '_pick_',
    startOverline: '_pick_',
    title: '_pick_',
    subtitle: '_pick_',
    start: '_pick_',
    description: '_pick_',
    end: '_pick_',
    caption: '_pick_',
    endCaption: '_pick_',
  }),
  argTypes,
  render: (args) => {
    return <MockDetailExample3 {...args} />;
  },
};

export const DetailExample9: Story = {
  args: pickProps(args, {
    endOverline: '_pick_',
    startOverline: '_pick_',
    title: '_pick_',
    subtitle: '_pick_',
    start: '_pick_',
    description: '_pick_',
    end: '_pick_',
    caption: '_pick_',
    endCaption: '_pick_',
    startCaption: '_pick_',
  }),
  argTypes,
  render: (args) => {
    return <MockDetailExample3 {...args} />;
  },
};

export const DetailExample10: Story = {
  args: { ...args, start: undefined, end: undefined },
  argTypes,
  render: (args) => {
    return <MockDetailExample3 {...args} />;
  },
};

export const MetricDetailExample1: Story = {
  args: {
    overline: 'Gross Revenue',
    heading: '$323,496.00',
  },
  argTypes,
  render: (args) => {
    return <MockDetailExample3 {...args} />;
  },
};

export const MetricDetailExample2: Story = {
  args: {
    overline: 'Gross Revenue',
    heading: '$323,496.00',
    endHeading: {
      variant: 'subheading',
      value: <span className="i-heroicons-arrow-up text-success" />,
    },
  },
  argTypes,
  render: (args) => {
    return <MockDetailExample3 {...args} />;
  },
};
