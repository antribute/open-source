import type { LiteralUnion } from 'type-fest';
import type { VariantProps } from '@tw-classed/react';
import { classed } from '@tw-classed/react';
import { capitalCase } from 'change-case';
import type { ColorProp, SizeProp } from 'types/styles';
import type { PaperProps } from 'components/Paper';
import { Paper } from 'components/Paper';
import { Wrap } from 'components/Wrap';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { Tooltip } from 'components/Tooltip';
import type { ColorSchemeName } from 'config';
import { mainColorSchemeNames } from 'config';
import { capitalize } from 'lodash-es';

type RenderVariantElementProps = Partial<VariantProps<typeof RenderVariantElement>>;

type ReactComponent = keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>;

export const RenderPaperContainers = ({
  children,
  renderTransparentPaper,
  className,
  orientation = 'vertical',
  hasContainer = true,
  containerClassName,
  ...props
}: RenderPaperContainersProps) => {
  const colors = (['transparent', ...mainColorSchemeNames] as const).filter((color) => {
    if (color === 'transparent') {
      return renderTransparentPaper;
    }

    return color !== 'default';
  });

  return (
    <Wrap
      if={hasContainer}
      wrap={(c) => (
        <div
          className={twMerge(
            clsx('inline-flex gap-16', {
              'flex-row': orientation === 'horizontal',
              'flex-row flex-wrap': orientation === 'vertical',
            }),
            containerClassName
          )}
        >
          {c}
        </div>
      )}
    >
      {colors.map((color) => {
        const colorScheme = color === 'transparent' ? undefined : color;
        return (
          <Paper
            key={colorScheme}
            transparent={color === 'transparent'}
            colorScheme={colorScheme}
            className={twMerge('flex flex-col gap-16 rounded-md', className)}
            {...props}
          >
            {typeof children === 'function' ? children({ colorScheme }) : children}
          </Paper>
        );
      })}
    </Wrap>
  );
};

interface RenderVariantBaseProps<T extends ReactComponent, TProp extends string = string>
  extends RenderVariantElementProps {
  Component: T;
  render?: (children: React.ReactNode) => React.ReactNode;
  props?: React.ComponentProps<T>;
  getProps?: (prop: TProp) => React.ComponentProps<T>;
  showVariantLabel?: boolean;
  variantPropName?: string;
  noChildren?: boolean;
  renderPaperContainers?: boolean;
  renderPaperContainersProps?: Omit<RenderPaperContainersProps, 'children'>;
  variantLabelProps?: {
    labelCase?: 'capital' | 'uppercased' | 'none';
    variantLabelAsTooltip?: boolean;
  };
}

const RenderVariantElement = classed('div', {
  variants: {
    orientation: {
      vertical: 'inline-flex flex-col items-start gap-24',
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

const sizes = ['xs', 'sm', 'md', 'lg'] satisfies SizeProp[];

const inlineSizes = sizes.map((e) => `inline${capitalize(e)}`) as SizeProp<'inline'>[];

const colors = [
  'primary',
  'secondary',
  'inverse',
  'info',
  'caution',
  'danger',
  'success',
  'heart',
] satisfies LiteralUnion<ColorProp, string>[];

const keys = {
  colors,
  sizes,
  inlineSizes,
} satisfies Record<string, LiteralUnion<string, string>[]>;

export const getSizeKeys = () => {
  return keys.sizes;
};

export const getInlineSizeKeys = () => {
  return keys.inlineSizes;
};

export const getAllSizeKeys = () => {
  return [...keys.inlineSizes, ...keys.sizes];
};

export const getColorKeys = () => {
  return keys.colors;
};

export const RenderVariants = <
  T extends React.ComponentType<any>,
  TElements extends undefined | string[]
>({
  variantPropName,
  elements = [],
  Component,
  render = (children) => children,
  props,
  getProps,
  orientation: orientationProp,
  renderPaperContainers,
  renderPaperContainersProps,
  showVariantLabel,
  variantLabelProps,
  noChildren = true,
}: { elements: TElements; variantPropName: string } & RenderVariantBaseProps<T>) => {
  const Element = Component as React.ComponentType<any>;

  const renderText = (e: string) => {
    const { labelCase = 'capital' } = variantLabelProps ?? {};

    if (labelCase === 'capital') return capitalCase(e || '');

    if (labelCase === 'uppercased') return e.toUpperCase();

    return e;
  };

  const orientation = orientationProp ?? 'horizontal';

  const { variantLabelAsTooltip } = variantLabelProps ?? {};

  return (
    <Wrap
      if={renderPaperContainers}
      wrap={(c) => (
        <RenderPaperContainers renderTransparentPaper {...renderPaperContainersProps}>
          {c}
        </RenderPaperContainers>
      )}
    >
      <RenderVariantElement orientation={orientation}>
        {elements.map((e) => {
          const elementProps = getProps?.(e) ?? props;
          return (
            <Wrap
              if={{ variantLabelAsTooltip, showVariantLabel }}
              wrap={{
                variantLabelAsTooltip: (c) => <Tooltip tooltip={renderText(e)}>{c}</Tooltip>,
                showVariantLabel: (c) => {
                  return (
                    <div className="flex flex-col items-center">
                      <div className="mb-8 block select-none text-center text-xs font-medium opacity-50">
                        {renderText(e)}
                      </div>
                      {c}
                    </div>
                  );
                },
              }}
            >
              {render(
                <Element
                  children={noChildren ? undefined : renderText(e)}
                  {...elementProps}
                  {...{ [variantPropName]: e }}
                />
              )}
            </Wrap>
          );
        })}
      </RenderVariantElement>
    </Wrap>
  );
};

export const RenderSizeVariants = <T extends React.ComponentType>({
  variantPropName = 'size',
  sizes = ['xs', 'sm', 'md', 'lg'],
  variantLabelProps,
  ...props
}: RenderSizeVariantProps<T>) => {
  return (
    <RenderVariants
      elements={sizes}
      variantPropName={variantPropName}
      variantLabelProps={{
        labelCase: 'uppercased',
        ...variantLabelProps,
      }}
      {...props}
    />
  );
};

export const RenderColorVariants = <T extends React.ComponentType>({
  variantPropName = 'color',
  colors = keys.colors,
  variantLabelProps,
  ...props
}: RenderColorVariantProps<T>) => {
  return (
    <RenderVariants
      elements={colors}
      variantPropName={variantPropName}
      variantLabelProps={{
        labelCase: 'capital',
        ...variantLabelProps,
      }}
      {...props}
    />
  );
};

interface RenderColorVariantProps<T extends React.ComponentType>
  extends RenderVariantBaseProps<T, LiteralUnion<'color', string>> {
  colors?: LiteralUnion<ColorProp, string>[];
}

export const getStoryUrl = () => {
  const searchParams = new URLSearchParams(window.location.search);

  const id = searchParams.get('id') ?? '';

  return `${window.location.protocol}//${window.location.host}/?path=/story/${id}`;
};

interface RenderPaperContainersProps extends Omit<PaperProps, 'color' | 'children'> {
  renderTransparentPaper?: boolean;
  orientation?: 'vertical' | 'horizontal';
  containerClassName?: string;
  hasContainer?: boolean;
  children:
    | React.ReactNode
    | (({ colorScheme }: { colorScheme?: ColorSchemeName }) => React.ReactNode);
}
