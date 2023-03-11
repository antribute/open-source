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

type ExampleCardProps = CardContainerProps & { childCard?: React.ReactNode };

const ExampleCard = ({
  className,
  colorScheme: colorSchemeProp,
  childCard,
  ...props
}: ExampleCardProps) => {
  const [colorScheme, setColorScheme] = useState<ColorSchemeName>(colorSchemeProp ?? 'surface');

  return (
    <Card.Container
      colorScheme={colorScheme}
      border
      className={twMerge('col-span-2 shadow-lg flex flex-col', className)}
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

      <Card.BodySection className="h-256 grow">
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

              {childCard}
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

              {childCard}
            </Tabs.View>
          </Tabs.ViewContainer>
        </Tabs.Root>
      </Card.BodySection>

      <Card.FooterSection>
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

const CardGrid = ({ count = 6, ...props }: ExampleCardProps & { count?: number }) => {
  const cards = new Array(count).fill(0);

  return (
    <>
      {cards.map((key) => (
        <ExampleCard key={key} {...props} />
      ))}
    </>
  );
};

export const CardThemes = () => {
  return (
    <div className="space-x-26 fixed flex h-full w-full justify-between pb-[5%]">
      <div className="grid w-full max-w-screen-lg grid-cols-9 gap-16">
        {colorSchemeNames
          .filter((e) => e !== 'default')
          .map((e) => {
            return <ExampleCard colorScheme={e} className="col-span-3" />;
          })}
      </div>
    </div>
  );
};

export const Default = () => {
  return (
    <div className="grid grid-cols-12 gap-16">
      <CardGrid colorScheme="surface" />
      <CardGrid colorScheme="surface-light" />
      <CardGrid colorScheme="surface-dark" />
      <CardGrid colorScheme="neutral" />
      <CardGrid colorScheme="neutral-light" />
      <CardGrid colorScheme="neutral-dark" />
      <CardGrid colorScheme="inverse" />
      {/* ---- Nested ---- 
      <CardGrid
        colorScheme="surface"
        childCard={
          <Card.Container colorScheme="surface-light">
            <Card.BodySection className="text-md">
              Lorem labore magna eiusmod id eiusmod cillum.
            </Card.BodySection>
          </Card.Container>
        }
      />
      <CardGrid
        colorScheme="surface-light"
        childCard={
          <Card.Container colorScheme="surface">
            <Card.BodySection>Lorem labore magna eiusmod id eiusmod cillum.</Card.BodySection>
          </Card.Container>
        }
      />
      <CardGrid
        colorScheme="surface-dark"
        childCard={
          <Card.Container colorScheme="surface-light">
            <Card.BodySection>Lorem labore magna eiusmod id eiusmod cillum.</Card.BodySection>
          </Card.Container>
        }
      />
      <CardGrid
        colorScheme="neutral"
        childCard={
          <Card.Container colorScheme="neutral-dark">
            <Card.BodySection>Lorem labore magna eiusmod id eiusmod cillum.</Card.BodySection>
          </Card.Container>
        }
      />
      <CardGrid
        colorScheme="neutral-light"
        childCard={
          <Card.Container colorScheme="neutral">
            <Card.BodySection>Lorem labore magna eiusmod id eiusmod cillum.</Card.BodySection>
          </Card.Container>
        }
      />
      <CardGrid
        colorScheme="neutral-dark"
        childCard={
          <Card.Container colorScheme="neutral">
            <Card.BodySection>Lorem labore magna eiusmod id eiusmod cillum.</Card.BodySection>
          </Card.Container>
        }
      />
      <CardGrid
        colorScheme="inverse"
        childCard={
          <Card.Container colorScheme="inverse-light">
            <Card.BodySection>Lorem labore magna eiusmod id eiusmod cillum.</Card.BodySection>
          </Card.Container>
        }
      /> */}
    </div>
  );
};
