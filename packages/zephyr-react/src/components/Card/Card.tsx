import { ColorSchemeName, getDataAttributes } from '@antribute/zephyr-core';
import {
  CardBodySectionElement,
  CardContainerElement,
  CardDescriptionElement,
  CardFooterSectionElement,
  CardGroupSpacerElement,
  CardTitleElement,
  CardTitleSectionElement,
} from 'components/Card/Card.styles';
import { PaperProps } from 'components/Paper';
import { ScrollViewport } from 'components/ScrollViewport';
import { forwardRef } from 'react';
import { Classed } from 'utils/classed';

// Container

export type CardContainerVariantProps = Classed.ComponentProps<typeof CardContainerElement>;

export type CardContainerProps = PaperProps & { colorScheme?: ColorSchemeName };

const CardContainer = ({ padding = true, ...props }: CardContainerProps) => {
  return (
    <CardContainerElement
      {...getDataAttributes({
        'data-antribute-card': {
          padding,
          'padding-none': !padding,
        },
      })}
      border
      padding={padding}
      {...props}
    />
  );
};

// Title Secting

export type CardTitleProps = { divider?: boolean } & React.ComponentProps<
  typeof CardTitleSectionElement
>;

const CardTitleSection = ({ children, ...props }: CardTitleProps) => {
  return <CardTitleSectionElement {...props}>{children}</CardTitleSectionElement>;
};

// Heading

export type CardTitleHeadingProps = React.ComponentProps<typeof CardTitleElement>;

const CardTitleHeading = (props: CardTitleHeadingProps) => {
  return <CardTitleElement {...props} />;
};

// Group Spacer

export type CardGroupSpacerProps = Classed.VariantProps<typeof CardGroupSpacerElement> &
  Pick<React.ComponentProps<typeof CardGroupSpacerElement>, 'children'>;

const CardGroupSpacer = (props: CardGroupSpacerProps) => {
  return <CardGroupSpacerElement {...props} />;
};

//   Body Section
export type ScrollBodyProps = React.ComponentProps<typeof CardBodySectionElement>;

const CardBody = forwardRef<HTMLDivElement, ScrollBodyProps>((props, ref) => {
  return (
    <ScrollViewport.ScrollArea ref={ref}>
      <CardBodySectionElement {...props} />
    </ScrollViewport.ScrollArea>
  );
});

//  Description
export type CardDescriptionProps = React.ComponentProps<typeof CardDescriptionElement>;

const Description = (props: CardDescriptionProps) => {
  return <CardDescriptionElement {...props} />;
};

// Footer

export type CardFooterProps = React.ComponentProps<typeof CardFooterSectionElement>;

const CardFooter = (props: CardFooterProps) => {
  return <CardFooterSectionElement {...props} />;
};

// Exports

const Container = CardContainer;
const TitleSection = CardTitleSection;
const BodySection = CardBody;
const FooterSection = CardFooter;
const Title = CardTitleHeading;
const GroupSpacer = CardGroupSpacer;

export { Container, TitleSection, BodySection, FooterSection, Title, GroupSpacer, Description };
