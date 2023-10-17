import { BoltIcon } from '@heroicons/react/24/solid';
import type { Meta, StoryObj } from '@storybook/react';

import { Card } from 'components/Card';
import type { FlexProps } from 'components/Flex/Flex';
import { Flex } from 'components/Flex/Flex';
import { IconButton } from 'components/IconButton/IconButton';
import { getSizeKeys } from 'utils/storybook-utils';

const meta = {
  args: {},
  title: 'Layout/Flex',
  component: Flex,
} satisfies Meta<typeof Flex>;

export default meta;
type Story = StoryObj<typeof meta>;

const FlexExample = ({ label, ...props }: FlexProps & { label?: string }) => {
  return (
    <Card.Container className="w-full" colorScheme="inverse">
      <Card.TitleSection>
        <Card.Title>{label}</Card.Title>
      </Card.TitleSection>
      <Card.BodySection className="h-152">
        <Flex gap className="h-full" {...props}>
          {getSizeKeys().map((size, i) => {
            return (
              <div>
                <IconButton size={size} variant="outlined" key={i}>
                  <BoltIcon />
                </IconButton>
              </div>
            );
          })}
        </Flex>
      </Card.BodySection>
    </Card.Container>
  );
};

export const Justify: Story = {
  args: {},
  render: () => (
    <div className="space-y-8">
      <FlexExample justify="start" label="Justify: start" />
      <FlexExample justify="end" label="Justify: end" />
      <FlexExample justify="center" label="Justify: center" />
      <FlexExample justify="between" label="Justify: between" />
      <FlexExample justify="around" label="Justify: around" />
      <FlexExample justify="evenly" label="Justify: evenly" />
    </div>
  ),
};

export const Align: Story = {
  args: {},
  render: () => (
    <div className="space-y-8">
      <FlexExample justify="start" label="align: start" />
      <FlexExample align="end" label="align: end" />
      <FlexExample align="center" label="align: center" />
      <FlexExample align="baseline" label="align: between" />
      <FlexExample align="stretch" label="align: around" />
    </div>
  ),
};

export const Center: Story = {
  args: {},
  render: () => <FlexExample centerAlign label="centerAlign: true" />,
};

export const Gap: Story = {
  args: {},
  render: () => (
    <div className="space-y-8">
      {getSizeKeys().map((size) => {
        return <FlexExample gap={size} label={`Gap: ${size}`} />;
      })}
    </div>
  ),
};
