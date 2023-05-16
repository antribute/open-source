import { classed } from 'utils/classed';
import InformationCircleIcon from '@heroicons/react/24/outline/InformationCircleIcon';
import { Tooltip, TooltipProps } from 'components/Tooltip/Tooltip';
import { IconButtonProps } from 'components/IconButton';

type InformationTooltipIconProps = IconButtonProps & {
  tooltip: TooltipProps['tooltip'];
  tooltipProps?: Omit<TooltipProps, 'children'>;
  hideWhenTooltipIsEmpty?: boolean;
  iconClassName?: string;
};

const InfoIconElement = classed(
  InformationCircleIcon,
  'rounded-full min-w-[24px] min-h-[24px] h-full w-full'
);

const IconButtonElement = classed('button', 'focus:ring-boundary-tint rounded-full');

export const InfoTooltipIcon = ({
  iconClassName,
  size,
  onClick,
  tooltipProps,
  tooltip,
  hideWhenTooltipIsEmpty = true,
  ...props
}: InformationTooltipIconProps) => {
  if (hideWhenTooltipIsEmpty && !tooltip) return null;

  return (
    <Tooltip tooltip={tooltip} {...tooltipProps}>
      <IconButtonElement
        type="button"
        onClick={(e) => {
          e.stopPropagation();
        }}
        {...props}
      >
        <InfoIconElement className={iconClassName} />
      </IconButtonElement>
    </Tooltip>
  );
};
