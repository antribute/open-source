import React from 'react';
import { Detail } from 'components/Detail';
import { ColorProp } from 'types/styles';
import { classed } from 'utils/classed';
import { Paper } from 'components/Paper';
import { DiscardButtonElement } from 'components/StatusBadge';
import { Button } from 'components/Button';
import { ClampText } from 'components/ClampText/ClampText';

type AlertVariant = 'danger' | 'caution' | 'success' | 'info' | 'heart';

export interface AlertProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  variant?: AlertVariant;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  onDiscardClick?: () => void;
}

const AlertContainer = classed('div', 'flex', 'rounded-md relative overflow-hidden', {
  // variants: {
  //   variant: {
  //     heart: 'glass-accent-heart !text-heart',
  //     info: 'glass-accent-info !text-info',
  //     success: 'glass-accent-success !text-success',
  //     danger: 'glass-accent-danger !text-danger',
  //     caution: 'glass-accent-caution !text-caution',
  //   } satisfies Record<AlertVariant, string>,
  // },
});

const AlertIconElement = classed('div', 'h-20 w-20  flex items-center !text-primary ', {
  variants: {
    variant: {
      success: 'i-heroicons-check-circle-20-solid',
      danger: 'i-heroicons-x-circle-20-solid',
      info: 'i-heroicons-information-circle-20-solid',
      caution: 'i-heroicons-exclamation-circle-20-solid',
      heart: 'i-heroicons-heart-20-solid',
    } satisfies Record<AlertVariant, string>,
  },
});

export const Alert = ({
  children,
  variant,
  title,
  description,
  icon,
  onDiscardClick,
}: AlertProps) => {
  return (
    <AlertContainer data-color-scheme={variant} className="!text-primary-dark bg-primary/10">
      <Detail
        className="py-8 mx-10"
        data-color-scheme={variant}
        startSubtitle={{
          color: 'current',
          value: <AlertIconElement variant={variant} />,
        }}
        subtitle={{
          color: 'current',
          size: 'sm',
          fontWeight: 'medium',
          value: (
            <div className="overflow-hidden">
              <ClampText maxLines={1} showMoreInTooltip clampedElementType="text">
                {title}
              </ClampText>
            </div>
          ),
        }}
        end={{
          align: 'end',
          value: (
            <Button variant="glass" rounded size="xs">
              View
            </Button>
          ),
        }}
        description={{
          color: 'current',
          className: 'opacity-80',
          value: <ClampText maxLines={1}>{description}</ClampText>,
        }}
      />
      {children}

      {Boolean(onDiscardClick) && (
        <div className="pr-4 pt-4">
          <button
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
