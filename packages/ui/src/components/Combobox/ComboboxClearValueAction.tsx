import { useState } from 'react';
import type { SelectState } from 'ariakit';
import { IconButton } from 'components/IconButton/IconButton';
import { XMarkIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import { ConfirmationPopover } from 'components/ConfirmationPopover/ConfirmationPopover';
import { Tooltip } from 'components/Tooltip';

export interface ComboboxClearValueActionProps {
  selectState: SelectState;
  className?: string;
  clearAllRequiresConfirmation?: boolean;
  onClearValue?: () => void;
}

export const ComboboxClearValueAction = ({
  selectState,
  className,
  clearAllRequiresConfirmation,
  onClearValue,
}: ComboboxClearValueActionProps) => {
  const [confirmationPopoverOpen, setConfirmationPopoverOpen] = useState(false);

  function handleClearButtonClick() {
    if (clearAllRequiresConfirmation) {
      setConfirmationPopoverOpen(true);
    } else {
      handleClearValue();
    }
  }

  function handleClearValue() {
    if (Array.isArray(selectState.value)) {
      selectState.setValue([]);
    } else {
      selectState.setValue('');
    }
    onClearValue?.();
  }

  return (
    <ConfirmationPopover
      open={confirmationPopoverOpen}
      onConfirm={() => {
        handleClearValue();
      }}
      onOpenChange={(open) => {
        if (!open) {
          setConfirmationPopoverOpen(false);
        }
      }}
    >
      <IconButton
        size="xs"
        variant="ghost"
        color="secondary"
        className={clsx(
          'transition-opacity',
          {
            'opacity-0 group-hover:opacity-100': !confirmationPopoverOpen,
          },
          className
        )}
        onClick={() => {
          handleClearButtonClick();
        }}
      >
        <Tooltip tooltip="Clear" size="xs" side="bottom" sideOffset={5}>
          <div className="absolute h-full w-full top-0" />
        </Tooltip>
        <XMarkIcon className="text-content stroke-[0.5px] stroke-content-weak opacity-50 h-16 w-16" />
      </IconButton>
    </ConfirmationPopover>
  );
};
