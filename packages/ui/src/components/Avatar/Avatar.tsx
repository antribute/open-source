import React, { useState, useMemo, useRef } from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { Classed, classed, mergeVariants } from 'utils/classed';
import { Wrap } from 'components/Wrap';
import { Tooltip, TooltipProps } from 'components/Tooltip';
import { getTruncatedName } from 'utils/getTruncatedName';
import { sizeVariants } from 'styles/size.variants';
import { twMerge } from 'tailwind-merge';
import { stringToDistinctColorClass } from 'utils/stringToDistinctColorClass';
import clsx from 'clsx';
import { objectMap } from 'utils';
import { capitalize, isEmpty, pick, truncate } from 'lodash-es';
import { SizeProp } from 'types/styles';
import { Detail, DetailProps } from 'components/Detail';
import { DetailSlots, SlotItemData, slotIds } from 'components/Detail/Detail.types';
import { AvatarElementName } from './Avatar.types';

const inlineSizeVariants = objectMap(
  mergeVariants([sizeVariants.textSize, sizeVariants.inlineWidth, sizeVariants.inlineHeight]),
  ({ key, value }) => {
    return [`inline${capitalize(key)}` as SizeProp<'inline'>, value];
  }
);

const avatarSizeVariant = {
  ...inlineSizeVariants,
  ...mergeVariants([sizeVariants.textSize, sizeVariants.width, sizeVariants.height]),
};

type AvatarElementVariants = Classed.VariantProps<typeof AvatarElement>;

const AvatarElement = classed(
  AvatarPrimitive.Root,
  'rounded-md select-none border-surface flex items-center justify-center relative bg-surface text-palette-white shrink-0',

  {
    variants: {
      size: avatarSizeVariant,
      border: {
        true: 'border-2',
        thin: 'border',
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
        true: clsx('hover:border-boundary-subtle'),
      },
      color: {
        default: 'bg-surface',
        alternate: 'bg-surface-light',
        distinct: '',
        transparent: 'bg-transparent',
      },
    },
    defaultVariants: {
      size: 'md',
      rounded: true,
    },
  }
);

const ImageLoadingOverlayElement = classed(
  'div',
  'bg-surface ring-1 ring-surface-soft',
  'w-full h-full absolute z-10',
  'opacity-0',
  'transition-opacity delay-150 ease-in-out duration-300',
  {
    variants: {
      loading: {
        true: 'opacity-100',
      },
      rounded: {
        true: 'rounded-full',
      },
    },
  }
);

const AvatarImageElement = classed(AvatarPrimitive.Image, 'overflow-hidden', {
  variants: {
    size: avatarSizeVariant,
    hide: {
      true: 'hidden',
    },
    rounded: {
      true: 'rounded-full',
    },
  },
});

const AvatarContentElement = classed(
  'span',
  'leading-md inline-flex items-center justify-center text-center',
  {
    variants: {
      size: avatarSizeVariant,
      shrinkContent: {
        true: 'scale-[0.8]',
      },
    },
  }
);

export interface AvatarProps
  extends Pick<AvatarElementVariants, 'rounded' | 'size' | 'border' | 'color'> {
  label: string;
  avatarNode?: React.ReactNode;
  enableTooltip?: boolean;
  details?: DetailProps & { avatarPositon?: keyof DetailSlots };
  src?: string;
  className?: string;
  tooltip?: React.ReactNode;
  tooltipProps?: Omit<TooltipProps, 'tooltip'>;
  truncateLabel?: boolean;
  onClick?: () => void;
  shrinkContent?: boolean;
}

export const Avatar = ({
  label,
  src,
  enableTooltip,
  border,
  tooltip: tooltipProp,
  size = 'xs',
  className,
  tooltipProps,
  color = 'distinct',
  shrinkContent = true,
  avatarNode: avatarNodeProp,
  details,
  rounded = true,
  truncateLabel = true,
  onClick,
}: AvatarProps) => {
  const isTooltipEnabled = enableTooltip ?? Boolean(tooltipProp);
  const tooltip = tooltipProp ?? label;

  const [loadingStatus, setLoadingStatus] = useState<AvatarPrimitive.ImageLoadingStatus>();

  const loading = loadingStatus === 'loading';

  const colorClass = stringToDistinctColorClass(
    label,
    {
      bg: clsx({
        'border-surface bg-surface': color === 'distinct',
        'bg-surface-dark border-surface-light text-content-moderate font-medium':
          color === 'alternate',
      }),
    },
    {
      forceDefaultClass: color !== 'distinct' || Boolean(src),
    }
  );

  const avatar = useMemo(() => {
    if (avatarNodeProp) {
      return avatarNodeProp;
    }
    if (!truncateLabel) {
      return label;
    }
    return getTruncatedName(label, { truncatedStyle: 'FL' });
  }, [label, avatarNodeProp, truncateLabel]);

  const avatarContentRef = useRef<HTMLSpanElement>(null);

  return (
    <Wrap
      if={Boolean(details && !isEmpty(pick(details, slotIds)))}
      wrap={(c) => (
        <Detail
          {...details}
          {...{
            [details?.avatarPositon ?? 'start']: {
              color: 'inherit',
              value: c,
            } as SlotItemData,
          }}
        />
      )}
    >
      <Wrap
        if={isTooltipEnabled}
        wrap={(children) => {
          return (
            <Tooltip delayDuration={110} {...tooltipProps} tooltip={tooltip}>
              {children}
            </Tooltip>
          );
        }}
      >
        <AvatarElement
          border={border}
          cursorPointer={isTooltipEnabled}
          className={twMerge(colorClass, className)}
          as={onClick ? 'button' : 'span'}
          clickable={Boolean(onClick)}
          onClick={() => {
            onClick?.();
          }}
          rounded={rounded}
          size={size}
        >
          {src && (
            <>
              <ImageLoadingOverlayElement loading={loading} rounded={rounded} />

              <AvatarImageElement
                size={size}
                loading="eager"
                src={src}
                hidden={loadingStatus === 'error' || loadingStatus === 'idle'}
                rounded={rounded}
                alt="Avatar"
                onLoadingStatusChange={(status) => {
                  setLoadingStatus(status);
                }}
              />
            </>
          )}

          {(!src || loadingStatus === 'error' || loadingStatus === 'idle') && (
            <AvatarContentElement
              ref={avatarContentRef}
              size={size}
              style={{
                scale:
                  shrinkContent && typeof avatar === 'string'
                    ? `${Math.max(0.5, 1 - Math.max(0, avatar.length - 2) * 0.13)}`
                    : undefined,
              }}
            >
              {typeof avatar === 'string'
                ? truncate(avatar, {
                    length: 10,
                    omission: '...',
                    separator: ' ',
                  })
                : avatar}
            </AvatarContentElement>
          )}
        </AvatarElement>
      </Wrap>
    </Wrap>
  );
};
Avatar.displayName = AvatarElementName.Avatar;
