/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { sizeVariants } from 'styles/size.variants';
import { Classed, classed, deriveClassed, mergeVariants } from 'utils/classed';
import { UseInputAddonListProps } from 'components/Input/components/InputAddonGroup/useInputAddonList';
import { Position } from 'components/Position';
import { Spinner } from 'components/Spinner';
import type { SizeProp } from 'types/styles';
import { Wrap } from 'components/Wrap';
import { Tooltip } from 'components/Tooltip';

type InputAddonVariantProps = Classed.VariantProps<typeof InputAddonElement>;

const InputAddonElement = classed(
  'button',
  'relative',
  'align-middle',
  'text-sm font-semibold',
  'gap-x-4 items-center justify-center z-10',
  'inline-flex shrink-0',
  'ring-inset focus:ring-inset focus:-outline-offset-2',
  'h-auto w-auto',
  {
    variants: {
      size: mergeVariants([
        sizeVariants.inlineHeight,
        sizeVariants.inlineWidth,
        sizeVariants.textSize,
        sizeVariants.paddingX,
      ]),
      grouping: {
        outside: clsx(
          'border-inherit',
          'first:border-r last:border-l',
          'first:rounded-l-[inherit] last:rounded-r-[inherit]',
          'px-8'
        ),
        inline: 'px-4',
      },

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
        false: 'cursor-default',
      },
    },
  }
);

export interface InputAddonProps extends InputAddonVariantProps {
  position?: 'leading' | 'trailing';
  grouping?: 'inline' | 'outside';
  focusInputOnClick?: boolean;
  excludeFromTabOrder?: boolean;
  enabled?: boolean;
  invisible?: boolean;
  loadingSpinner?: boolean;
  iconClassName?: string;
  className?: string;
  children?: React.ReactNode | ((options: { size?: SizeProp }) => React.ReactNode);
  tooltip?: React.ReactNode;
  enableTooltip?: boolean;
  /** @internal */
  _inputRef?: UseInputAddonListProps['inputRef'];
}

export const InputAddon = deriveClassed<typeof InputAddonElement, InputAddonProps>(
  (props, forwardedRef) => {
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
      noPadding,
      focusInputOnClick: focusInputOnClickProp,
      excludeFromTabOrder: excludeFromTabOrderProp,
      ...rest
    } = props;

    const focusInputOnClick = focusInputOnClickProp ?? grouping === 'inline';

    const excludeFromTabOrder = excludeFromTabOrderProp ?? grouping === 'inline';

    const tooltipEnabled = (enableTooltip && Boolean(tooltip)) || Boolean(tooltip);

    return (
      <>
        {!enabled ? null : (
          <Wrap
            if={tooltipEnabled}
            wrap={(c) => {
              return (
                <Tooltip.Provider>
                  <Tooltip.Root delayDuration={100}>
                    <Tooltip.Content side="bottom" size="sm">
                      {tooltip}
                    </Tooltip.Content>
                    <Tooltip.Trigger asChild>{c}</Tooltip.Trigger>
                  </Tooltip.Root>
                </Tooltip.Provider>
              );
            }}
          >
            <InputAddonElement
              ref={forwardedRef}
              aria-hidden={invisible}
              disabled={invisible}
              className={className}
              tabIndex={excludeFromTabOrder ? -1 : undefined}
              grouping={grouping}
              clickable={!focusInputOnClick}
              cursorPointer={tooltipEnabled}
              noPadding={noPadding}
              invisible={invisible}
              {...rest}
              onClick={() => {
                if (focusInputOnClick && _inputRef && 'current' in _inputRef) {
                  _inputRef.current?.focus();
                }
              }}
            >
              <span
                className={twMerge(
                  'min-h-[20px] min-w-[20px] flex items-center justify-center h-full w-full rounded-[inherit]',
                  iconClassName
                )}
              >
                {loadingSpinner && (
                  <Position position="middle-center" className="bg-surface-soft">
                    <Spinner size="sm" />
                  </Position>
                )}
                {typeof children === 'function' ? children({ size }) : children}
              </span>
            </InputAddonElement>
          </Wrap>
        )}
      </>
    );
  }
);

InputAddon.displayName = 'InputAddon';
