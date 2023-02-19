import React, { useState } from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { classed, mergeVariants } from 'utils/classed';
import { Wrap } from 'components/Wrap';
import { Tooltip, TooltipProps } from 'components/Tooltip';
import { getTruncatedName } from 'utils/getTruncatedName';
import { sizeVariants } from 'styles/size.variants';
import { twMerge } from 'tailwind-merge';
import { stringToDistinctColorClass } from 'utils/stringToDistinctColorClass';
import clsx from 'clsx';

const AvatarElement = classed(
  AvatarPrimitive.Root,
  'rounded-md select-none flex items-center overflow-hidden relative bg-surface-neutral text-white shrink-0',
  {
    variants: {
      size: mergeVariants([sizeVariants.width, sizeVariants.height, sizeVariants.textSize]),
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
    },
    defaultVariants: {
      size: 'md',
      rounded: true,
    },
  }
);

interface AvatarProps {
  label: string;
  enableTooltip?: boolean;
  src?: string;
  border?: boolean;
  className?: string;
  tooltip?: React.ReactNode;
  tooltipProps?: Omit<TooltipProps, 'tooltip'>;
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
  className,
  tooltipProps,
}: AvatarProps) => {
  const tooltip = tooltipProp ?? label;
  const isTooltipEnabled = enableTooltip ?? Boolean(tooltip);

  const [loadingStatus, setLoadingStatus] = useState<AvatarPrimitive.ImageLoadingStatus>('loading');

  const loading = loadingStatus === 'loading';

  const colorClass = stringToDistinctColorClass(label, {
    classTokens: ['bg'],
    defaultClassTokens: { bg: clsx('bg-surface dark:bg-surface-neutral-50') },
    forceDefaultClass: Boolean(src),
  });

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
      <AvatarElement
        border={border}
        cursorPointer={isTooltipEnabled}
        className={twMerge(colorClass, className)}
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

        <AvatarContent label={label} className={colorClass} loading={loading} />
      </AvatarElement>
    </Wrap>
  );
};

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
  Pick<AvatarProps, 'border' | 'label' | 'src'>;

function AvatarContent({ src, className, label, loading }: AvatarContentProps) {
  const truncatedContent = getTruncatedName(label, { truncatedStyle: 'FL' });
  return (
    <Wrap
      if={Boolean(src)}
      wrap={(children) => (
        <AvatarPrimitive.Fallback delayMs={0} asChild>
          {children}
        </AvatarPrimitive.Fallback>
      )}
    >
      <AvatarContentElement className={className} loading={loading}>
        {truncatedContent}
      </AvatarContentElement>
    </Wrap>
  );
}

// ImageLoadingOverlayElement

const ImageLoadingOverlayElement = classed(
  'div',
  'absolute top-0 z-10',
  'h-full w-full',
  'bg-surface-soft dark:bg-surface-neutral-50',
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
