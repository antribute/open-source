/* eslint-disable no-console, react-hooks/rules-of-hooks */

import type { Meta, StoryObj } from '@storybook/react';
import { UserMockData, generateMockOrganizationList, generateMockUserList } from 'mock/mock-data';
import { useState } from 'react';
import { Avatar } from 'components/Avatar';
import { Detail } from 'components/Detail';
import { Text } from 'components/Text';
import { Flex } from 'components/Flex';
import { useMockCharactersQuery } from 'mock/mock-apis';
import { RenderPaperContainers } from 'utils/storybook-utils';
import { HomeIcon } from '@heroicons/react/24/outline';
import { GlyphContainerElement } from 'components/Icon/IconContainer';
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

function ComboboxRenderContainer({
  children,
}: {
  children: (params: { options: UserMockData[]; label: string }) => React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap gap-8">
      {optionSet.map(({ options, size }) => (
        <div key={size}>{children({ options, label: `Users - ${size}` })}</div>
      ))}
    </div>
  );
}

export const Default: StoryObj = {
  render: () => (
    <ComboboxRenderContainer>
      {(props) => (
        <Combobox
          {...props}
          isMultiSelect={false}
          getOptionLabel={(e) => `${e.name} ${e.name}`}
          onValueChange={(e) => {
            console.log('E', e);
          }}
        />
      )}
    </ComboboxRenderContainer>
  ),
};

export const Surfaces: StoryObj = {
  render: () => (
    <RenderPaperContainers className="flex flex-wrap gap-8">
      <Combobox
        label="Users"
        options={mdUserOptions}
        isMultiSelect={false}
        getOptionLabel={(e) => `${e.name} ${e.name}`}
        onValueChange={(e) => {
          console.log('E', e);
        }}
      />
    </RenderPaperContainers>
  ),
};

export const MultiSelectCombobox: StoryObj = {
  render: () => {
    return (
      <ComboboxRenderContainer>
        {(props) => (
          <Combobox
            {...props}
            isMultiSelect
            getOptionLabel={(e) => `${e.name} ${e.name}`}
            onValueChange={(e) => {
              console.log('E', e);
            }}
          />
        )}
      </ComboboxRenderContainer>
    );
  },
};

export const MultiSelectComboboxRenderOption: StoryObj = {
  render: () => {
    return (
      <ComboboxRenderContainer>
        {(props) => (
          <Combobox
            {...props}
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
        )}
      </ComboboxRenderContainer>
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
            key={size}
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

export const CustomRenderedSelectValue: StoryObj = {
  render: () => {
    const options = generateMockOrganizationList({ size: 3 });
    return (
      <RenderPaperContainers>
        <Combobox
          disableSelectAnimation
          clearable={false}
          shadow={false}
          border="subtle"
          showSearchBox={false}
          value={options[0]}
          className="pr-8 ring-boundary-weak/50 focus:ring-highlight-tint"
          renderSelectValue={({ selected }) => (
            <Flex align="center" gap w-full>
              <GlyphContainerElement>
                <HomeIcon
                  fill="none"
                  height="20"
                  className="z-20 relative"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  width="20"
                  style={{ color: 'currentcolor' }}
                />
              </GlyphContainerElement>
              <Flex column className="cursor-pointer">
                <div className="text-xs text-content-subtle">Organization</div>
                {/* <div className="truncate whitespace-nowrap">{selected?.name ?? <Text.Blank />}</div> */}

                <div className="line-clamp-1 leading-md text-md">
                  {selected?.name ?? <Text.Blank />}
                </div>
              </Flex>
            </Flex>
          )}
          options={options}
          isMultiSelect={false}
          getOptionLabel={(e) => `${e.name} ${e.name}`}
          onValueChange={(e) => {
            console.log('E', e);
          }}
        >
          <Combobox.FooterButton>Create New Organizaton</Combobox.FooterButton>
          {/* <Combobox.Addon className="" focusInputOnClick={false}>
            <IconButton
              variant="glass"
              size="xs"
              color="secondary"
              className="group-hover:opacity-100  group-hover:scale-100 opacity-0 scale-0 transition-all duration-300 delay-150"
            >
              <span className="i-heroicons-plus-20-solid" />
            </IconButton>
          </Combobox.Addon> */}
        </Combobox>
      </RenderPaperContainers>
    );
  },
};
