import type { ButtonProps } from 'components/Button';
import { Button } from 'components/Button';
import { Flex } from 'components/Flex';
import { Popover } from 'components/Popover';
import type {
  PopoverRootProps,
  PopoverContentProps as _PopoverContentProps,
} from 'components/Popover/Popover';
import { Text } from 'components/Text';
import { pickProps } from 'utils/pickProps';

type ConfirmationButtonProps = Omit<
  Omit<ButtonProps, 'onClick'>,
  keyof React.HTMLProps<HTMLButtonElement>
>;

type PopoverContentProps = Omit<_PopoverContentProps, keyof React.HTMLProps<HTMLDivElement>>;

interface ConfirmationPopoverContentProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  confirmButtonText?: string;
  cancelButtonText?: string;
  confirmButtonProps?: ConfirmationButtonProps;
  cancelButtonProps?: ConfirmationButtonProps;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const ConfirmationPopoverContent = ({
  title,
  description,
  confirmButtonText = 'Confirm',
  cancelButtonText = 'Cancel',
  confirmButtonProps,
  cancelButtonProps,
  onConfirm,
  onCancel,
}: ConfirmationPopoverContentProps) => {
  return (
    <Flex gap>
      {(title || description) && (
        <Flex gap className="mb-8">
          {title && <Text.H6>{title}</Text.H6>}
          {description && <Text>{description}</Text>}
        </Flex>
      )}
      <Flex gap="sm">
        <Popover.Close asChild>
          <Button size="xs" onClick={onConfirm} color="danger" {...confirmButtonProps}>
            {confirmButtonText}
          </Button>
        </Popover.Close>
        <Popover.Close asChild>
          <Button size="xs" variant="ghost" onClick={onCancel} {...cancelButtonProps}>
            {cancelButtonText}
          </Button>
        </Popover.Close>
      </Flex>
    </Flex>
  );
};

export interface ConfirmationPopoverProps
  extends PopoverRootProps,
    PopoverContentProps,
    ConfirmationPopoverContentProps {}

export const ConfirmationPopover = (props: ConfirmationPopoverProps) => {
  const { children, ...popoverRootProps } = pickProps<PopoverRootProps>(props, {
    children: '_pick_',
    defaultOpen: '_pick_',
    modal: '_pick_',
    onOpenChange: '_pick_',
    open: '_pick_',
  });

  const confirmationPopoverContentProps = pickProps<ConfirmationPopoverContentProps>(props, {
    cancelButtonProps: '_pick_',
    cancelButtonText: '_pick_',
    confirmButtonProps: '_pick_',
    confirmButtonText: '_pick_',
    description: '_pick_',
    onCancel: '_pick_',
    onConfirm: '_pick_',
    title: '_pick_',
  });

  const popoverContentProps = pickProps<PopoverContentProps>(props, {
    showArrow: true,
    align: '_pick_',
    alignOffset: '_pick_',
    arrowPadding: '_pick_',
    asChild: '_pick_',
    avoidCollisions: '_pick_',
    trapFocus: '_pick_',
    closeOnInteractOutside: '_pick_',
    disableOutsidePointerEvents: '_pick_',
    showCloseButton: '_pick_',
    collisionBoundary: '_pick_',
    collisionPadding: '_pick_',
    hideWhenDetached: '_pick_',
    onCloseAutoFocus: '_pick_',
    onEscapeKeyDown: '_pick_',
    onFocusOutside: '_pick_',
    onInteractOutside: '_pick_',
    onOpenAutoFocus: '_pick_',
    onPointerDownOutside: '_pick_',
    side: '_pick_',
    sideOffset: '_pick_',
    sticky: '_pick_',
  });

  return (
    <Popover.Root {...popoverRootProps}>
      <Popover.Trigger>{children}</Popover.Trigger>
      <Popover.Content {...popoverContentProps} className="p-4 rounded-md">
        <ConfirmationPopoverContent {...confirmationPopoverContentProps} />
      </Popover.Content>
    </Popover.Root>
  );
};
