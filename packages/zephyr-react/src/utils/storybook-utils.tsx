import { VariantProps, classed } from '@tw-classed/react';
import { ColorProp, SizeProp } from 'types/styles';

type RenderVariantElementProps = Partial<VariantProps<typeof RenderVariantElement>>;

interface RenderVariantBaseProps<T extends React.ComponentType> extends RenderVariantElementProps {
  className?: string;
  Component: T;
  render?: (children: React.ReactNode) => React.ReactNode;
  props?: React.ComponentProps<T>;
  showVariantLabel?: boolean;
  variantPropName?: string;
}

const RenderVariantElement = classed('div', {
  variants: {
    orientation: {
      vertical: 'flex-col gap-y-24',
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
  sizes = ['sm', 'md', 'lg'],
  Component,
  render = (children) => children,
  props,
  orientation = 'horizontal',
}: RenderSizeVariantProps<T>) => {
  const Element = Component as React.ComponentType<any>;
  return (
    <RenderVariantElement orientation={orientation}>
      {sizes.map((size) => (
        <div>{render(<Element {...props} {...{ [variantPropName]: size }} />)}</div>
      ))}
    </RenderVariantElement>
  );
};

interface ColorSizeVariantProps<T extends React.ComponentType> extends RenderVariantBaseProps<T> {
  colors?: ColorProp[];
}

export const RenderColorVariants = <T extends React.ComponentType>({
  colors = ['primary', 'secondary', 'caution', 'danger', 'positive'],
  Component,
  render = (children) => children,
  props,
  className,
  orientation = 'horizontal',
  variantPropName = 'color',
}: ColorSizeVariantProps<T>) => {
  const Element = Component as React.ComponentType<any>;
  return (
    <RenderVariantElement className={className} orientation={orientation}>
      {colors.map((color) => (
        <div>
          <div>{}</div> {render(<Element {...props} {...{ [variantPropName]: color }} />)}
        </div>
      ))}
    </RenderVariantElement>
  );
};
