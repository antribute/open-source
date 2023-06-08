/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/naming-convention */
import React, { forwardRef } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { sizeVariants } from 'styles/size.variants';
import { Classed, classed, mergeVariants } from 'utils/classed';
import { UseInputAddonListProps } from 'components/Input/components/InputAddonGroup/useInputAddonList';
import { Spinner } from 'components/Spinner';
import type { SizeProp } from 'types/styles';
import { Wrap } from 'components/Wrap';
import { Tooltip } from 'components/Tooltip';
import { HoverProps, useHover } from 'react-aria';
import { AnimatePresence, motion } from 'framer-motion';

const InputAddonElement = classed(
  motion.div,
  'group/addon',
  'inline-flex items-center',
  'shrink-0',
  'h-auto w-min',
  'self-stretch',
  'min-h-[20px] min-w-[20px]',
  'cursor-auto',
  'select-none',
  {
    variants: {
      grouping: {
        outside: clsx(
          'border-inherit',
          'first:border-r last:border-l',
          'first:rounded-l-[inherit] last:rounded-r-[inherit]'
        ),
        inline: '',
      },
    },
  }
);

type InputAddonVariantProps = Classed.VariantProps<typeof InputAddonInnerElement>;

const InputAddonInnerElement = classed(
  motion.div,
  'relative z-10',
  'text-sm font-semibold',
  'inline-flex items-center justify-center',
  'align-middle',
  'shrink-0',
  'gap-x-4',
  'ring-inset focus:ring-inset focus:-outline-offset-2',
  'w-auto',
  'px-4',
  'rounded-[inherit]',
  {
    variants: {
      fullHeight: {
        false: 'h-min',
        true: 'h-auto self-stretch',
      },
      size: mergeVariants([
        sizeVariants.inlineHeight,
        sizeVariants.inlineWidth,
        sizeVariants.textSize,
        sizeVariants.paddingX,
      ]),

      cursorPointer: {
        true: '!cursor-pointer',
      },
      noPadding: {
        true: '!p-0',
      },

      invisible: {
        true: 'invisible',
      },

      clickable: {
        true: 'cursor-pointer',
      },
    },
  }
);

export interface InputAddonProps extends InputAddonVariantProps, Omit<HoverProps, 'isDisabled'> {
  position?: 'leading' | 'trailing';
  grouping?: 'inline' | 'outside';
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;
  focusInputOnClick?: boolean;
  excludeFromTabOrder?: boolean;
  fullHeight?: boolean;
  enabled?: boolean;
  invisible?: boolean;
  loadingSpinner?: boolean;
  iconClassName?: string;
  className?: string;
  isGroupHovered?: boolean;
  enterAnimation?: boolean;
  preventDefault?: boolean;
  children?:
    | React.ReactNode
    | ((options: {
        size?: SizeProp;
        isHovered: boolean;
        isGroupHovered: boolean;
      }) => React.ReactNode);
  tooltip?: React.ReactNode;
  enableTooltip?: boolean;
  /** @internal */
  _inputRef?: UseInputAddonListProps['inputRef'];
}

export const InputAddon = forwardRef<
  HTMLButtonElement,
  InputAddonProps & { as?: 'button' | 'div' }
>((props, forwardedRef) => {
  const {
    children,
    size,
    loadingSpinner,
    iconClassName,
    grouping = 'inline',
    className,
    _inputRef,
    tooltip,
    invisible,
    enabled = true,
    enableTooltip,
    preventDefault,
    noPadding,
    focusInputOnClick: focusInputOnClickProp,
    excludeFromTabOrder: excludeFromTabOrderProp,
    onClick,
    onHoverChange,
    onHoverEnd,
    onHoverStart,
    isGroupHovered,
    enterAnimation = false,
    as: asProp,
    ...rest
  } = props;

  const focusInputOnClick = focusInputOnClickProp ?? grouping === 'inline';

  const excludeFromTabOrder = excludeFromTabOrderProp ?? grouping === 'inline';

  const tooltipEnabled = (enableTooltip && Boolean(tooltip)) || Boolean(tooltip);

  const { hoverProps, isHovered } = useHover({ onHoverChange, onHoverEnd, onHoverStart });

  const as = onClick ? 'button' : 'div';

  const inputRef = _inputRef && 'current' in _inputRef ? _inputRef : undefined;

  const clickable = !focusInputOnClick || invisible || Boolean(onClick);

  return (
    <AnimatePresence mode="popLayout">
      {!enabled ? null : (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <InputAddonElement
          grouping={grouping}
          onClick={() => {
            inputRef?.current?.focus();
          }}
          layout="preserve-aspect"
        >
          <Wrap
            if={tooltipEnabled}
            wrap={(c) => {
              return (
                <Tooltip.Root delayDuration={100}>
                  <Tooltip.Content side="bottom" size="sm">
                    {tooltip}
                  </Tooltip.Content>
                  <Tooltip.Trigger asChild>{c}</Tooltip.Trigger>
                </Tooltip.Root>
              );
            }}
          >
            <InputAddonInnerElement
              ref={forwardedRef}
              initial={enterAnimation ? { scale: 0 } : {}}
              animate={{ scale: 1, transition: { delay: 0.2, bounce: 0, duration: 0.3 } }}
              exit={{ scale: 0 }}
              aria-hidden={invisible}
              disabled={invisible}
              className={className}
              tabIndex={excludeFromTabOrder ? -1 : undefined}
              clickable={clickable}
              cursorPointer={tooltipEnabled}
              noPadding={noPadding}
              invisible={invisible}
              layout="preserve-aspect"
              {...rest}
              {...(hoverProps as any)}
              as={as as 'button'}
              onClick={(e) => {
                if (!focusInputOnClick) {
                  e.stopPropagation();
                }

                if (!focusInputOnClick && (preventDefault ?? as === 'div')) {
                  e.preventDefault();
                }

                if (onClick) {
                  onClick(e);
                }
              }}
            >
              {iconClassName && (
                <span className={twMerge('min-h-[20px] min-w-[20px]', iconClassName)} />
              )}
              {/* <InputAddonInnerElement className={iconClassName}> */}
              {loadingSpinner && (
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <Spinner size="sm" />
                </div>
              )}
              {typeof children === 'function'
                ? children({
                    size,
                    isHovered,
                    isGroupHovered: Boolean(isGroupHovered),
                  })
                : children}
              {/* </InputAddonInnerElement> */}
            </InputAddonInnerElement>
          </Wrap>
        </InputAddonElement>
      )}
    </AnimatePresence>
  );
});

InputAddon.displayName = 'InputAddon';
