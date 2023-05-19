import React from 'react';
import { Detail } from 'components/Detail';
import { classed } from 'utils/classed';
import { Button } from 'components/Button';
import { ClampText } from 'components/ClampText/ClampText';
import clsx from 'clsx';

type AlertVariant = 'danger' | 'caution' | 'success' | 'info' | 'heart' | 'secondary' | 'inverse';

export interface AlertProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  body?: React.ReactNode;
  variant?: AlertVariant;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  actionButtonText?: React.ReactNode;
  onDiscardClick?: () => void;
  onActionButtonClick?: () => void;
}

const AlertContainer = classed(
  'div',
  'flex',
  'rounded-md relative min-w-fit max-w-full overflow-hidden'
);

const defaultIcon =
  'before:i-heroicons-star-20-solid before-absolute-content before:absolute-center';

const AlertIconElement = classed(
  'div',
  'h-20 w-20  flex items-center !text-primary-content-min-contrast',
  {
    variants: {
      variant: {
        inverse: defaultIcon,
        secondary: defaultIcon,
        success: 'i-heroicons-check-circle-20-solid',
        danger: 'i-heroicons-x-circle-20-solid',
        info: 'i-heroicons-information-circle-20-solid',
        caution: 'i-heroicons-exclamation-circle-20-solid',
        heart: 'i-heroicons-heart-20-solid',
      } satisfies Record<AlertVariant, string>,
    },
  }
);

export const Alert = (props: AlertProps) => {
  const {
    children,
    variant = 'secondary',
    title,
    description,
    body,
    icon: iconProp,
    actionButtonText,
    onDiscardClick,
    onActionButtonClick,
  } = props;

  const variantColorType = ['danger', 'info', 'heart', 'success', 'caution'].includes(variant)
    ? 'state'
    : 'surface';

  const icon = 'icon' in props ? iconProp : <AlertIconElement variant={variant} />;
  return (
    <AlertContainer
      data-color-scheme={variant}
      className={clsx({
        '!text-primary-content-min-contrast bg-primary/10': variantColorType === 'state',
        'bg-surface-light': variantColorType === 'surface',
      })}
    >
      <Detail
        className="py-8 mx-10"
        data-color-scheme={variant}
        currentColor
        startSubtitle={{
          value: 'icon' in props ? icon : <AlertIconElement variant={variant} />,
        }}
        subtitle={
          title && {
            fontWeight: 'medium',
            value: (
              <ClampText maxLines={1} showMoreInTooltip clampedElementType="text">
                {title}
              </ClampText>
            ),
          }
        }
        body={
          body && {
            value: (
              <ClampText maxLines={1} showMoreInTooltip clampedElementType="text">
                {body}
              </ClampText>
            ),
          }
        }
        end={
          onActionButtonClick && {
            align: 'center',
            value: (
              <Button
                variant={variantColorType === 'state' ? 'glass' : 'filled'}
                rounded
                size="xs"
                color={variant}
              >
                {actionButtonText ?? 'View'}
              </Button>
            ),
          }
        }
        description={
          description && {
            color: 'current',
            className: 'opacity-80',
            value: <ClampText maxLines={2}>{description}</ClampText>,
          }
        }
      />
      {children}

      {Boolean(onDiscardClick) && (
        <div className="pr-4 pt-4">
          <button
            type="button"
            className=" p-2 rounded text-primary-dark/50  hover:bg-primary/10 relative  flex items-center justify-center ml-8"
            onClick={onDiscardClick}
          >
            <span className="h-20 w-20 i-heroicons-x-mark-20-solid z-10" />
          </button>
        </div>
      )}
    </AlertContainer>
  );
};
