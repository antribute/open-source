import type { Meta, StoryObj } from '@storybook/react';
import { mockDataDeploymentStatuses, mockDataEnvironments } from 'mock/mock-data';
import { changeCase } from 'utils/changeCase';
import { Flex } from 'components/Flex';
import { Paper } from 'components/Paper';
import type { InputComponentProps, TextAreaFieldProps } from 'components/Input';
import { getSizeKeys } from 'utils/storybook-utils';
import { Button } from 'components/Button';
import { useState } from 'react';
import type { TextFieldProps } from '.';
import { Input } from '.';

const meta = {
  title: 'Input/Input',
  component: Input,
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<unknown>;

export const Default: Story = {
  args: {},
  render: () => (
    <div>
      <Input name="User name" label="Username" placeholder="Enter username" />
    </div>
  ),
};

export const Sizes: Story = {
  args: {},
  render: () => {
    const sizeProps = ['size', 'minWidth', 'maxWidth'] satisfies (keyof InputComponentProps)[];

    const renderSizes = sizeProps.map((property) => {
      return {
        property,
        props: getSizeKeys().map((size) => {
          return {
            [property]: size,
            label: `${changeCase(property, 'capital')} - ${size}`,
          };
        }) satisfies TextFieldProps[],
      };
    });

    return (
      <div>
        <Input name="" label="Full Width - fullWidth" fullWidth placeholder="Enter value..." />
        {renderSizes.map(({ property, props }) => (
          <Flex column className="my-30" key={property}>
            {props.map((e, i) => (
              <Input key={i} {...e} name="" placeholder="Enter value..." />
            ))}
          </Flex>
        ))}
      </div>
    );
  },
};

export const Required: Story = {
  args: {},
  render: () => <Input name="username" label="Username" placeholder="Enter username" isRequired />,
};

export const LabelDescription: Story = {
  args: {},
  render: () => (
    <Input
      name="Name"
      label="Name"
      labelDescription="This will be your display name"
      placeholder="Enter username"
    />
  ),
};

export const VeryLongLabelDescription: Story = {
  args: {},
  render: () => (
    <Input
      name="Name"
      label="Culpa reprehenderit amet cupidatat reprehenderit consectetur pariatur. Amet est voluptate excepteur consequat magna et pariatur laborum consequat voluptate."
      labelDescription="Deserunt est tempor in adipisicing magna. Ipsum ad sint elit quis elit et aute proident proident Lorem qui. Aute nulla aliquip nostrud quis anim magna exercitation mollit Lorem anim. Id sit nostrud nisi deserunt enim consectetur reprehenderit sit culpa amet sunt aute sit do. Cillum aliquip laboris cupidatat aute fugiat aliqua. Quis sunt excepteur exercitation proident do qui incididunt aliquip sit ea magna minim."
      placeholder="Enter username"
    />
  ),
};

export const OptionalInputIndicator: Story = {
  args: {},
  render: () => (
    <Input name="User name" label="Username" placeholder="Enter username" optionalLabelIndicator />
  ),
};

export const OptionalInputIndicatorLabelDescription: Story = {
  args: {},
  render: () => (
    <Input
      name="Name"
      label="Name"
      labelDescription="This will be your display name"
      placeholder="Enter username"
      optionalLabelIndicator
    />
  ),
};

export const ErrorMessage: Story = {
  args: {},
  render: () => (
    <Input
      name="User name"
      label="Username"
      placeholder="Enter username"
      errorMessage="This username isn't available"
      defaultValue="daishi"
      isRequired
    />
  ),
};

export const Loading: Story = {
  args: {},
  render: function Loading() {
    const [loading, setLoading] = useState(false);
    return (
      <Input label="Environment" defaultValue="development" loading={loading}>
        <Input.Addon>
          <Button
            size="xs"
            onClick={() => {
              if (!loading) {
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                }, 2000);
              }
            }}
          >
            Submit
          </Button>
        </Input.Addon>
      </Input>
    );
  },
};

export const ErrorMessageInTooltip: Story = {
  args: {},
  render: () => (
    <Input
      name="User name"
      label="Username"
      placeholder="Enter username"
      errorMessage="This username isn't available"
      defaultValue="daishi"
      isRequired
      showValidationMessageInTooltip
    />
  ),
};

export const SuccessMessage: Story = {
  args: {},
  render: () => (
    <Input
      name="User name"
      label="Username"
      placeholder="Enter username"
      successMessage="This username is available!"
      defaultValue="daishi"
    />
  ),
};

export const SuccessMessageInTooltip: Story = {
  args: {},
  render: () => (
    <Input
      name="User name"
      label="Username"
      placeholder="Enter username"
      successMessage="This username is available!"
      defaultValue="daishi"
      showValidationMessageInTooltip
    />
  ),
};

