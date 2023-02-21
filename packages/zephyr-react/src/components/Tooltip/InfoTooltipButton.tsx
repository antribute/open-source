import React from 'react';
import { Classed, classed, deriveClassed } from 'utils/classed';
import InformationCircleIcon from '@heroicons/react/24/outline/InformationCircleIcon';
import { Tooltip, TooltipProps } from 'components/Tooltip/Tooltip';

type InformationTooltipIconProps = React.ComponentProps<typeof InfoIconElement>;
const InfoIconElement = classed(InformationCircleIcon, 'w-20 h-20 rounded-full text-neutral-50');

export const InfoTooltipIcon = deriveClassed<
  typeof InfoIconElement,
  InformationTooltipIconProps & {
    tooltip: TooltipProps['tooltip'];
    tooltipProps?: Omit<TooltipProps, 'children'>;
    hideWhenTooltipIsEmpty?: boolean;
  }
>(({ tooltipProps, tooltip, hideWhenTooltipIsEmpty = true, ...props }) => {
  if (hideWhenTooltipIsEmpty && !tooltip) return null;

  return (
    <Tooltip tooltip={tooltip} {...tooltipProps}>
      <button
        type="button"
        className="rounded-full focus:ring-black/10"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <InfoIconElement {...props} />
      </button>
    </Tooltip>
  );
});
