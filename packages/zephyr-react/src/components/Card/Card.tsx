import { ColorSchemeName } from '@antribute/zephyr-core';
import {
  CardBodySectionElement,
  CardContainerElement,
  CardDescriptionElement,
  CardFooterElement,
  CardGroupSpacerElement,
  CardTitleElement,
  CardTitleSectionElement,
} from 'components/Card/Card.styles';
import { Paper, PaperProps } from 'components/Paper';
import { Classed } from 'utils/classed';

// Container

export type CardContainerVariantProps = Classed.ComponentProps<typeof CardContainerElement>;

export type CardContainerProps = PaperProps & { colorScheme?: ColorSchemeName };

const CardContainer = (props: CardContainerProps) => {
  const isButton = 'onClick' in props;
  return <Paper hoverHighlight={isButton} cursorPointer={isButton} border {...props} />;
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

//  Body
export type CardBodyProps = React.ComponentProps<typeof CardBodySectionElement>;

const CardBody = (props: CardBodyProps) => {
  return <CardBodySectionElement {...props} />;
};

//  Body
export type CardDescriptionProps = React.ComponentProps<typeof CardDescriptionElement>;

const Description = (props: CardDescriptionProps) => {
  return <CardDescriptionElement {...props} />;
};

// Footer

export type CardFooterProps = React.ComponentProps<typeof CardFooterElement>;

const CardFooter = (props: CardFooterProps) => {
  return <CardFooterElement {...props} />;
};

// Exports

const Container = CardContainer;
const TitleSection = CardTitleArea;
const BodySection = CardBody;
const FooterSection = CardFooter;
const Title = CardTitleHeading;
const GroupSpacer = CardGroupSpacer;

export { Container, TitleSection, BodySection, FooterSection, Title, GroupSpacer, Description };