export const InputAddons: Story = {
  args: {},
  render: () => (
    <Flex gap="lg">
      <Input
        name="User name"
        label="Username"
        placeholder="Enter username"
        errorMessage="This username isn't available"
        defaultValue="daishi"
      >
        <Input.Addon
          grouping="outside"
          position="leading"
          iconClassName="i-heroicons-bars-arrow-up-20-solid"
        />
        <Input.Addon
          grouping="inline"
          position="leading"
          iconClassName="i-heroicons-bars-arrow-up-20-solid"
        />
        <Input.Addon
          grouping="inline"
          position="trailing"
          iconClassName="i-heroicons-bars-arrow-up-20-solid"
        />
        <Input.Addon
          grouping="inline"
          position="trailing"
          iconClassName="i-heroicons-bars-arrow-up-20-solid"
        />
        <Input.Addon
          grouping="outside"
          position="trailing"
          iconClassName="i-heroicons-bars-arrow-up-20-solid"
        />
      </Input>
      <Input
        name="Company"
        label="Username"
        placeholder="Enter username"
        errorMessage="This username isn't available"
        defaultValue="daishi"
        size="lg"
      >
        <Input.Addon grouping="inline" focusInputOnClick={false} position="trailing">
          <Button size="xs">View</Button>
        </Input.Addon>
        <Input.Addon
          grouping="outside"
          position="trailing"
          iconClassName="i-heroicons-bars-arrow-up-20-solid"
        />
      </Input>
      <Input
        name="Vehicle"
        label="Username"
        placeholder="Enter username"
        errorMessage="This username isn't available"
        defaultValue="daishi"
        size="lg"
      >
        <Input.Addon grouping="inline" focusInputOnClick={false} position="trailing">
          <Button size="xs">View</Button>
        </Input.Addon>
        <Input.Addon
          grouping="outside"
          position="trailing"
          iconClassName="i-heroicons-bars-arrow-up-20-solid"
        />
      </Input>
      <Input.NumberField type="currency" label="Currency" placeholder="Enter amount" />
    </Flex>
  ),
};

export const FieldTypes: Story = {
  args: {},
  render: () => (
    <div className="space-y-4">
      <Input type="email" name="email" label="Email" placeholder="Enter email" />
      <Input type="password" name="password" label="Password" placeholder="Enter password" />
      <Input.NumberField type="currency" label="Currency" placeholder="Enter amount" />
      <Input type="tel" name="phone" label="Phone" placeholder="Enter phone number" />
      <Input.NumberField
        type="percent"
        name="percent"
        label="Percent"
        placeholder="Enter percent"
      />
      <Input.NumberField name="number" label="Number" placeholder="Enter number" />
      <Input type="month" name="month" label="Month" placeholder="Enter month" />
      <Input type="color" name="color" label="Color" placeholder="Enter color" />
      <Input type="url" name="url" label="Url" placeholder="Enter url" />
      <Input type="date" name="date" label="Date" placeholder="Enter date" />
      <Input type="time" name="time" label="Date/Time" placeholder="Enter date/time" />
      <Input type="datetime-local" name="dt" label="Date/Time" placeholder="Enter date/time" />
    </div>
  ),
};

export const NumberFieldExample = () => {
  return (
    <div>
      <Input.NumberField
        label="Price"
        placeholder="Enter price..."
        defaultValue={1024}
        minValue={0}
      />
    </div>
  );
};
export const CheckboxExample = () => {
  return (
    <div>
      <Input.CheckboxField
        label="Price"
        // placeholder="Enter price..."
        // defaultValue={1024}
        // minValue={0}
      />
    </div>
  );
};
export const CheckboxGroupExample = () => {
  const [environments, setEnvironments] = useState<string[]>(['production']);
  return (
    <Flex gap>
      <Paper border>
        <Input.CheckboxGroupField
          onChange={(e) => {
            setEnvironments(e);
          }}
          columns="2"
          label="Environment"
          value={environments}
          options={mockDataEnvironments.map((e) => ({
            value: e,
            label: e,
            isReadOnly: ['production'].includes(e),
            isDisabled: ['sandbox'].includes(e),
            tooltip: ['production', 'sandbox'].includes(e) && 'Elit labore in Lorem anim.',
          }))}
        />
      </Paper>
      <Paper border>
        <Input.CheckboxGroupField
          label="Status"
          options={mockDataDeploymentStatuses.map((e) => ({
            value: e,
            label: changeCase(e, 'capitalize'),
          }))}
        />
      </Paper>
    </Flex>
  );
};

export const TextAreaExample: Story = {
  args: {},
  render: () => {
    const common: TextAreaFieldProps = {
      rows: 5,
      cols: 50,
      label: 'Description',
      labelDescription:
        'Aute eiusmod do aliquip consequat non quis sit incididunt esse duis cillum nisi amet.',
      placeholder: 'Enter Description...',
      optionalLabelIndicator: true,
    };

    return (
      <div className="flex flex-wrap gap-16">
        <Input.TextAreaField {...common} label="Resizeable" optionalLabelIndicator="Default" />

        <Input.TextAreaField
          {...common}
          label="Resizeable"
          optionalLabelIndicator="True"
          resizeable
        />

        <Input.TextAreaField
          {...common}
          label="Resizeable"
          optionalLabelIndicator="X"
          resizeable="x"
        />

        <Input.TextAreaField
          {...common}
          label="Resizeable"
          optionalLabelIndicator="Y"
          resizeable="y"
        />
      </div>
    );
  },
};
