import * as DialogPrimitive from '@radix-ui/react-dialog';
import type { ButtonProps } from 'components/Button';
import { Button as ButtonComponent } from 'components/Button';
import type {
  DialogBodyElementProps,
  DialogContentElementProps,
  DialogDescriptionElementProps,
  DialogFooterElementProps,
  DialogTitleElementProps,
} from 'components/Dialog/Dialog.styles';
import {
  DialogBodyElement,
  DialogContentElement,
  DialogDescriptionElement,
  DialogFooterElement,
  DialogOverlayElement,
  DialogTitleElement,
  DialogTitleSectionElement,
} from 'components/Dialog/Dialog.styles';
import type { ColorSchemeName } from 'config';
import { getDataAttributes } from 'config';
import { getNearestColorSchemeAttribute } from 'utils/getNearestColorSchemeAttribute';
import { useState } from 'react';
import { Wrap } from 'components/Wrap';
import { CloseButton } from 'components/IconButton';

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

const DialogCloseButtonIcon = ({ className }: { className?: string }) => {
  return (
    <DialogPrimitive.Close asChild>
      <CloseButton rounded className={className} />
    </DialogPrimitive.Close>
  );
};

type DialogTitleSectionProps = DialogTitleElementProps;

const DialogTitleSection = ({ children, ...props }: DialogTitleSectionProps) => {
  return (
    <DialogTitleSectionElement {...props}>
      {children} <DialogCloseButtonIcon className="relative -top-4" />
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

const DialogCancelButton = (props: Omit<DialogButtonProps, 'color' | 'variant'>) => {
  return (
    <DialogPrimitive.Close asChild>
      <DialogButton {...props} variant="glass" color="secondary" />
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

const CancelButton = DialogCancelButton;

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
  CancelButton,
  CloseIcon,
  Close,
  Button,
};
