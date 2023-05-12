import { StoryObj } from '@storybook/react';
import { ColorPicker, ColorArea, ColorSlider } from '.';
import { parseColor } from '@react-stately/color';
import { useState } from 'react';
import { Flex, FlexProps } from 'components/Flex';
import { Paper } from 'components/Paper';
import { Card } from 'components/Card';
import { NumberField } from 'react-aria-components';
import { Label } from 'react-aria-components';
import { Group } from 'react-aria-components';
import { Button } from 'react-aria-components';
import { Input } from 'react-aria-components';
import { useRef } from 'react';
import { NumberFieldContext } from 'react-aria-components';
import { useNumberField } from 'react-aria';
import { ColorSwatch } from 'components/ColorPicker/ColorSwatch';

const meta = {
  args: {},
  title: 'Input/ColorPicker',
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return <ColorPicker />;
  },
};

export const ColorAreaEaxmple: Story = {
  render: () => {
    return <ColorArea />;
  },
};

const CardContainer = ({
  title,
  children,
  direction = 'column',
  gap = true,
  ...props
}: {
  className?: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  direction?: 'row' | 'column';
  gap?: FlexProps['gap'];
}) => {
  return (
    <Card.Container {...props} className="min-h-[370px] h-full w-full">
      <Card.TitleSection>
        <Card.Title>{title}</Card.Title>
      </Card.TitleSection>
      <Card.BodySection>
        <Flex gap={gap} dir={direction} className="pt-8" fullWidth>
          {children}
        </Flex>
      </Card.BodySection>
    </Card.Container>
  );
};
export const ColorSliderExample: Story = {
  render: () => {
    let [color, setColor] = useState(parseColor('#7f007f'));
    return (
      <Flex gap>
        <CardContainer title="RGBA">
          <ColorSlider channel="red" value={color} onChange={setColor} />
          <ColorSlider channel="green" value={color} onChange={setColor} />
          <ColorSlider channel="blue" value={color} onChange={setColor} />
          <ColorSlider channel="alpha" value={color} onChange={setColor} />
        </CardContainer>
        <CardContainer title="Hue">
          <ColorSlider channel="hue" defaultValue="hsl(0, 100%, 50%)" />
        </CardContainer>
      </Flex>
    );
  },
};

export const HslExample: Story = {
  render: () => {
    const [color, setColor] = useState(parseColor('hsl(219, 79%, 66%)'));

    const [hueChannel, saturationChannel, brightnessChannel] = color.getColorChannels();

    return (
      <Flex gap>
        <CardContainer
          title={
            <Flex gap align="center">
              <ColorSwatch color={color} />
              <div>HSL</div>
            </Flex>
          }
        >
          <Flex gap wrap>
            {[
              {
                xChannel: saturationChannel,
                yChannel: brightnessChannel,
                sliderChannel: hueChannel,
              },
              {
                xChannel: hueChannel,
                yChannel: brightnessChannel,
                sliderChannel: saturationChannel,
              },
              {
                xChannel: hueChannel,
                yChannel: saturationChannel,
                sliderChannel: brightnessChannel,
              },
            ].map(({ xChannel, yChannel, sliderChannel }, index) => {
              const id = `hsl-${index}`;
              return (
                <Flex gap column="reverse" className="min-w-[200px]" grow>
                  <label
                    className="text-xs text-content-subtle mb-2 select-none sticky top-0"
                    id={id}
                  >
                    x: {color.getChannelName(xChannel, 'en-US')}, y:{' '}
                    {color.getChannelName(yChannel, 'en-US')}
                  </label>
                  <ColorArea
                    aria-labelledby={id}
                    className="border border-boundary-ghost"
                    xChannel={xChannel}
                    yChannel={yChannel}
                    value={color}
                    onChange={setColor}
                  />

                  <>
                    <ColorSlider channel={sliderChannel} value={color} onChange={setColor} />
                  </>
                </Flex>
              );
            })}
          </Flex>
        </CardContainer>
      </Flex>
    );
  },
};
