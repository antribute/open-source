import React, { useState } from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { Classed, classed, mergeVariants } from 'utils/classed';
import { Wrap } from 'components/Wrap';
import { Tooltip, TooltipProps } from 'components/Tooltip';
import { getTruncatedName } from 'utils/getTruncatedName';
import { sizeVariants } from 'styles/size.variants';
import { twMerge } from 'tailwind-merge';
import { stringToDistinctColorClass } from 'utils/stringToDistinctColorClass';
import clsx from 'clsx';
import { AvatarElementName } from './Avatar.types';

const AvatarElement = classed(
  'span',
  'rounded-md select-none border-surface flex items-center justify-center overflow-hidden relative bg-surface text-palette-white shrink-0 isolate',
  {
    variants: {
      size: mergeVariants([sizeVariants.textSize, sizeVariants.width, sizeVariants.height]),
      border: {
        true: 'border-2',
      },
      loading: {
        true: 'opacity-0',
      },
      rounded: {
        true: 'rounded-full',
      },
      cursorPointer: {
        true: 'cursor-pointer',
      },
      clickable: {
        true: clsx('hover:border-boundary-subtle dark:hover:border-boundary-inverse-subtle'),
      },
      color: {
        default: 'bg-surface',
        alternate: 'bg-surface-light',
      },
      shrinkContent: {
        true: 'scale-[0.8]',
      },
    },
    defaultVariants: {
      size: 'md',
      rounded: true,
    },
  }
);

type AvatarElementVariants = Classed.VariantProps<typeof AvatarElement>;

export interface AvatarProps
  extends Pick<AvatarElementVariants, 'rounded' | 'size' | 'border' | 'color'> {
  label: string;
  enableTooltip?: boolean;
  src?: string;
  className?: string;
  tooltip?: React.ReactNode;
  tooltipProps?: Omit<TooltipProps, 'tooltip'>;
  truncateLabel?: boolean;
  onClick?: () => void;
  shrinkContent?: boolean;
}

const AvatarImageElement = classed(
  AvatarPrimitive.Image,
  'h-full w-full object-cover box-border z-0'
);

export const Avatar = ({
  label,
  src,
  enableTooltip,
  border,
  tooltip: tooltipProp,
  size = 'md',
  className,
  tooltipProps,
  color = 'default',
  shrinkContent,
  truncateLabel = true,
  onClick,
}: AvatarProps) => {
  const tooltip = tooltipProp ?? label;
  const isTooltipEnabled = enableTooltip ?? Boolean(tooltip);

  const [loadingStatus, setLoadingStatus] = useState<AvatarPrimitive.ImageLoadingStatus>('loading');

  const loading = loadingStatus === 'loading';

  const colorClass = stringToDistinctColorClass(
    label,
    {
      bg: clsx({
        'border-surface bg-surface': color === 'default',
        'bg-surface-dark border-surface-light text-content-moderate font-medium':
          color === 'alternate',
      }),
    },
    {
      forceDefaultClass: color !== 'default' || Boolean(src),
    }
  );

  return (
    <Wrap
      if={isTooltipEnabled}
      wrap={(children) => {
        return (
          <Tooltip {...tooltipProps} tooltip={tooltip}>
            {children}
          </Tooltip>
        );
      }}
    >
      <AvatarPrimitive.Root asChild>
        <AvatarElement
          border={border}
          cursorPointer={isTooltipEnabled}
          className={twMerge(colorClass, className)}
          as={onClick ? 'button' : 'span'}
          clickable={Boolean(onClick)}
          onClick={() => {
            onClick?.();
          }}
          size={size}
        >
          {src && (
            <>
              <ImageLoadingOverlayElement loading={loading} />
              <AvatarImageElement
                src={src}
                alt="Avatar"
                loading="eager"
                onLoadingStatusChange={(status) => {
                  setLoadingStatus(status);
                }}
              />
            </>
          )}

          {(!src || loading) && (
            <AvatarContent
              label={label}
              className={colorClass}
              loading={loading}
              size={size}
              truncateLabel={truncateLabel}
              shrinkContent={shrinkContent}
            />
          )}
        </AvatarElement>
      </AvatarPrimitive.Root>
    </Wrap>
  );
};

Avatar.displayName = AvatarElementName.Avatar;

// Avatar Content

const AvatarContentElement = classed(
  'div',
  AvatarElement,
  'bg-transparent',
  'font-semibold leading-none flex items-center justify-center w-full h-full',
  'transition-colors duration-1000',
  {
    variants: {
      loading: {
        true: 'bg-transparent',
      },
    },
  }
);

type AvatarContentProps = React.ComponentProps<typeof AvatarContentElement> &
  Pick<AvatarProps, 'border' | 'label' | 'src' | 'truncateLabel'>;

function AvatarContent({
  src,
  className,
  label,
  loading,
  truncateLabel = true,
  size,
  shrinkContent,
}: AvatarContentProps) {
  function getContent() {
    if (!truncateLabel) {
      return label;
    }
    return getTruncatedName(label, { truncatedStyle: 'FL' });
  }

  const content = getContent();

  return (
    <Wrap
      if={Boolean(src)}
      wrap={(children) => (
        <AvatarPrimitive.Fallback delayMs={0} asChild>
          {children}
        </AvatarPrimitive.Fallback>
      )}
    >
      <AvatarContentElement
        shrinkContent={shrinkContent}
        className={className}
        loading={loading}
        size={size}
      >
        {content}
      </AvatarContentElement>
    </Wrap>
  );
}

// ImageLoadingOverlayElement

const ImageLoadingOverlayElement = classed(
  'div',
  'absolute top-0 z-10',
  'h-full w-full',
  'bg-surface-soft dark:bg-neutral-50',
  'transition-opacity delay-150  ease-in-out duration-1000',
  'opacity-0',
  {
    variants: {
      loading: {
        true: 'opacity-100',
      },
    },
  }
);
