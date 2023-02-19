import { twMerge } from 'tailwind-merge';
import { classed } from 'utils/classed';

const StartIconContainer = ({
  icon,
  className,
}: {
  icon?: React.ReactNode;
  className?: string;
}) => {
  return icon ? (
    <span className={twMerge('h-24 w-24 shrink-0 flex items-center justify-center', className)}>
      {icon}
    </span>
  ) : null;
};

interface ListItemLabelSpanProps {
  label?: React.ReactNode;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  className?: string;
}

const Label = ({ label, startIcon, endIcon, className }: ListItemLabelSpanProps) => {
  return (
    <span className={twMerge('flex w-full items-center gap-14 font-medium', className)}>
      <StartIconContainer icon={startIcon} />
      {label}
      {endIcon && (
        <div className="absolute right-16 flex h-16 w-16 items-center text-content-weak dark:text-content-inverse-weak">
          {endIcon}
        </div>
      )}
    </span>
  );
};

const Description = classed(
  'p',
  'block text-sm  text-content-weak leading-xs dark:text-content-inverse-weak',
  {
    variants: {},
  }
);

export interface ListItemSpanProps extends ListItemLabelSpanProps {
  description?: React.ReactNode;
  startIconMarker?: boolean;
  className?: string;
}

export const ListItemSpan = ({
  startIcon,
  endIcon,
  className,
  startIconMarker,
  description,
  label,
}: ListItemSpanProps) => {
  return (
    <div className={twMerge('flex items-start gap-16', className)}>
      <StartIconContainer icon={startIcon} className="pt-2" />
      <div className="space-y-2">
        <Label endIcon={endIcon} label={label} />
        {description && <Description>{description}</Description>}
      </div>
    </div>
  );
};
