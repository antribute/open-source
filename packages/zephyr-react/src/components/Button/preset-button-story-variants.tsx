/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
import { omit, omitBy } from 'lodash-es';
import { notEmpty } from 'utils/notEmpty';
import { RenderColorVariants, RenderSizeVariants } from 'utils/storybook-utils';

export const PresetButtonStoryVariants = <
  TProps extends any,
  T extends React.ComponentType = React.ComponentType
>(
  Button: T,
  options?: { props?: TProps; noDefaultChildren?: boolean }
) => {
  const { noDefaultChildren, props: generalProps } = options ?? {};

  const colors = [
    'neutral',
    'surface',
    'inverse',
    'primary',
    'info',
    'positive',
    'caution',
    'danger',
  ];

  function getProps(props: any, defaults: object) {
    const defaultProps = omit(
      defaults,
      [noDefaultChildren ? 'children' : undefined].filter(notEmpty)
    );

    return { ...defaultProps, ...(generalProps as any), ...props };
  }

  return {
    Default: (props: TProps) => (
      <RenderColorVariants
        colors={colors}
        showVariantLabel
        Component={Button}
        noChildren={noDefaultChildren}
        props={getProps(props, { children: 'Default' })}
      />
    ),
    SizeVariant: (props: TProps) => (
      <RenderSizeVariants
        showVariantLabel
        Component={Button}
        noChildren={noDefaultChildren}
        props={getProps(props, { children: 'Default' })}
      />
    ),
    ContainedVariant: (props: TProps) => (
      <RenderColorVariants
        colors={colors}
        Component={Button}
        noChildren={noDefaultChildren}
        props={getProps(props, { children: 'Contained', variant: 'contained' })}
      />
    ),
    SoftVariant: (props: TProps) => (
      <RenderColorVariants
        colors={colors}
        Component={Button}
        noChildren={noDefaultChildren}
        props={getProps(props, { children: 'Contained', variant: 'soft' })}
      />
    ),
    OutlinedVariant: (props: TProps) => (
      <RenderColorVariants
        colors={colors}
        Component={Button}
        noChildren={noDefaultChildren}
        props={getProps(props, { children: 'Outlined', variant: 'outlined' })}
      />
    ),
    TextVariant: (props: TProps) => (
      <RenderColorVariants
        colors={colors}
        Component={Button}
        noChildren={noDefaultChildren}
        props={getProps(props, { children: 'Text', variant: 'text' })}
      />
    ),
  };
};
