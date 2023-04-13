/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
import { BoltIcon } from '@heroicons/react/24/solid';
import { omit } from 'lodash-es';
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
        showVariantLabel
        renderPaperContainers
        Component={Button}
        noChildren={noDefaultChildren}
        props={getProps(props, { children: 'Default' })}
      />
    ),
    StartAndEndIconVariant: () => (
      <div className="space-y-10">
        {[
          { startIcon: <BoltIcon /> },
          { endIcon: <BoltIcon /> },
          { startIcon: <BoltIcon />, rounded: true },
          { endIcon: <BoltIcon />, rounded: true },
        ].map((props) => (
          <RenderSizeVariants
            showVariantLabel
            Component={Button}
            noChildren={noDefaultChildren}
            props={getProps(props, { children: 'Get Started', ...props })}
          />
        ))}
      </div>
    ),
    SizeVariant: (props: TProps) => (
      <RenderSizeVariants
        showVariantLabel
        Component={Button}
        noChildren={noDefaultChildren}
        props={getProps(props, { children: 'Default' })}
      />
    ),
    RoundedVariant: (props: TProps) => (
      <RenderColorVariants
        showVariantLabel
        renderPaperContainers
        Component={Button}
        noChildren={noDefaultChildren}
        props={getProps(props, { children: 'Default', rounded: true })}
      />
    ),
    OutlinedRoundedVariant: (props: TProps) => (
      <RenderColorVariants
        showVariantLabel
        Component={Button}
        renderPaperContainers
        noChildren={noDefaultChildren}
        props={getProps(props, { children: 'Get Started', rounded: true, variant: 'outlined' })}
      />
    ),
    RoundedSize: (props: TProps) => (
      <RenderSizeVariants
        showVariantLabel
        Component={Button}
        noChildren={noDefaultChildren}
        props={getProps(props, { children: 'Get Started', rounded: true })}
      />
    ),
    ContainedVariant: (props: TProps) => (
      <RenderColorVariants
        showVariantLabel
        Component={Button}
        noChildren={noDefaultChildren}
        props={getProps(props, { children: 'Filled', variant: 'filled' })}
      />
    ),
    ContainedGradientVariant: (props: TProps) => (
      <RenderColorVariants
        showVariantLabel
        Component={Button}
        noChildren={noDefaultChildren}
        props={getProps(props, {
          children: 'Contained',
          variant: 'filled',
          gradient: true,
          coloredShadow: true,
          rounded: true,
        })}
      />
    ),
    GlassVariant: (props: TProps) => (
      <RenderColorVariants
        showVariantLabel
        renderPaperContainers
        Component={Button}
        noChildren={noDefaultChildren}
        props={getProps(props, { children: 'Glass', variant: 'glass' })}
      />
    ),
    OutlinedVariant: (props: TProps) => (
      <RenderColorVariants
        showVariantLabel
        renderPaperContainers
        Component={Button}
        noChildren={noDefaultChildren}
        props={getProps(props, { children: 'Outlined', variant: 'outlined' })}
      />
    ),
    TextVariant: (props: TProps) => (
      <RenderColorVariants
        showVariantLabel
        Component={Button}
        noChildren={noDefaultChildren}
        props={getProps(props, { children: 'Text', variant: 'text' })}
      />
    ),
    GhostVariant: (props: TProps) => (
      <RenderColorVariants
        showVariantLabel
        renderPaperContainers
        Component={Button}
        noChildren={noDefaultChildren}
        props={getProps(props, { children: 'Text', variant: 'ghost' })}
      />
    ),
  };
};
