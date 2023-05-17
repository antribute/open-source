import type { Meta, StoryObj } from '@storybook/react';
import { capitalCase } from 'change-case';
import { Button } from 'components/Button';
import { IconButton } from 'components/IconButton/IconButton';
import { Input } from 'components/Input';
import { Combobox } from 'components/Combobox';
import { generateMockProjectList, generateMockUserList } from 'mock/mock-data';
import { Tabs } from 'components/Tabs';
import { useState } from 'react';
import { ColorSchemeName, colorSchemeNames, mainColorSchemeNames } from 'config';
import { twMerge } from 'tailwind-merge';
import { CardContainerProps } from 'components/Card/Card';
import { Card } from '.';

const meta = {
  args: {},
  title: 'Input/Card',
} satisfies Meta<object>;

export default meta;

type Story = StoryObj<typeof meta>;

const ExampleCard = ({
  colorScheme: colorSchemeProp,
  children,
  className,
  ...props
}: CardContainerProps) => {
  const [colorScheme, setColorScheme] = useState<ColorSchemeName>(colorSchemeProp ?? 'surface');

  return (
    <Card.Container
      colorScheme={colorScheme}
      className={twMerge(className, 'min-h-[475px]')}
      {...props}
    >
      <Card.TitleSection>
        <Card.Title>Add New Project</Card.Title>

        <Card.GroupSpacer>
          <IconButton
            color="secondary"
            size="xs"
            variant="glass"
            className="i-heroicons-chat-bubble-bottom-center-solid"
          />
          <IconButton
            color="secondary"
            size="xs"
            variant="glass"
            hoverBackgroundColor="heart"
            className="i-heroicons-heart-solid"
          />
        </Card.GroupSpacer>
      </Card.TitleSection>

      <Card.BodySection>
        <Tabs.Root defaultValue="contact" className="w-full">
          <Tabs.List>
            <Tabs.Tab value="contact">Details</Tabs.Tab>
            <Tabs.Tab value="details">Metadata</Tabs.Tab>
          </Tabs.List>
          <Tabs.ViewContainer>
            <Tabs.View value="contact">
              <Input label="Project Name" placeholder="Enter Name" fullWidth />
              <Combobox
                fullWidth
                label="Theme"
                value={colorScheme}
                options={colorSchemeNames}
                getOptionLabel={(color) => {
                  return capitalCase(color);
                }}
                onValueChange={(c) => {
                  setColorScheme(c);
                }}
              />

              {children}
            </Tabs.View>

            <Tabs.View value="details">
              <Combobox
                fullWidth
                label="Owner"
                options={generateMockUserList({ size: 30 })}
                getOptionLabel={({ name }) => {
                  return name;
                }}
              />
              <Combobox
                fullWidth
                label="Collection"
                options={generateMockProjectList({ size: 30 })}
                getOptionLabel={({ name }) => {
                  return name;
                }}
              />
              <Combobox
                fullWidth
                label="Collection"
                options={generateMockProjectList({ size: 30 })}
                getOptionLabel={({ name }) => {
                  return name;
                }}
              />
              <Combobox
                fullWidth
                label="Collection"
                options={generateMockProjectList({ size: 30 })}
                getOptionLabel={({ name }) => {
                  return name;
                }}
              />

              <Card.Description className="mb-8">
                Lorem labore magna eiusmod id eiusmod cillum ex dolore amet ullamco ex. Anim ullamco
                ex sit elit ut.
              </Card.Description>

              {children}
            </Tabs.View>
          </Tabs.ViewContainer>
        </Tabs.Root>
      </Card.BodySection>

      <Card.FooterSection className="shrink-0 px-8">
        <Card.GroupSpacer grow>
          <Button color="primary" variant="ghost" size="xs" className="">
            Prev
          </Button>
          <Button color="secondary" variant="outlined" size="xs" className="">
            Next
          </Button>
        </Card.GroupSpacer>
        <Card.GroupSpacer>
          <Button color="secondary" hoverBackgroundColor="danger" variant="glass" size="xs">
            Cancel
          </Button>
          <Button variant="filled" size="xs" className="">
            Create
          </Button>
        </Card.GroupSpacer>
      </Card.FooterSection>
    </Card.Container>
  );
};

export const Default: StoryObj = {
  args: {},
  render: () => <ExampleCard className="w-352" />,
};

export const CardThemes: Story = {
  args: {},
  render: () => {
    return (
      <div className="space-x-26 flex h-full w-full justify-between pb-[5%]">
        <div className="grid w-full max-w-screen-lg grid-cols-9 gap-16">
          {mainColorSchemeNames
            .filter((e) => e !== 'default')
            .map((e) => {
              return <ExampleCard colorScheme={e} className="col-span-3" />;
            })}
        </div>
      </div>
    );
  },
};

export const NoPadding: Story = {
  args: {
    padding: false,
  },
  render: () => (
    <div className="space-x-26 fixed flex h-full w-full justify-between pb-[5%]">
      <div className="grid w-full max-w-screen-lg grid-cols-9 gap-16">
        {mainColorSchemeNames
          .filter((e) => e !== 'default')
          .map((e) => {
            return <ExampleCard colorScheme={e} className="col-span-3" />;
          })}
      </div>
    </div>
  ),
};
