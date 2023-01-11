import { VariantProps, classed } from '@tw-classed/react';
import { capitalCase } from 'change-case';
import { ColorProp, SizeProp } from 'types/styles';

type RenderVariantElementProps = Partial<VariantProps<typeof RenderVariantElement>>;

interface RenderVariantBaseProps<T extends React.ComponentType> extends RenderVariantElementProps {
  className?: string;
  Component: T;
  render?: (children: React.ReactNode) => React.ReactNode;
  props?: React.ComponentProps<T>;
  getProps?: (prop: string) => React.ComponentProps<T>;
  showVariantLabel?: boolean;
  variantPropName?: string;
  noChildren?: boolean;
}

const RenderVariantElement = classed('div', {
  variants: {
    orientation: {
      vertical: 'flex-col space-y-24',
      horizontal: 'flex gap-24 items-center',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

interface RenderSizeVariantProps<T extends React.ComponentType> extends RenderVariantBaseProps<T> {
  sizes?: SizeProp[];
}

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

interface ColorSizeVariantProps<T extends React.ComponentType> extends RenderVariantBaseProps<T> {
  colors?: ColorProp[];
}

export const RenderColorVariants = <T extends React.ComponentType>({
  colors = ['primary', 'secondary', 'caution', 'danger', 'positive'],
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
            {render(
              <Element
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
