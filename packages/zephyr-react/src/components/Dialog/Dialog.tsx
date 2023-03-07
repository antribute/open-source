import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Button as ButtonComponent, ButtonProps } from 'components/Button';
import {
  DialogBodyElement,
  DialogBodyElementProps,
  DialogCloseButtonIconElement,
  DialogContentElement,
  DialogContentElementProps,
  DialogDescriptionElement,
  DialogDescriptionElementProps,
  DialogFooterElement,
  DialogFooterElementProps,
  DialogOverlayElement,
  DialogTitleElement,
  DialogTitleElementProps,
} from 'components/Dialog/Dialog.styles';
import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon';
import { ColorSchemeName } from '@antribute/zephyr-core';

type DialogRootProps = { colorScheme?: ColorSchemeName } & DialogPrimitive.DialogProps;

const DialogRoot = ({ colorScheme = 'surface', ...props }: DialogRootProps) => {
  return <DialogPrimitive.Root data-color-scheme={colorScheme} {...props} />;
};

type DialogContentProps = DialogContentElementProps;

const DialogContent = (props: DialogContentProps) => {
  return (
    <DialogPrimitive.Portal>
      <DialogOverlayElement />
      <DialogContentElement {...props} />
    </DialogPrimitive.Portal>
  );
};
type DialogBodyProps = DialogBodyElementProps;

const DialogBody = (props: DialogBodyProps) => {
  return <DialogBodyElement {...props} />;
};

const DialogCloseButtonIcon = () => {
  return (
    <DialogPrimitive.Close asChild>
      <DialogCloseButtonIconElement type="button">
        <span className="sr-only">Close</span>
        <XMarkIcon className="fill-current h-20 w-20 " />
      </DialogCloseButtonIconElement>
    </DialogPrimitive.Close>
  );
};

type DialogTitleProps = DialogTitleElementProps;

const DialogTitle = ({ children, ...props }: DialogTitleProps) => {
  return (
    <DialogTitleElement {...props}>
      {children} <DialogCloseButtonIcon />
    </DialogTitleElement>
  );
};

type DialogDescriptionProps = DialogDescriptionElementProps;

const DialogDescription = (props: DialogDescriptionProps) => {
  return <DialogDescriptionElement {...props} />;
};

type DialogFooterProps = DialogFooterElementProps;

const DialogFooter = (props: DialogFooterProps) => {
  return <DialogFooterElement {...props} />;
};

type DialogButtonProps = Omit<ButtonProps, 'size'>;

const DialogButton = (props: DialogButtonProps) => {
  return <ButtonComponent color="primary" {...props} size="sm" />;
};

const DialogTriggerButton = (props: DialogButtonProps) => {
  return (
    <DialogPrimitive.Trigger asChild>
      <ButtonComponent {...props} />
    </DialogPrimitive.Trigger>
  );
};

const DialogCloseButton = (props: Omit<DialogButtonProps, 'color' | 'variant'>) => {
  return (
    <DialogPrimitive.Close asChild>
      <DialogButton {...props} variant="glass" />
    </DialogPrimitive.Close>
  );
};

const DialogTrigger = (props: DialogPrimitive.DialogTriggerProps) => {
  return <DialogPrimitive.Trigger asChild {...props} />;
};

const DialogClose = (props: DialogPrimitive.DialogCloseProps) => {
  return <DialogPrimitive.Close asChild {...props} />;
};

const Root = DialogRoot;

const Content = DialogContent;

const Button = DialogButton;

const Title = DialogTitle;

const Body = DialogBody;

const Footer = DialogFooter;

const Description = DialogDescription;

const TriggerButton = DialogTriggerButton;

const CloseButton = DialogCloseButton;

const Close = DialogClose;

const CloseIcon = DialogCloseButtonIcon;

const Trigger = DialogTrigger;

export {
  Root,
  Content,
  Title,
  Description,
  Body,
  Footer,
  Trigger,
  TriggerButton,
  CloseButton,
  CloseIcon,
  Close,
  Button,
};
