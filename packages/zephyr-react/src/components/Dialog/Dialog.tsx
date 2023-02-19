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

type DialogRootProps = DialogPrimitive.DialogProps;

const DialogRoot = (props: DialogRootProps) => {
  return <DialogPrimitive.Root {...props} />;
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
        <XMarkIcon className="h-20 w-20 fill-current " />
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
  return <ButtonComponent {...props} size="sm" />;
};

const DialogTriggerButton = (props: DialogButtonProps) => {
  return (
    <DialogPrimitive.Trigger asChild>
      <ButtonComponent {...props} />
    </DialogPrimitive.Trigger>
  );
};

const DialogCloseButton = (props: DialogButtonProps) => {
  return (
    <DialogPrimitive.Close asChild>
      <DialogButton {...props} />
    </DialogPrimitive.Close>
  );
};

const Root = DialogRoot;

const Content = DialogContent;

const Button = DialogButton;

const Title = DialogTitle;

const Body = DialogBody;

const Footer = DialogFooter;

const Description = DialogDescription;

const TriggerButton = DialogTriggerButton;

const Close = DialogCloseButton;

const CloseIcon = DialogCloseButtonIcon;

export { Root, Content, Title, Description, Body, Footer, TriggerButton, Close, CloseIcon, Button };
