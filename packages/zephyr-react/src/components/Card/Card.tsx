import { ColorSchemeName, getDataAttributes } from '@antribute/zephyr-core';
import {
  CardBodySectionElement,
  CardContainerElement,
  CardDescriptionElement,
  CardFooterSectionElement,
  CardGroupSpacerElement,
  CardScrollBodySectionElement,
  CardTitleElement,
  CardTitleSectionElement,
} from 'components/Card/Card.styles';
import { PaperProps } from 'components/Paper';
import { Classed } from 'utils/classed';

// Container

export type CardContainerVariantProps = Classed.ComponentProps<typeof CardContainerElement>;

export type CardContainerProps = PaperProps & { colorScheme?: ColorSchemeName };

const CardContainer = ({ padding, ...props }: CardContainerProps) => {
  return (
    <CardContainerElement
      {...getDataAttributes({
        'data-antribute-card': { 'padding-none': padding === false },
      })}
      padding={padding}
      border
      {...props}
    />
  );
};

// Title

export type CardTitleProps = React.ComponentProps<typeof CardTitleSectionElement>;

const CardTitleArea = (props: CardTitleProps) => {
  return <CardTitleSectionElement {...props} />;
};

// Title

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

//  Body Seciton
export type CardBodyProps = React.ComponentProps<typeof CardBodySectionElement>;

const CardBody = (props: CardBodyProps) => {
  return <CardBodySectionElement {...props} />;
};

//  Scroll Body Section
export type CardScrollBodyProps = React.ComponentProps<typeof CardScrollBodySectionElement>;

const CardScrollBody = (props: CardScrollBodyProps) => {
  return <CardScrollBodySectionElement {...props} />;
};

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
const TitleSection = CardTitleArea;
const BodySection = CardBody;
const ScrollBodySection = CardScrollBody;
const FooterSection = CardFooter;
const Title = CardTitleHeading;
const GroupSpacer = CardGroupSpacer;

export {
  Container,
  TitleSection,
  BodySection,
  ScrollBodySection,
  FooterSection,
  Title,
  GroupSpacer,
  Description,
};
