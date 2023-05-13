/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { StoryObj } from '@storybook/react';
import { parse, Hsl, hsl, formatCss, nearest, differenceEuclidean } from 'culori';
import { Flex } from 'components/Flex';
import { proxy, useSnapshot } from 'valtio';
import { proxyMap } from 'valtio/utils';
import { Any, O } from 'ts-toolbelt';
import { Button } from 'components/Button';
import { createForm } from 'components/Form/createForm';
import { z } from 'zod';
import defaultTailwindColors from 'tailwindcss/colors';
import { DefaultColors } from 'tailwindcss/types/generated/colors';
import { Path } from '@clickbar/dot-diver';
import { flatten } from 'flat';
import { mapValues, pickBy } from 'lodash-es';
import clsx from 'clsx';
import { paletteColorsConfig } from '@antribute/zephyr-core';
import { Tabs } from 'components/Tabs';
import { Paper } from 'components/Paper';

const meta = {
  args: {},
  title: 'Palette Editor',
};

export default meta;

const baseColors = mapValues(
  pickBy(paletteColorsConfig, (e) => typeof e === 'object' && '100' in e),
  (e) => e.DEFAULT
) as Record<string, string>;

const initialPaletteColors = {
  heart: '#e6007e',
  info: '#06b6d4',
  caution: '#ffbf00',
  danger: '#ff3140',
  success: '#10b981',
  ...baseColors,
};

type Story = StoryObj<typeof meta>;

const { Form, schemas } = createForm();

const CreateSchemeForm = z.object({
  name: schemas.stringfield.describe('Scheme Name // Ex: Neutral-Dark'),
  p: schemas.selectfield.describe('Sel'),
  // mode: schemas.CheckboxField,
});

function CreateColorSchemeForm() {
  return (
    <Form
      formProps={{ className: 'flex items-center gap-16' }}
      schema={CreateSchemeForm}
      renderAfter={() => {
        return (
          <Button type="submit" size="md">
            Submit
          </Button>
        );
      }}
      onSubmit={() => {
        console.log('ON SUBMIT', p);
      }}
      props={{
        p: {
          getOptionLabel: (e: string) => e,
          options: ['e', 'b', 'c'],
        },
      }}
    />
  );
}

export const Default: Story = {
  parameters: {
    layout: 'fullScreen',
  },
  render: () => {
    return (
      <Tabs.Root defaultValue="schemes" className="relative ">
        <div className="fixed top-0 p-20 bg-base w-full  z-50">
          <Paper colorScheme="surface-soft h- bg-danger w-full">
            <Tabs.List className="bg-surface ">
              <Tabs.Tab value="schemes">Schemes</Tabs.Tab>
              <Tabs.Tab value="palette">Palette</Tabs.Tab>
            </Tabs.List>
          </Paper>
        </div>

        <div className="max-h-[100vh] overflow-auto pt-104 flex flex-col items-center">
          <Tabs.View value="schemes">
            <ColorSchemeEditor />
          </Tabs.View>
          <Tabs.View value="palette">
            <PaletteEditor />
          </Tabs.View>
        </div>
      </Tabs.Root>
    );
  },
};

function ColorSchemeEditor() {
  return (
    <div>
      <CreateColorSchemeForm />
    </div>
  );
}

console.log({ baseColors });
const store = proxy<{ paletteColors: Map<string, GeneratedShade> }>({
  paletteColors: proxyMap(createPaletteMap(initialPaletteColors)),
});

const actions = {
  addPaletteColor: ({ color, name }: { name: string; color: string }) => {
    store.paletteColors.set(name, generateTailwindShades({ name, baseColor: color }));
  },
  deletePaletteColor: ({ name }: { name: string }) => {
    store.paletteColors.delete(name);
  },
};

// type PaletteColor<TName extends string = string> = { name: TName } & ReturnType<
//   typeof getColorData
// >;

function createPaletteMap<const T extends Record<Any.Key, string>>(colorMap: T) {
  // return mapValues(colors, (hex, key) => {
  //   const colorData = getColorData(hex!);

  //   return { ...colorData, id: key };
  // }) as { [K in keyof T]: PaletteColor };

  const entries = Object.entries(colorMap) as [keyof T, string][];

  return new Map<keyof T, GeneratedShade>(
    entries.map(([key, value]) => {
      return [key, generateTailwindShades({ name: key as string, baseColor: value })];
    })
  );
}

function isValidColor(value: string) {
  return Boolean(parse(value));
}
const ColorSchema = z.object({
  name: schemas.stringfield.describe('Color Name // Ex: Sky Blue...'),
  color: schemas.stringfield
    .describe('Color // Ex: #00000')
    .refine(isValidColor, { message: 'Invalid color' }),
});

