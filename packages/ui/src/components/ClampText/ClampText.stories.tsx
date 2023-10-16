import type { Meta, StoryObj } from '@storybook/react';

import { Text } from 'components/Text';
import { Flex } from 'components/Flex';
import { faker } from '@faker-js/faker';
import { Paper } from 'components/Paper';
import { Detail } from 'components/Detail';
import { lowerFirst } from 'lodash-es';
import { Masonry } from 'react-plock';
import type { ClampTextProps } from './ClampText';
import { ClampText } from './ClampText';

const meta = {
  args: {},
  title: 'Misc/ClampText',
  component: ClampText,
} satisfies Meta<typeof ClampText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: () => {
    return (
      <Flex gap align="center" justify="center" className="h-[70vh]">
        <div className="w-256 space-y-6">
          <Text.Subheading block>
            <ClampText showMoreInTooltip maxLines={1}>
              {`Lorem `}
              {lowerFirst(faker.lorem.words(4))}
            </ClampText>
          </Text.Subheading>

          <ClampText showMoreInCollapisbleArea maxLines={2}>
            <Text.Subtitle>
              <Text font="body" fontWeight="bold">
                {`Ipsum `}
              </Text>
              {lowerFirst(faker.lorem.words(10))}
            </Text.Subtitle>
          </ClampText>

          <Text.Description block>
            <ClampText showMoreInCollapisbleArea maxLines={3}>
              <Text bold color="danger">
                Erium eum amet?
              </Text>
              <Text.Dash />
              <Text>
                Reprehenderit nostrum est aliquid earum. Rem neque reprehenderit vero amet sit
                deleniti laborum. Commodi esse quas eum odit earum nesciunt quo quod distinctio.
                Maxime enim et quidem totam vero pariatur debitis assumenda veritatis.
              </Text>
            </ClampText>
          </Text.Description>
        </div>
      </Flex>
    );
  },
};

faker.seed(1);

const ClampTextMock = (props: ClampTextProps) => {
  const items = Array.from({ length: 15 })
    .fill(0)
    .map((_, i) => i);
  return (
    <Masonry
      items={items}
      config={{
        columns: 3,
        gap: 8,
      }}
      render={(_, idx) => (
        <Paper border key={idx}>
          <Detail
            className="pb-16"
            subheading="Introduction"
            subtitle={
              <ClampText {...props} maxLines={1}>
                {faker.lorem.words(20)}
              </ClampText>
            }
          />
          <Detail
            className="pb-16"
            title="Summary"
            body={
              <ClampText className="whitespace-pre-line" maxLines={6} {...props}>
                {Array.from({ length: 5 })
                  .fill(0)
                  .map(() => (
                    <>{faker.lorem.paragraph(5)}</>
                  ))}
              </ClampText>
            }
          />
          <Detail
            className="pb-16"
            overline="Footnote"
            description={<ClampText {...props}>{faker.lorem.paragraphs(3)}</ClampText>}
          />
        </Paper>
      )}
    />
  );
};

export const CollapsibleTooltip: Story = {
  args: {},
  render: () => <ClampTextMock showMoreInCollapisbleArea />,
};

export const HoverTooltip: Story = {
  args: {},
  render: () => <ClampTextMock showMoreInTooltip />,
};
