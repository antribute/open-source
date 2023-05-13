/* eslint-disable no-console, react-hooks/rules-of-hooks */

import type { Meta, StoryObj } from '@storybook/react';
import { UserMockData, generateMockUserList } from 'mock/mock-data';
import { useState } from 'react';
import { Avatar } from 'components/Avatar';
import { Detail } from 'components/Detail';
import { Text } from 'components/Text';
import { Flex } from 'components/Flex';
import { useMockCharactersQuery } from 'mock/mock-apis';
import { Combobox } from '.';

const meta = {
  args: {},
  title: 'Input/Combobox',
  component: Combobox,
} satisfies Meta<typeof Combobox>;

export default meta;

const smUserOptions = generateMockUserList({ seed: 1, size: 3 });
const mdUserOptions = generateMockUserList({ seed: 1, size: 8 });
const lgUserOptions = generateMockUserList({ seed: 1, size: 20 });
const xlUserOptions = generateMockUserList({ seed: 1, size: 10000 });
const emptyUserOptions = generateMockUserList({ seed: 1, size: 0 });
const singleUserOptions = generateMockUserList({ seed: 1, size: 1 });

const optionsMap = {
  sm: { options: smUserOptions, size: 'SM' },
  md: { options: mdUserOptions, size: 'MD' },
  lg: { options: lgUserOptions, size: 'LG' },
  xl: { options: xlUserOptions, size: 'XL' },
  single: { options: singleUserOptions, size: 'Single' },
  empty: { options: emptyUserOptions, size: 'Empty' },
} satisfies Record<string, { options: UserMockData[]; size: string }>;

const optionSet = Object.values(optionsMap);

export const Default: StoryObj = {
  render: () => (
    <div className="flex flex-wrap gap-8">
      {optionSet.map(({ options, size }) => (
        <div>
          <Combobox
            label={`Users - ${size}`}
            options={options}
            isMultiSelect={false}
            getOptionLabel={(e) => `${e.name} ${e.name}`}
            onValueChange={(e) => {
              console.log('E', e);
            }}
          />
        </div>
      ))}
    </div>
  ),
};

export const MultiSelectCombobox: StoryObj = {
  render: () => {
    return (
      <div className="flex flex-wrap gap-8">
        {optionSet.map(({ options, size }) => (
          <div>
            <Combobox
              isMultiSelect
              label={`Users - ${size}`}
              options={options}
              getOptionLabel={(e) => `${e.name} ${e.name}`}
              onValueChange={(e) => {
                console.log('E', e);
              }}
            />
          </div>
        ))}
      </div>
    );
  },
};

export const MultiSelectComboboxRenderOption: StoryObj = {
  render: () => {
    return (
      <div className="flex flex-wrap gap-8">
        {optionSet.map(({ options, size }) => (
          <div>
            <Combobox
              isMultiSelect
              label={`Users - ${size}`}
              options={options}
              getOptionLabel={(e) => `${e.name} ${e.email}`}
              onValueChange={(e) => {
                console.log('Value', e);
              }}
              renderOption={(e) => (
                <Detail
                  title={
                    <Flex gap="md" align="center">
                      <Avatar size="inlineXs" src={e.avatarUrl} label={e.name} />
                      <Text.Title leading="sm" noWrap>
                        {e.name}
                      </Text.Title>
                    </Flex>
                  }
                  description={e.email}
                />
              )}
            />
          </div>
        ))}
      </div>
    );
  },
};

export const MultiSelectTagsCombobox: StoryObj = {
  render: () => {
    const [search, setSearch] = useState<string | undefined>();

    const { data, loading } = useMockCharactersQuery({ search });

    console.log('DATA', data);

    return (
      <div className="flex gap-8">
        {[optionsMap.lg, optionsMap.lg, optionsMap.lg].map(({ options, size }) => (
          <Combobox
            isMultiSelect
            multiSelectVariant="tags"
            label={`Users - ${size}`}
            loading={loading}
            options={options}
            getOptionLabel={(e) => e.name}
            onSearch={(search) => {
              setSearch(search);
            }}
            onValueChange={(e) => {
              console.log(`Combobox Value Change`, e);
            }}
          />
        ))}
      </div>
    );
  },
};

export const SearchableMultiSelectCombobox: StoryObj = {
  render: () => {
    const [search, setSearch] = useState<string | undefined>();

    const { data, loading } = useMockCharactersQuery({ search });

    console.log('DATA', data);

    return (
      <>
        <Combobox
          // value={values}
          options={data}
          getOptionLabel={(e) => e.name}
          onValueChange={(e) => {
            console.log('On value change: ', e);
          }}
          searching={loading}
          isMultiSelect
          onSearch={(v) => {
            console.log('SEAARCH', v);
            setSearch(v);
          }}
        />
      </>
    );
  },
};

export const ReactAriaTst: StoryObj = {
  render: () => {
    const options = generateMockUserList({ size: 20 });
    return (
      <div className="flex flex-wrap gap-8">
        <Combobox
          label="Users"
          options={options}
          isMultiSelect={false}
          getOptionLabel={(e) => `${e.name} ${e.name}`}
          onValueChange={(e) => {
            console.log('E', e);
          }}
        />
      </div>
    );
  },
};