function ColorForm() {
  return (
    <Form
      formProps={{ className: 'flex items-center gap-16' }}
      schema={ColorSchema}
      onSubmit={(data) => {
        const { color, name } = data;
        actions.addPaletteColor({ color, name });
      }}
    >
      {({ color, name }) => (
        <Flex align="center">
          <Flex className="gap-8" wrap>
            {name}
            {color}
          </Flex>
          <div>
            <Button size="md" type="submit">
              Submit
            </Button>
          </div>
        </Flex>
      )}
    </Form>
  );
}

const RenderColorScale = ({ name, shades }: { name: string; shades: Shade[] }) => {
  return (
    <Flex gap="sm" shrink={false}>
      <div>{name}</div>
      {shades.map(({ color, shadeName, isBaseShade }) => {
        return (
          <div
            style={{ backgroundColor: color }}
            className={clsx(
              'h-64 w-64 rounded-md flex items-center justify-center',

              {
                'font-bold underline underline-offset-4': isBaseShade,
              }
            )}
          >
            <span> {shadeName}</span>
          </div>
        );
      })}
    </Flex>
  );
};

interface Shade {
  shadeName: string;
  color: string;
  isBaseShade: boolean;
}

function getShadesListData({ shades, ...props }: GeneratedShade): Omit<GeneratedShade, 'shades'> & {
  shades: (Omit<GeneratedShade, 'shades'> & Shade)[];
} {
  return {
    ...props,
    shades: Object.entries(shades).map(([shadeName, color]) => ({
      ...props,
      shadeName,
      color,
      isBaseShade: shadeName === props.baseShade,
    })),
  };
}

function PaletteEditor() {
  const { paletteColors } = useSnapshot(store);

  const paletteShadeList = Array.from(paletteColors.values()).map((e) => getShadesListData(e));

  return (
    <div>
      <ColorForm />

      {paletteShadeList.map(({ name, shades }) => {
        return (
          <div>
            {name}
            <RenderColorScale name={name} shades={shades} />
          </div>
        );
      })}
    </div>
  );
}

const colorScale = {
  50: '',
  100: '',
  200: '',
  300: '',
  400: '',
  500: '',
  600: '',
  700: '',
  800: '',
  900: '',
  950: '',
};

interface GeneratedShade {
  name: string;
  baseColor: string;
  baseShade: string;
  shades: ColorShades;
}

function generateTailwindShades(options: { baseColor: string; name: string }): GeneratedShade {
  const defaultTailwindScales = pickBy(defaultTailwindColors, (v) => typeof v === 'object');

  const flattenedTwColors = flatten(defaultTailwindScales) as FlattenedTailwindColorScales;

  const defaultTwScalePaths = Object.keys(flattenedTwColors) as DefaultTailwindScalePath[];

  const { baseColor: rawBaseColor, name } = options;

  const baseColor = parse(rawBaseColor)!;

  const baseHsl = hsl(baseColor)!;

  const nearestDefaultColorPath = nearest(
    defaultTwScalePaths,
    differenceEuclidean(),
    (name) => flattenedTwColors[name]
  )(baseColor, 1)[0];

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!nearestDefaultColorPath) {
    return { name, baseColor: options.baseColor, baseShade: '', shades: colorScale };
  }

  const parts = nearestDefaultColorPath.split('.');

  const defaultColorName = parts[0] as DefaultTailwindColor;

  const defaultColorShadeName = parts[1] as ColorShadeKey;

  const shades = mapValues(
    defaultTailwindScales[defaultColorName],
    (shadeValue: string, shadeName: ColorShadeKey) => {
      if (shadeName === defaultColorShadeName) {
        return formatCss(baseHsl);
      }

      const defaultHsl = hsl(shadeValue)!;

      const hueDifference = baseHsl.h! - defaultHsl.h!;

      const newHsl = {
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        h: defaultHsl.h! + hueDifference,
        l: defaultHsl.l,
        s: defaultHsl.s,
        mode: defaultHsl.mode,
      } satisfies Hsl;

      return formatCss(newHsl);
    }
  ) as unknown as ColorShades;

  console.log('shades', shades);

  return { name, baseColor: options.baseColor, baseShade: defaultColorShadeName, shades };
}

type DefaultTailwindScalePath = Exclude<
  Path<DefaultTailwindColorScales>,
  keyof DefaultTailwindColorScales
>;

type DefaultTailwindColorScales = O.Select<DefaultColors, object>;

type DefaultTailwindColor = keyof DefaultTailwindColorScales;

type FlattenedTailwindColorScales = Record<DefaultTailwindScalePath, string>;

type ColorShadeKey = keyof DefaultTailwindColorScales['blue'];

type ColorShades = Record<keyof DefaultTailwindColorScales['blue'], string>;
