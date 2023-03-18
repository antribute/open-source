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
  DialogTitleSectionElement,
} from 'components/Dialog/Dialog.styles';
import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon';
import { ColorSchemeName, getDataAttributes } from '@antribute/zephyr-core';
import { getNearestColorSchemeAttribute } from 'utils/getNearestColorSchemeAttribute';
import { useState } from 'react';
import { Wrap } from 'components/Wrap';

type DialogRootProps = DialogPrimitive.DialogProps;

const DialogRoot = ({ children, ...props }: DialogRootProps) => {
  return <DialogPrimitive.Root {...props}>{children}</DialogPrimitive.Root>;
};

type DialogContentProps = DialogContentElementProps & { colorScheme?: ColorSchemeName };

const DialogContent = ({
  children,
  colorScheme: colorSchemeProp,
  padding,
  ...props
}: DialogContentProps) => {
  const [colorScheme, setColorScheme] = useState<string | undefined>(undefined);
  return (
    <Wrap
      if={!colorSchemeProp}
      wrap={(c) => {
        return (
          <div
            className="absolute"
            onMouseEnter={(e) => {
              setColorScheme(getNearestColorSchemeAttribute(e.currentTarget));
            }}
          >
            {c}
          </div>
        );
      }}
    >
      <DialogPrimitive.Portal>
        <DialogOverlayElement />
        <DialogContentElement
          data-color-scheme={colorSchemeProp ?? colorScheme}
          {...getDataAttributes({
            'data-antribute-card': { 'padding-none': padding === false },
          })}
          padding={padding}
          {...props}
        >
          {children}
        </DialogContentElement>
      </DialogPrimitive.Portal>
    </Wrap>
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

type DialogTitleSectionProps = DialogTitleElementProps;

const DialogTitleSection = ({ children, ...props }: DialogTitleSectionProps) => {
  return (
    <DialogTitleSectionElement {...props}>
      {children} <DialogCloseButtonIcon />
    </DialogTitleSectionElement>
  );
};

type DialogDescriptionProps = DialogDescriptionElementProps;

type DialogFooterProps = DialogFooterElementProps;

const DialogFooter = (props: DialogFooterProps) => {
  return <DialogFooterElement {...props} />;
};

type DialogTitleProps = DialogTitleElementProps;

const DialogTitle = ({ children, ...props }: DialogTitleProps) => {
  return <DialogTitleElement {...props}>{children}</DialogTitleElement>;
};

const DialogDescription = (props: DialogDescriptionProps) => {
  return <DialogDescriptionElement {...props} />;
};

const DialogButton = (props: DialogButtonProps) => {
  return <ButtonComponent color="primary" {...props} size="sm" />;
};

const DialogTrigger = (props: DialogPrimitive.DialogTriggerProps) => {
  return <DialogPrimitive.Trigger asChild {...props} />;
};

type DialogButtonProps = Omit<ButtonProps, 'size'>;

const DialogTriggerButton = (props: DialogButtonProps) => {
  return (
    <DialogTrigger>
      <ButtonComponent {...props} />
    </DialogTrigger>
  );
};

const DialogCloseButton = (props: Omit<DialogButtonProps, 'color' | 'variant'>) => {
  return (
    <DialogPrimitive.Close asChild>
      <DialogButton {...props} variant="glass" />
    </DialogPrimitive.Close>
  );
};

const DialogClose = (props: DialogPrimitive.DialogCloseProps) => {
  return <DialogPrimitive.Close asChild {...props} />;
};

const Root = DialogRoot;

const Content = DialogContent;

const TitleSection = DialogTitleSection;

const BodySection = DialogBody;

const FooterSection = DialogFooter;

const Title = DialogTitle;

const Description = DialogDescription;

const Button = DialogButton;

const TriggerButton = DialogTriggerButton;

const CloseButton = DialogCloseButton;

const Close = DialogClose;

const CloseIcon = DialogCloseButtonIcon;

const Trigger = DialogTrigger;

export {
  Root,
  Content,
  TitleSection,
  Description,
  BodySection,
  FooterSection,
  Title,
  Trigger,
  TriggerButton,
  CloseButton,
  CloseIcon,
  Close,
  Button,
};
