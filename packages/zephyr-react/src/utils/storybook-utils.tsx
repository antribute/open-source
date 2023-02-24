import { LiteralUnion } from 'type-fest';
import { VariantProps, classed } from '@tw-classed/react';
import { capitalCase } from 'change-case';
import { ColorProp, SizeProp } from 'types/styles';
import { Text } from 'components/Text';

type RenderVariantElementProps = Partial<VariantProps<typeof RenderVariantElement>>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ReactComponent = keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>;

interface RenderVariantBaseProps<T extends ReactComponent, TProp extends string = string>
  extends RenderVariantElementProps {
  className?: string;
  Component: T;
  render?: (children: React.ReactNode) => React.ReactNode;
  props?: React.ComponentProps<T>;
  getProps?: (prop: TProp) => React.ComponentProps<T>;
  showVariantLabel?: boolean;
  variantPropName?: string;
  noChildren?: boolean;
}

const RenderVariantElement = classed('div', {
  variants: {
    orientation: {
      vertical: 'flex-col space-y-24',
      horizontal: 'flex gap-24 items-center flex-wrap',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

interface RenderSizeVariantProps<T extends React.ComponentType>
  extends RenderVariantBaseProps<T, LiteralUnion<'size', string>> {
  sizes?: SizeProp[];
}

const keys = {
  colors: [
    'neutral',
    'surface',
    'primary',
    'info',
    'caution',
    'danger',
    'positive',
  ] satisfies LiteralUnion<ColorProp, string>[],
  sizes: ['xs', 'sm', 'md', 'lg'] as LiteralUnion<SizeProp, string>[],
} satisfies Record<string, LiteralUnion<string, string>[]>;

export const getSizeKeys = () => {
  return keys.sizes;
};

export const getColorKeys = () => {
  return keys.colors;
};

export const RenderSizeVariants = <T extends React.ComponentType>({
  variantPropName = 'size',
  sizes = ['xs', 'sm', 'md', 'lg'],
  Component,
  render = (children) => children,
  props,
  getProps,
  orientation = 'horizontal',
}: RenderSizeVariantProps<T>) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Element = Component as React.ComponentType<any>;
  return (
    <RenderVariantElement orientation={orientation}>
      {sizes.map((size) => {
        const elementProps = getProps?.(size) ?? props;
        return <div>{render(<Element {...elementProps} {...{ [variantPropName]: size }} />)}</div>;
      })}
    </RenderVariantElement>
  );
};

interface ColorSizeVariantProps<T extends React.ComponentType>
  extends RenderVariantBaseProps<T, LiteralUnion<'color', string>> {
  colors?: LiteralUnion<ColorProp, string>[];
}

export const RenderColorVariants = <T extends React.ComponentType>({
  colors = keys.colors,
  Component,
  noChildren,
  render = (children) => children,
  props,
  getProps,
  className,
  orientation = 'horizontal',
  variantPropName = 'color',
}: ColorSizeVariantProps<T>) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Element = Component as React.ComponentType<any>;

  return (
    <RenderVariantElement className={className} orientation={orientation}>
      {colors.map((color) => {
        const elementProps = getProps?.(color) ?? props;
        return (
          <div>
            <Text className="my-8 block select-none" fontWeight="bold" color="weak" size="xs">
              {capitalCase(color)}
            </Text>
            {render(
              <Element
                // eslint-disable-next-line react/no-children-prop
                children={noChildren ? undefined : capitalCase(color)}
                {...elementProps}
                {...{ [variantPropName]: color }}
              />
            )}
          </div>
        );
      })}
    </RenderVariantElement>
  );
};

export const getStoryUrl = () => {
  const searchParams = new URLSearchParams(window.location.search);

  const id = searchParams.get('id') ?? '';

  return `${window.location.protocol}//${window.location.host}/?path=/story/${id}`;
};
