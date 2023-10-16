import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Text } from 'components/Text';
import { Paper } from 'components/Paper';
import { Combobox } from 'components/Combobox';
import { changeCase } from 'utils/changeCase';
import { StatusBadge } from 'components/StatusBadge';
import { BasicCheckbox } from 'components/BasicCheckbox';
import clsx from 'clsx';
import { classed } from 'utils/classed';
import { Wrap } from './Wrap';

const meta = {
  args: {},
  title: 'Misc/Wrap',
  component: Wrap,
  decorators: [
    (Story) => (
      <div className="w-screen fixed h-full flex justify-center items-center pb-[40vh]">
        <div
          className="grid grid-cols-2 gap-x-36 max-w-screen-sm w-full"
          style={{ gridTemplateColumns: 'auto min-content' }}
        >
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof Wrap>;

export default meta;

type Story = StoryObj<Record<string, never>>;

const ToolbarElement = classed('div', 'flex justify-center items-center w-full whitespace-nowrap');

const WrappedChild = ({ description, className }: { description: string; className?: string }) => (
  <div className={clsx('font-medium', className)}>{description}</div>
);

export const SingleConditionWrap: Story = {
  args: {},
  render: () => {
    const [isWrapperEnabled, setIsWrapperEnabled] = useState(false);
    return (
      <>
        <Wrap
          {...{
            if: isWrapperEnabled,
            wrap: (c) => (
              <Paper>
                <Text.Overline>Container</Text.Overline>
                <div> {c}</div>
              </Paper>
            ),
          }}
        >
          <WrappedChild description="When the checkbox is enabled, I will be wrapped in a container element." />
        </Wrap>

        <ToolbarElement>
          <BasicCheckbox
            label="Wrapper Enabled"
            onChange={(v) => setIsWrapperEnabled(Boolean(v))}
          />
        </ToolbarElement>
      </>
    );
  },
};

export const FalbackWrapper: Story = {
  args: {},
  render: () => {
    const [isFallbackWrapperEnabled, setIsFallbackWrapperEnabled] = useState(false);

    const fallbackWrapper = (c: React.ReactNode) => (
      <Paper>
        <Text.Overline>Fallback Container</Text.Overline>
        <div> {c}</div>
      </Paper>
    );

    return (
      <>
        <Wrap
          {...{
            if: undefined,
            wrap: () => 'Never',
            fallback: isFallbackWrapperEnabled ? fallbackWrapper : undefined,
          }}
        >
          <WrappedChild description="When the checkbox is enabled, I will be wrapped in a fallback container because the condition is falsy." />
        </Wrap>

        <ToolbarElement>
          <BasicCheckbox
            label="Fallback Wrapper Enabled"
            onChange={(v) => setIsFallbackWrapperEnabled(Boolean(v))}
          />
        </ToolbarElement>
      </>
    );
  },
};

export const MultipleConditionWrap: Story = {
  args: {},
  render: () => {
    type Status = 'online' | 'offline' | 'inactive' | null | undefined | object;

    const [status, setStatus] = useState<Status>();

    return (
      <>
        <Wrap
          if={status}
          wrap={{
            online: (c) => (
              <Paper>
                <StatusBadge color="success"> Online</StatusBadge>
                {c}
              </Paper>
            ),
            offline: (c) => (
              <Paper colorScheme="surface-light">
                <StatusBadge color="danger"> Offline</StatusBadge>
                {c}
              </Paper>
            ),
            inactive: (c) => (
              <Paper colorScheme="surface-dark">
                <StatusBadge color="primary"> Inactive</StatusBadge>
                {c}
              </Paper>
            ),
          }}
          fallback={(c) => (
            <Paper colorScheme="surface-dark">
              <Text color="weak">Fallback Container</Text>
              {c}
            </Paper>
          )}
        >
          <WrappedChild
            description="Changing the Combobox changes which which container I'm wrapped in."
            className="mt-8"
          />
        </Wrap>
        <ToolbarElement>
          <Combobox
            label="Status"
            options={['online', 'offline', 'inactive'] satisfies Status[]}
            getOptionLabel={(o) => changeCase(o, 'capital')}
            onValueChange={(o) => {
              setStatus(o);
            }}
          />
        </ToolbarElement>
      </>
    );
  },
};

export const WrapWithRecordAsCondition: Story = {
  args: {},
  render: () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [complete, setComplete] = useState<boolean>(false);

    const setStateMap = {
      loading: setLoading,
      error: setError,
      complete: setComplete,
    };

    const stateMap = {
      error,
      loading,
      complete,
    };

    const options = Object.keys(stateMap) as (keyof typeof stateMap)[];

    return (
      <>
        <Wrap
          if={stateMap}
          wrap={{
            error: (c) => (
              <Paper>
                <StatusBadge color="danger"> Error</StatusBadge>
                {c}
              </Paper>
            ),
            loading: (c) => (
              <Paper>
                <StatusBadge color="info"> Loading...</StatusBadge>
                {c}
              </Paper>
            ),
            complete: (c) => (
              <Paper>
                <StatusBadge color="success"> Complete</StatusBadge>
                {c}
              </Paper>
            ),
          }}
          fallback={(c) => (
            <Paper colorScheme="surface-dark">
              <Text color="weak">Fallback Container</Text> {c}
            </Paper>
          )}
        >
          <WrappedChild
            description={"Changing the Combobox changes which which container I'm wrapped in."}
            className="mt-8"
          />
        </Wrap>

        <ToolbarElement>
          <Combobox
            label="State"
            options={options}
            isMultiSelect
            getOptionLabel={(o) => o}
            onValueChange={(selected) => {
              options.forEach((key) => {
                const setState = setStateMap[key];

                if (selected.includes(key)) {
                  setState(true);
                } else {
                  setState(false);
                }
              });
            }}
          />
        </ToolbarElement>
      </>
    );
  },
};
