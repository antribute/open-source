import XMarkIcon from '@heroicons/react/20/solid/XMarkIcon';
import { classed, deriveClassed, mergeVariants } from 'utils/classed';
import React, { useState } from 'react';
import { colorVariants } from 'styles/colors.variants';
import { stringToDistinctColorClass } from 'utils/stringToDistinctColorClass';
import { twMerge } from 'tailwind-merge';
import { fetchStatusColor } from 'components/StatusBadge/fetchStatusColors';
import { StatusBadgeElement, StatusBadgeElementProps } from './StatusBadge.styles';

const DiscardButtonElement = classed(
  'button',
  'rounded-full focus:ring-opacity-50',
  'hover:bg-black/10 dark:hover:bg-white/10',
  {
    variants: {
      color: mergeVariants([colorVariants.focusRing]),
    },
  }
);

const DiscardButton = deriveClassed<
  typeof DiscardButtonElement,
  React.ComponentProps<typeof DiscardButtonElement>
>((props, ref) => {
  return (
    <DiscardButtonElement type="button" ref={ref} {...props}>
      <XMarkIcon className="h-16 w-16" />
    </DiscardButtonElement>
  );
});

interface StatusBadgeProps extends StatusBadgeElementProps {
  label?: string;

  onDiscard?: () => void;
}

export const StatusBadge = ({
  children: childrenProp,
  label: labelProp,
  size,
  color,
  onClick,
  className,
  onDiscard,
  disabled,

  ...props
}: StatusBadgeProps) => {
  const label =
    labelProp ?? typeof childrenProp === 'string' ? (childrenProp as string) : undefined;

  const children = childrenProp ?? labelProp;

  const distinctColorClass = stringToDistinctColorClass(label, { bg: true });

  const [colorClass, setColorClass] = useState<string | undefined>(undefined);

  React.useEffect(() => {
    fetchStatusColor(label, { bg: true, text: true })
      .then((value) => {
        if (value) {
          setColorClass(value);
        } else {
          setColorClass(distinctColorClass);
        }
      })

      .catch(() => {});
  }, [distinctColorClass, label]);

  const clickable = Boolean(onClick);
  return (
    <StatusBadgeElement
      clickable={clickable}
      size={size}
      onClick={onClick}
      color={color}
      disabled={disabled}
      className={twMerge(colorClass, className)}
      {...props}
      tabIndex={clickable ? undefined : -1}
    >
      {children}
      {onDiscard && (
        <DiscardButton
          color={color}
          className="-mr-2 opacity-70 focus:opacity-100"
          onClick={(e) => {
            e.stopPropagation();
            onDiscard();
          }}
        />
      )}
    </StatusBadgeElement>
  );
};
