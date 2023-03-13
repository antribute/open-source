import { CardContainerProps } from 'components/Card/Card';
import { twMerge } from 'tailwind-merge';
import { capitalCase } from 'change-case';
import { Button } from 'components/Button';
import { IconButton } from 'components/IconButton/IconButton';
import { HeartIcon } from '@heroicons/react/24/solid';
import { Input } from 'components/Input';
import { Combobox } from 'components/Combobox';
import {
  generateMockProjectList,
  generateMockUserList,
  generateMockVehicle,
  generateMockVehicleList,
} from 'mock/mock-data';
import { Tabs } from 'components/Tabs';
import { useState } from 'react';
import { surfaceColors } from 'styles/surface-colors.variants';
import { ColorSchemeName, colorSchemeNames } from '@antribute/zephyr-core';
import { MockSidebar } from 'components/List/List.stories';
import { Paper } from 'components/Paper';
import { Card } from '.';

type ExampleCardProps = CardContainerProps;

const ExampleCard = ({ colorScheme: colorSchemeProp, children, ...props }: ExampleCardProps) => {
  const [colorScheme, setColorScheme] = useState<ColorSchemeName>(colorSchemeProp ?? 'surface');

  return (
    <Card.Container colorScheme={colorScheme} {...props}>
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
              <Input label="Project Name" placeholder="Enter Name" width="full" />
              <Combobox
                width="full"
                label="Theme"
                value={colorScheme}
                options={colorSchemeNames}
                getOptionLabel={(color) => {
                  return capitalCase(color ?? 'Surface');
                }}
                onValueChange={(c) => {
                  setColorScheme(c);
                }}
              />

              {children}
            </Tabs.View>

            <Tabs.View value="details">
              <Combobox
                width="full"
                label="Owner"
                options={generateMockUserList({ size: 30 })}
                getOptionLabel={({ name }) => {
                  return name;
                }}
              />
              <Combobox
                width="full"
                label="Collection"
                options={generateMockProjectList({ size: 30 })}
                getOptionLabel={({ name }) => {
                  return name;
                }}
              />
              <Combobox
                width="full"
                label="Collection"
                options={generateMockProjectList({ size: 30 })}
                getOptionLabel={({ name }) => {
                  return name;
                }}
              />
              <Combobox
                width="full"
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

export const Default = () => {
  return <ExampleCard className="w-352" />;
};

export const CardThemes = (props: ExampleCardProps) => {
  return (
    <div className="space-x-26 fixed flex h-full w-full justify-between pb-[5%]">
      <div className="grid w-full max-w-screen-lg grid-cols-9 gap-16">
        {colorSchemeNames
          .filter((e) => e !== 'default')
          .map((e) => {
            return <ExampleCard {...props} colorScheme={e} className="col-span-3" />;
          })}
      </div>
    </div>
  );
};

export const NoPadding = () => {
  return <CardThemes padding={false} />;
};
